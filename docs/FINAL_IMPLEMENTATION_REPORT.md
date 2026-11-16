# Discover Burgas — окончателен технически доклад

**Дата:** 16 ноември 2026 г.  
**Работен branch:** `feature/backend-production-core`  
**Публичен адрес:** [discover-burgas.vercel.app](https://discover-burgas.vercel.app/bg)  
**Статус:** завършен конкурсен MVP; последните промени по цветовата система, CSP и контраста са в работния branch и трябва да преминат през одобрен production deploy.

## 1. Какъв проблем решава продуктът

Discover Burgas свързва физическо културно място с проверена дигитална история. QR кодът от табела отваря постоянен URL на конкретния обект, без инсталация и регистрация. От страницата посетителят може да прочете историята, да види източниците, да отвори картата, да избере близко място и да продължи с Google Maps, Apple Maps или Waze.

## 2. Какво е реализирано

### Публично преживяване

- Български и английски интерфейс с локализирани URL адреси.
- Начална страница с обяснение на проблема, QR journey, интерактивна карта, избрани места и маршрути.
- 14 публикувани и валидирани културни обекта в Бургас и региона.
- Страница за всеки обект с история, факти, координати, източници, изображения или честен илюстративен fallback.
- Търсене и филтри по категория, район и интерес.
- Leaflet карта с OpenStreetMap attribution, маркери, popups, избрано място и списъчна алтернатива.
- Haversine изчисление за реално подреждане на близки места.
- Три тематични маршрута с честно означен начин на придвижване.
- Локални любими места чрез browser storage, без акаунт и проследяване.
- Страници за историята на Бургас, заведения и нощувки.
- PWA manifest, installable икони, service worker и коректно обяснение на offline ограниченията.

### QR система

- Постоянна входна точка `/places/[slug]`, независима от езика.
- Автоматичен избор на български или английски според запомнения/предпочитан език.
- SVG и PNG QR генериране от `NEXT_PUBLIC_APP_BASE_URL`.
- Printable sign proposal с изрично уточнение, че не е инсталирана общинска инфраструктура.
- QR кодовете остават черно-бели независимо от визуалната тема, за да се запази надеждното сканиране.

### Backend и данни

- Next.js Route Handlers за места, детайл, nearby резултати, маршрути, QR кодове, health и visitor reports.
- Supabase PostgreSQL с migrations, RLS, ограничени роли и повторяем seed.
- Zod валидиране на version-controlled landmark manifest.
- Pagination, локализирано търсене и валидирани API филтри.
- Idempotent visitor reports, honeypot защита и rate limiting.
- Защитен `/admin` operational view със signed, expiring session cookie.
- Server-only secrets; нито един secret не е достъпен чрез `NEXT_PUBLIC_` променлива.
- Python REST verifier за production database integrity.

### Визуална система

- Зелената палитра е заменена изцяло с оригинална сценична система: deep violet, magenta, cyan и warm light accent.
- Светлите повърхности са запазени за четимост на телефон и на открито.
- Темата е вдъхновена от международно музикално събитие и Черно море, но не копира Eurovision лого и не заявява партньорство.
- Обновени са header, hero, phone journey, карти, маркери, маршрути, demo режим, история, dining/stay страници, PWA икони и browser theme color.
- Motion системата уважава `prefers-reduced-motion`.

## 3. Как работи архитектурата

```text
QR / browser request
        │
        ▼
Next.js App Router
        │
        ├── localized public pages
        ├── Route Handler APIs
        ├── QR generation
        └── protected operational routes
        │
        ▼
Repository data layer
        │
        ├── Supabase in production
        └── validated manifest fallback for local/demo tests
```

Един landmark record захранва едновременно страницата на обекта, картата, търсенето, nearby резултатите, маршрута и QR адреса. Това намалява риска различни екрани да показват противоречиви данни.

## 4. Сигурност

- Content Security Policy, HSTS, frame denial, MIME sniffing protection и ограничена Permissions Policy.
- CSP е environment-aware: React development diagnostics получават `unsafe-eval` само локално; production никога не го получава.
- Добавен е regression тест, който проверява и двата режима.
- Admin и report отговорите използват `no-store`.
- Service worker не кешира API и admin маршрути.
- Report database операциите не са достъпни директно за anonymous Supabase role.
- Production dependency audit отчита 0 известни уязвимости.

## 5. Достъпност и mobile-first поведение

- Semantic landmarks, heading hierarchy и skip link.
- Keyboard-operable controls и видим focus.
- Списъчна алтернатива на картата.
- Localized accessible names и meaningful alt text.
- Responsive покритие на 375, 390, 768, 1024 и 1440 px.
- Automated axe проверки на началната и основните публични страници.
- При финалния одит беше открит и поправен бял map kicker върху светъл фон; focused accessibility тестът след поправката премина.

## 6. Изпълнени проверки

| Проверка | Резултат |
|---|---|
| ESLint | PASS |
| TypeScript | PASS |
| Unit tests | PASS — 8 файла, 16 теста |
| Production build | PASS — 57 генерирани страници/маршрута |
| Browser suite преди последната contrast поправка | 80 PASS, 24 intentional skips, 1 accessibility failure |
| Focused accessibility regression след поправката | PASS |
| Финален пълен browser suite след нов production build | PASS — 81 теста, 24 intentional skips, 0 failures |
| Production dependency audit | PASS — 0 vulnerabilities |
| Development CSP | PASS — React diagnostics работят локално |
| Production CSP | PASS — няма `unsafe-eval` |
| Production QR decode | PASS — сочи към постоянния HTTPS landmark URL |

Intentional skips са desktop-only проверки, които не се повтарят излишно във всеки viewport. Финалният suite покрива 375, 390, 768, 1024 и 1440 px. Физическият smartphone-camera scan не е представен като изпълнен.

## 7. Стартиране и проверка

```bash
npm install
copy .env.example .env.local
npm run dev
```

Основни проверки:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm audit --omit=dev
```

Supabase setup и verification:

```bash
npx supabase link --project-ref <project-ref>
npm run supabase:push
npm run supabase:seed
npm run backend:verify
```

## 8. Какво остава извън кода

Следните задачи изискват собственик, устройство или външно одобрение и не трябва да се автоматизират или обявяват за завършени без реално изпълнение:

1. Production deploy на последния branch commit след изрично одобрение.
2. Сканиране на production QR с точния телефон за презентацията през venue Wi-Fi и mobile data.
3. Преобразуване на server-only Vercel стойностите от Config към Secret след owner 2FA.
4. Формален legal/privacy review и manual screen-reader/device-lab проверка преди институционално публично използване.
5. Google Places снимки само ако бъде добавен ограничен server-side key, активирано billing наблюдение и са спазени attribution правилата.
6. Повторна проверка на променливи данни като работно време, цени и достъпност непосредствено преди публично събитие.

## 9. Демонстрационен сценарий

1. Отвори `/bg/demo` и формулирай проблема: хората минават покрай важни места, без да знаят историята им.
2. Покажи четирите стъпки: знак → QR → история → следващо място.
3. Сканирай Aquae Calidae QR sign с телефон.
4. Покажи историята, източниците, картата и navigation providers.
5. Отвори discovery картата, потърси място и превключи към списъка.
6. Покажи central walking route и regional mixed-transport route.
7. Завърши с архитектурното предимство: един проверен record захранва всички публични интерфейси.

Подробният времеви сценарий е в [DEMO_GUIDE.md](DEMO_GUIDE.md), а изпълнените проверки са в [QA_REPORT.md](QA_REPORT.md).
