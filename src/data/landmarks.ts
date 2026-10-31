import { landmarkSchema, routeSchema, type Landmark, type CulturalRoute } from "@/types/content";

const verifiedAt = "2026-10-22";
const rim = (title: string, url: string) => ({ title, url, publisher: "Регионален исторически музей — Бургас", verifiedAt });
const tourism = (title: string, url: string) => ({ title, url, publisher: "Go to Burgas", verifiedAt });

const raw: Landmark[] = [
  {
    id: "lm-archaeological", slug: "archaeological-museum", category: "museums", municipality: "Бургас", area: "Център",
    address: "бул. „Алеко Богориди“ 21", latitude: 42.4936208, longitude: 27.4754907,
    officialUrl: "https://www.burgasmuseums.bg/bg/visit", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: verifiedAt, status: "PUBLISHED", featured: true,
    translations: {
      bg: { name: "Археологически музей — Бургас", short: "Хронологичен разказ за най-ранната история на Бургаския залив.", description: "Археологическата експозиция на РИМ — Бургас представя находки от праисторията, Античността и Средновековието, открити в региона.", history: "Експозицията проследява развитието на селищата около Бургаския залив от VI хилядолетие пр. Хр. до Средновековието. Сред акцентите са находки от Аполония Понтика, тракийски светилища и археологически проучвания в днешната община Бургас.", facts: ["Експозицията е на бул. „Алеко Богориди“ 21.", "Колекцията представя археологията на целия Бургаски регион.", "Актуалните часове и билети се проверяват в официалния сайт на музея."], keywords: ["археология", "музей", "траки", "античност"] },
      en: { name: "Burgas Archaeological Museum", short: "A chronological journey through the earliest history of Burgas Bay.", description: "The archaeological exhibition of the Burgas Regional Historical Museum presents finds from prehistory, antiquity and the Middle Ages discovered across the region.", history: "The exhibition follows settlements around Burgas Bay from the sixth millennium BCE to the Middle Ages. Its themes include Apollonia Pontica, Thracian sanctuaries and archaeological research within present-day Burgas municipality.", facts: ["The exhibition is at 21 Aleko Bogoridi Boulevard.", "The collection interprets archaeology from across the Burgas region.", "Check the museum’s official website for current hours and tickets."], keywords: ["archaeology", "museum", "Thracian", "antiquity"] }
    },
    images: [{ path: "/images/archaeological.jpg", creator: "MiremS", sourceUrl: "https://commons.wikimedia.org/wiki/File:Археологически_музей_-_един_от_четирите_музея_в_рамките_на_Регионалния_исторически_музей_в_град_Бургас.jpg", license: "CC BY-SA 4.0", attribution: "MiremS / Wikimedia Commons / CC BY-SA 4.0" }],
    sources: [rim("Посетете експозициите на РИМ — Бургас", "https://www.burgasmuseums.bg/bg/visit"), rim("За музея", "https://www.burgasmuseums.bg/bg/about")]
  },
  {
    id: "lm-ethnographic", slug: "ethnographic-museum", category: "museums", municipality: "Бургас", area: "Център",
    address: "ул. „Славянска“ 69", latitude: 42.4961822, longitude: 27.4750141,
    officialUrl: "https://www.burgasmuseums.bg/bg/visit", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: verifiedAt, status: "PUBLISHED", featured: true,
    translations: {
      bg: { name: "Етнографски музей — Бургас", short: "Жив поглед към облеклото, обичаите и занаятите на региона.", description: "Етнографската експозиция представя традиционната култура на хората от Бургаския край чрез предмети, носии и тематични разкази.", history: "Музеят е част от Регионалния исторически музей — Бургас. Неговите колекции и образователни програми пазят знание за обичаите, празниците, домашния бит и занаятите на общностите в Югоизточна България.", facts: ["Експозицията се намира на ул. „Славянска“ 69.", "Музеят организира демонстрации и образователни събития.", "Програмата и работното време могат да се променят сезонно."], keywords: ["етнография", "носии", "занаяти", "традиции"] },
      en: { name: "Burgas Ethnographic Museum", short: "A vivid view of regional dress, customs and crafts.", description: "The ethnographic exhibition explores the traditional culture of the Burgas region through objects, clothing and thematic interpretation.", history: "The museum is part of the Burgas Regional Historical Museum. Its collections and educational programmes preserve knowledge of customs, celebrations, domestic life and crafts across southeastern Bulgaria.", facts: ["The exhibition is at 69 Slavyanska Street.", "The museum hosts demonstrations and educational events.", "Programmes and opening times may change seasonally."], keywords: ["ethnography", "dress", "crafts", "traditions"] }
    },
    images: [{ path: "/images/ethnographic.jpg", creator: "Vassia Atanassova – Spiritia", sourceUrl: "https://commons.wikimedia.org/wiki/File:Burgas-Ethnographic-museum.jpg", license: "CC BY-SA 3.0", attribution: "Spiritia / Wikimedia Commons / CC BY-SA 3.0" }],
    sources: [rim("Посетете експозициите на РИМ — Бургас", "https://www.burgasmuseums.bg/bg/visit"), rim("Културна програма", "https://burgasmuseums.bg/bg/culturalprogramme")]
  },
  {
    id: "lm-history", slug: "historical-museum", category: "museums", municipality: "Бургас", area: "Център",
    address: "ул. „Лермонтов“ 31", latitude: 42.494978, longitude: 27.473944,
    officialUrl: "https://www.burgasmuseums.bg/bg/visit", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: verifiedAt, status: "PUBLISHED", featured: false,
    translations: {
      bg: { name: "Исторически музей — Бургас", short: "Истории за града, региона и хората, които са ги изградили.", description: "Историческата експозиция на РИМ — Бургас съхранява документи, фотографии и предмети, свързани с по-новата история на града и региона.", history: "Историческият отдел се развива след създаването на Държавния музей в Бургас през 1946 г. Колекциите му проследяват обществения и културния живот, освободителните борби и промените в Бургаския край през XIX и XX век.", facts: ["Експозицията е на ул. „Лермонтов“ 31.", "Колекциите включват архиви, снимки, книги, отличия и лични вещи.", "Временните изложби допълват постоянния разказ."], keywords: ["история", "архив", "Бургас", "музей"] },
      en: { name: "Burgas Historical Museum", short: "Stories of the city, its region and the people who shaped them.", description: "The historical exhibition preserves documents, photographs and objects connected with the modern history of Burgas and its region.", history: "The historical department developed after the Burgas State Museum was established in 1946. Its collections explore civic and cultural life, liberation movements and changes across the Burgas region during the nineteenth and twentieth centuries.", facts: ["The exhibition is at 31 Lermontov Street.", "Collections include archives, photographs, books, awards and personal objects.", "Temporary exhibitions extend the permanent narrative."], keywords: ["history", "archive", "Burgas", "museum"] }
    }, images: [],
    sources: [rim("Кратка хроника за историята на Историческия музей", "https://www.burgasmuseums.bg/bg/encdetail/kratka-hronika-istoriyata-istoricheskiya-muzey-333"), rim("Посетете експозициите", "https://www.burgasmuseums.bg/bg/visit")]
  },
  {
    id: "lm-cathedral", slug: "saints-cyril-methodius-cathedral", category: "architecture", municipality: "Бургас", area: "Център",
    address: "пл. „Св. св. Кирил и Методий“", latitude: 42.4957787, longitude: 27.4726675,
    officialUrl: "https://info.gotoburgas.com/bg/explore/religious/church-saints-cyril-and-methodius", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: verifiedAt, status: "PUBLISHED", featured: true,
    translations: {
      bg: { name: "Катедрален храм „Св. св. Кирил и Методий“", short: "Един от разпознаваемите архитектурни символи на Бургас.", description: "Катедралният храм се издига в сърцето на града със своята трикорабна композиция, купол и богато художествено оформление.", history: "Храмът е строен между 1897 и 1907 г. по проект на италианския архитект Рикардо Тоскани. Вътрешното пространство е разделено от мраморни колони, а стенописите са свързани с художниците проф. Димитър Гюдженов и проф. Никола Кожухаров.", facts: ["Строителството продължава от 1897 до 1907 г.", "Архитектът е Рикардо Тоскани.", "Главният вход включва стъклопис с образите на светите братя."], keywords: ["архитектура", "храм", "катедрала", "Кирил и Методий"] },
      en: { name: "Saints Cyril and Methodius Cathedral", short: "One of Burgas’s most recognisable architectural symbols.", description: "The cathedral stands in the city centre with a three-nave composition, a prominent dome and richly decorated interior.", history: "The church was built between 1897 and 1907 to plans by Italian architect Ricardo Toscani. Marble columns divide the interior, while its murals are associated with Bulgarian artists Dimitar Gyudzhenov and Nikola Kozhuharov.", facts: ["Construction lasted from 1897 to 1907.", "The architect was Ricardo Toscani.", "The main entrance includes stained glass depicting the two saints."], keywords: ["architecture", "church", "cathedral", "Cyril and Methodius"] }
    },
    images: [{ path: "/images/cathedral.jpg", creator: "Vammpi", sourceUrl: "https://commons.wikimedia.org/wiki/File:Kathedrale_Hl._Kyrill_und_Method_in_Burgas,_Bulgarien.jpg", license: "Public domain", attribution: "Vammpi / Wikimedia Commons / Public domain" }],
    sources: [tourism("Храм „Свети Свети Кирил и Методий“", "https://info.gotoburgas.com/bg/explore/religious/church-saints-cyril-and-methodius")]
  },
  {
    id: "lm-clock", slug: "burgas-clock", category: "urban-heritage", municipality: "Бургас", area: "Център",
    address: "началото на ул. „Алеко Богориди“", latitude: 42.4935283, longitude: 27.4726636,
    officialUrl: "https://www.gotoburgas.com/", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: verifiedAt, status: "PUBLISHED", featured: false,
    translations: {
      bg: { name: "Часовника", short: "Любима градска среща и естествена отправна точка към центъра.", description: "Часовника е познат ориентир в пешеходното сърце на Бургас, срещу туристическия информационен център и близо до началото на улица „Богориди“.", history: "Мястото живее най-вече чрез градската памет: поколения бургазлии използват Часовника като точка за срещи. Днес оттук започват и туристически разходки из центъра.", facts: ["Часовника е общоприета среща в центъра на Бургас.", "Намира се срещу туристическия информационен център.", "Оттук лесно се продължава към музеите по улица „Богориди“."], keywords: ["часовник", "център", "среща", "градска среда"] },
      en: { name: "The Burgas Clock", short: "A beloved meeting point and natural gateway into the city centre.", description: "The clock is a familiar landmark in pedestrian Burgas, opposite the tourist information centre and close to the beginning of Bogoridi Street.", history: "Its significance is rooted in living urban memory: generations of Burgas residents have used the clock as a meeting point. City walking tours also begin nearby today.", facts: ["The clock is a traditional city-centre meeting point.", "It stands opposite the tourist information centre.", "The museums along Bogoridi Street are an easy next stop."], keywords: ["clock", "centre", "meeting point", "urban life"] }
    }, images: [],
    sources: [tourism("Burgas Free Tour — начална точка Часовника", "https://info.gotoburgas.com/bg/news/free-tours-of-burgas-for-the-eighth-consecutive-year-from-bu")]
  },
  {
    id: "lm-aquae", slug: "aquae-calidae", category: "archaeology", municipality: "Бургас", area: "Бургаски минерални бани",
    address: "кв. Ветрен, Бургаски минерални бани", latitude: 42.611489, longitude: 27.393775,
    officialUrl: "https://www.gotoburgas.com/", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: verifiedAt, status: "PUBLISHED", featured: true,
    translations: {
      bg: { name: "Туристически комплекс „Акве Калиде“", short: "Място, където минералната вода свързва древност, Средновековие и съвременност.", description: "Археологическият комплекс пази пластове от дългата история на лечебните минерални извори край днешен Бургас.", history: "Акве Калиде е историческо селище и термален комплекс, познат през различни епохи с имена като Терма и Термополис. Археологическите останки и възстановената баня разказват за тракийски, римски, византийски, български и османски периоди.", facts: ["Името Aquae Calidae означава „топли води“ на латински.", "Комплексът съчетава археологическа зона и музейна интерпретация.", "Обектът е извън пешеходния център и изисква транспорт."], keywords: ["археология", "минерална вода", "римски бани", "Термополис"] },
      en: { name: "Aquae Calidae Tourist Complex", short: "Mineral water connects antiquity, the Middle Ages and the present day here.", description: "The archaeological complex preserves layers from the long history of the thermal springs near modern Burgas.", history: "Aquae Calidae is a historical settlement and thermal complex known in different periods as Therma and Thermopolis. The archaeological remains and restored bath interpret Thracian, Roman, Byzantine, Bulgarian and Ottoman phases.", facts: ["Aquae Calidae means “warm waters” in Latin.", "The complex combines an archaeological zone with museum interpretation.", "It lies outside the walkable centre and requires transport."], keywords: ["archaeology", "mineral water", "Roman baths", "Thermopolis"] }
    },
    images: [{ path: "/images/aquae.jpg", creator: "Galileo01", sourceUrl: "https://commons.wikimedia.org/wiki/File:Aquae_Calidae.jpg", license: "CC BY 4.0", attribution: "Galileo01 / Wikimedia Commons / CC BY 4.0" }],
    sources: [tourism("Туристически комплекс „Акве Калиде“", "https://info.gotoburgas.com/bg/explore/landmark"), { title: "Aquae Calidae — coordinates and media", url: "https://commons.wikimedia.org/wiki/Category:Aquae_Calidae", publisher: "Wikimedia Commons", verifiedAt }]
  },
  {
    id: "lm-island", slug: "st-anastasia-island", category: "historic-sites", municipality: "Бургас", area: "Бургаски залив",
    address: "Остров Света Анастасия, Бургаски залив", latitude: 42.467586, longitude: 27.550611,
    officialUrl: "https://info.gotoburgas.com/bg/explore/landmark/st-anastasia-island", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: verifiedAt, status: "PUBLISHED", featured: true,
    translations: {
      bg: { name: "Остров Света Анастасия", short: "Малък остров с манастирско минало, морски легенди и гледка към Бургаския залив.", description: "Света Анастасия е единственият обитаем български остров в Черно море и място, до което се достига с кораб от Бургас.", history: "Островът се намира на около шест километра от брега. През историята е бил свързан с манастир, а в определен период е използван и като затвор. Днес посетителското преживяване включва музейна експозиция, църква и морски пейзаж.", facts: ["Островът е изграден от вулканични скали.", "Достъпът е по вода и зависи от курсовете и метеорологичните условия.", "На острова се намира църквата „Успение Богородично“."], keywords: ["остров", "манастир", "морско наследство", "кораб"] },
      en: { name: "St. Anastasia Island", short: "A small island with a monastic past, maritime legends and views across Burgas Bay.", description: "St. Anastasia is Bulgaria’s only inhabited Black Sea island and is reached by boat from Burgas.", history: "The island lies around six kilometres from shore. It was associated with a monastery and was used as a prison during part of its history. Today the visitor experience includes a museum exhibition, a church and the surrounding seascape.", facts: ["The island is formed from volcanic rock.", "Access is by water and depends on sailing schedules and weather.", "The Church of the Dormition is located on the island."], keywords: ["island", "monastery", "maritime heritage", "boat"] }
    },
    images: [{ path: "/images/island.jpg", creator: "EvelinaRibarova", sourceUrl: "https://commons.wikimedia.org/wiki/File:St._Anastasia_Island_(о-в_Света_Анастасия)_-_Burgas,_Bulgaria_-7-2017_(247).jpg", license: "CC BY-SA 4.0", attribution: "EvelinaRibarova / Wikimedia Commons / CC BY-SA 4.0" }],
    sources: [tourism("Остров Света Анастасия", "https://info.gotoburgas.com/bg/explore/landmark/st-anastasia-island"), { title: "St. Anastasia Island media record", url: "https://commons.wikimedia.org/wiki/File:St._Anastasia_Island_(о-в_Света_Анастасия)_-_Burgas,_Bulgaria_-7-2017_(247).jpg", publisher: "Wikimedia Commons", verifiedAt }]
  },
  {
    id: "lm-arena-burgas", slug: "arena-burgas", category: "event-venue", municipality: "Бургас", area: "Изгрев",
    address: "бул. „Стефан Стамболов“ 79", latitude: 42.524694, longitude: 27.455806,
    officialUrl: "https://eurovision2027.bg/", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: verifiedAt, status: "PUBLISHED", featured: false,
    translations: {
      bg: { name: "Арена Бургас — Евровизия 2027", short: "Официалната сцена на 71-вото издание на Eurovision Song Contest през май 2027 г.", description: "Арена Бургас е потвърденото място за трите телевизионни шоу вечери на Eurovision Song Contest 2027.", history: "Европейският съюз за радио и телевизия и Българската национална телевизия обявяват Бургас за град домакин на 13 август 2026 г. Първият полуфинал е на 11 май 2027 г., вторият — на 13 май, а големият финал — на 15 май. Другите официални фестивални локации все още не са обявени.", facts: ["Арена Бургас е потвърденото място за полуфиналите и финала.", "Шоу вечерите са на 11, 13 и 15 май 2027 г.", "Информацията за билети, транспорт, Eurovision Village и EuroClub се публикува единствено чрез официалните канали."], keywords: ["Евровизия", "Eurovision 2027", "Арена Бургас", "музика", "събитие"] },
      en: { name: "Arena Burgas — Eurovision 2027", short: "The confirmed stage for the 71st Eurovision Song Contest in May 2027.", description: "Arena Burgas is the confirmed venue for the three televised Eurovision Song Contest 2027 shows.", history: "The European Broadcasting Union and Bulgarian National Television announced Burgas as Host City on 13 August 2026. The First Semi-Final is scheduled for 11 May 2027, the Second Semi-Final for 13 May, and the Grand Final for 15 May. Other official festival locations have not yet been announced.", facts: ["Arena Burgas is the confirmed venue for both Semi-Finals and the Grand Final.", "The live shows are scheduled for 11, 13 and 15 May 2027.", "Ticket, transport, Eurovision Village and EuroClub information should be checked through official channels."], keywords: ["Eurovision", "Eurovision 2027", "Arena Burgas", "music", "event"] }
    },
    images: [],
    sources: [
      { title: "Burgas 2027 Host City FAQ", url: "https://www.eurovision.com/newsroom/frequently-asked-questions/faqs-burgas-2027/", publisher: "Eurovision Song Contest / EBU", verifiedAt },
      { title: "Евровизия 2027 в Бургас", url: "https://eurovision2027.bg/", publisher: "Българска национална телевизия", verifiedAt },
      { title: "Arena Burgas coordinate record", url: "https://musicbrainz.org/place/cd28e70d-8dcc-40b6-81b9-7b7efb60b35b", publisher: "MusicBrainz", verifiedAt }
    ]
  }
];

export const landmarks = raw.map((item) => landmarkSchema.parse(item));

export const routes: CulturalRoute[] = [routeSchema.parse({
  id: "route-central", slug: "burgas-centre-stories", transportMode: "WALKING",
  translations: {
    bg: { title: "Истории от центъра на Бургас", description: "Пешеходна линия през пет близки места — от градската среща при Часовника до музеите и катедралния храм." },
    en: { title: "Stories from Central Burgas", description: "A walking sequence through five nearby places — from the city’s clock meeting point to museums and the cathedral." }
  },
  stops: [
    { landmarkSlug: "burgas-clock", note: { bg: "Начало и лесна среща", en: "An easy meeting point" } },
    { landmarkSlug: "archaeological-museum", note: { bg: "Най-ранната история на залива", en: "The bay’s earliest history" } },
    { landmarkSlug: "historical-museum", note: { bg: "Градът през XIX и XX век", en: "The city in the 19th and 20th centuries" } },
    { landmarkSlug: "ethnographic-museum", note: { bg: "Традиции и живо наследство", en: "Traditions and living heritage" } },
    { landmarkSlug: "saints-cyril-methodius-cathedral", note: { bg: "Архитектурен финал", en: "An architectural finale" } }
  ]
})];

export const categories = [
  { id: "museums", bg: "Музеи", en: "Museums" },
  { id: "architecture", bg: "Архитектура", en: "Architecture" },
  { id: "archaeology", bg: "Археология", en: "Archaeology" },
  { id: "urban-heritage", bg: "Градско наследство", en: "Urban heritage" },
  { id: "historic-sites", bg: "Исторически места", en: "Historic sites" },
  { id: "event-venue", bg: "Евровизия 2027", en: "Eurovision 2027" }
];
