import { landmarkSchema, routeSchema, type Landmark, type CulturalRoute } from "@/types/content";
import licensedPhotos from "./landmark-photos.json";

const verifiedAt = "2026-10-22";
const regionalVerifiedAt = "2026-11-14";
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
    officialUrl: "https://www.aquae-calidae.com/", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: regionalVerifiedAt, status: "PUBLISHED", featured: true,
    translations: {
      bg: { name: "Туристически комплекс „Акве Калиде“", short: "Място, където минералната вода свързва древност, Средновековие и съвременност.", description: "Археологическият комплекс пази пластове от дългата история на лечебните минерални извори край днешен Бургас.", history: "Акве Калиде е историческо селище и термален комплекс, познат през различни епохи с имена като Терма и Термополис. Археологическите останки и възстановената баня разказват за тракийски, римски, византийски, български и османски периоди.", facts: ["Името Aquae Calidae означава „топли води“ на латински.", "Комплексът съчетава археологическа зона и музейна интерпретация.", "Обектът е извън пешеходния център и изисква транспорт."], keywords: ["археология", "минерална вода", "римски бани", "Термополис"] },
      en: { name: "Aquae Calidae Tourist Complex", short: "Mineral water connects antiquity, the Middle Ages and the present day here.", description: "The archaeological complex preserves layers from the long history of the thermal springs near modern Burgas.", history: "Aquae Calidae is a historical settlement and thermal complex known in different periods as Therma and Thermopolis. The archaeological remains and restored bath interpret Thracian, Roman, Byzantine, Bulgarian and Ottoman phases.", facts: ["Aquae Calidae means “warm waters” in Latin.", "The complex combines an archaeological zone with museum interpretation.", "It lies outside the walkable centre and requires transport."], keywords: ["archaeology", "mineral water", "Roman baths", "Thermopolis"] }
    },
    images: [{ path: "/images/aquae.jpg", creator: "Galileo01", sourceUrl: "https://commons.wikimedia.org/wiki/File:Aquae_Calidae.jpg", license: "CC BY 4.0", attribution: "Galileo01 / Wikimedia Commons / CC BY 4.0" }],
    sources: [
      { title: "Акве Калиде — официален посетителски сайт", url: "https://www.aquae-calidae.com/", publisher: "Туристически комплекс „Акве Калиде“", verifiedAt: regionalVerifiedAt },
      { title: "Aquae Calidae — Therma", url: "https://www.burgasmuseums.bg/en/encdetail/aqaue-calidae-24", publisher: "Регионален исторически музей — Бургас", verifiedAt: regionalVerifiedAt },
      { title: "Aquae Calidae — coordinates and media", url: "https://commons.wikimedia.org/wiki/Category:Aquae_Calidae", publisher: "Wikimedia Commons", verifiedAt }
    ]
  },
  {
    id: "lm-island", slug: "st-anastasia-island", category: "historic-sites", municipality: "Бургас", area: "Бургаски залив",
    address: "Остров Света Анастасия, Бургаски залив", latitude: 42.467586, longitude: 27.550611,
    officialUrl: "https://tickets.gotoburgas.com/en/n1451-anastasiaisland", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: regionalVerifiedAt, status: "PUBLISHED", featured: true,
    translations: {
      bg: { name: "Остров Света Анастасия", short: "Малък остров с манастирско минало, морски легенди и гледка към Бургаския залив.", description: "Света Анастасия е единственият обитаем български остров в Черно море и място, до което се достига с кораб от Бургас.", history: "Островът се намира на около шест километра от брега. През историята е бил свързан с манастир, а в определен период е използван и като затвор. Днес посетителското преживяване включва музейна експозиция, църква и морски пейзаж.", facts: ["Островът е изграден от вулканични скали.", "Достъпът е по вода и зависи от курсовете и метеорологичните условия.", "На острова се намира църквата „Успение Богородично“."], keywords: ["остров", "манастир", "морско наследство", "кораб"] },
      en: { name: "St. Anastasia Island", short: "A small island with a monastic past, maritime legends and views across Burgas Bay.", description: "St. Anastasia is Bulgaria’s only inhabited Black Sea island and is reached by boat from Burgas.", history: "The island lies around six kilometres from shore. It was associated with a monastery and was used as a prison during part of its history. Today the visitor experience includes a museum exhibition, a church and the surrounding seascape.", facts: ["The island is formed from volcanic rock.", "Access is by water and depends on sailing schedules and weather.", "The Church of the Dormition is located on the island."], keywords: ["island", "monastery", "maritime heritage", "boat"] }
    },
    images: [{ path: "/images/island.jpg", creator: "EvelinaRibarova", sourceUrl: "https://commons.wikimedia.org/wiki/File:St._Anastasia_Island_(о-в_Света_Анастасия)_-_Burgas,_Bulgaria_-7-2017_(247).jpg", license: "CC BY-SA 4.0", attribution: "EvelinaRibarova / Wikimedia Commons / CC BY-SA 4.0" }],
    sources: [
      { title: "How to visit St. Anastasia Island?", url: "https://tickets.gotoburgas.com/en/n1451-anastasiaisland", publisher: "Община Бургас / Go to Burgas", verifiedAt: regionalVerifiedAt },
      { title: "St. Anastasia Island", url: "https://www.tourism.government.bg/en/tourist-destinations/2802/5568", publisher: "Министерство на туризма", verifiedAt: regionalVerifiedAt },
      { title: "St. Anastasia Island media record", url: "https://commons.wikimedia.org/wiki/File:St._Anastasia_Island_(о-в_Света_Анастасия)_-_Burgas,_Bulgaria_-7-2017_(247).jpg", publisher: "Wikimedia Commons", verifiedAt }
    ]
  },
  {
    id: "lm-ancient-nessebar", slug: "ancient-nessebar", category: "historic-sites", municipality: "Несебър", area: "Старият Несебър",
    address: "полуостров Старият Несебър", latitude: 42.659111, longitude: 27.736028,
    officialUrl: "https://whc.unesco.org/en/list/217", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: regionalVerifiedAt, status: "PUBLISHED", featured: true,
    translations: {
      bg: { name: "Старинен Несебър", short: "Скалист полуостров, в който хилядолетия история остават видими в един жив град.", description: "Старинният град Несебър събира археологически пластове, средновековни църкви и възрожденска черноморска архитектура в защитена градска цялост.", history: "Полуостровът пази следи от селище от II хилядолетие пр. Хр., гръцката колония Месамбрия, антични укрепления и християнски храмове от Средновековието. UNESCO вписва Старинен Несебър в Списъка на световното наследство през 1983 г. по критерии (iii) и (iv), като подчертава многопластовото наследство и съчетанието между градската тъкан и морския релеф.", facts: ["Обектът е в Списъка на световното наследство на UNESCO от 1983 г.", "Защитената територия обхваща скалистия полуостров и неговите културни пластове.", "Средновековните църкви, археологията и възрожденските къщи са част от една обща градска среда."], keywords: ["Несебър", "UNESCO", "Месамбрия", "средновековни църкви", "възрожденска архитектура"] },
      en: { name: "Ancient City of Nessebar", short: "A rocky peninsula where millennia of history remain visible within a living town.", description: "Ancient Nessebar brings archaeological layers, medieval churches and Black Sea Revival-period architecture together in a protected urban ensemble.", history: "The peninsula preserves evidence of a settlement from the second millennium BCE, the Greek colony of Mesambria, ancient fortifications and medieval Christian buildings. UNESCO inscribed the Ancient City of Nessebar on the World Heritage List in 1983 under criteria (iii) and (iv), recognising its layered heritage and the relationship between its urban fabric and coastal setting.", facts: ["The property has been on the UNESCO World Heritage List since 1983.", "The protected property encompasses the rocky peninsula and its successive cultural layers.", "Medieval churches, archaeology and Revival-period houses form one connected historic environment."], keywords: ["Nessebar", "UNESCO", "Mesambria", "medieval churches", "vernacular architecture"] }
    }, images: [],
    sources: [
      { title: "Ancient City of Nessebar", url: "https://whc.unesco.org/en/list/217", publisher: "UNESCO World Heritage Centre", verifiedAt: regionalVerifiedAt },
      { title: "Ancient City of Nessebar — geographical data", url: "https://whc.unesco.org/en/list/217/maps/", publisher: "UNESCO World Heritage Centre", verifiedAt: regionalVerifiedAt }
    ]
  },
  {
    id: "lm-sozopol-archaeological", slug: "sozopol-archaeological-museum", category: "museums", municipality: "Созопол", area: "Старият Созопол",
    address: "пл. „Хан Крум“ 3", latitude: 42.421919, longitude: 27.6927,
    officialUrl: "https://sozopol-museums.bg/arheologicheski-muzey/", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: regionalVerifiedAt, status: "PUBLISHED", featured: true,
    translations: {
      bg: { name: "Археологически музей — Созопол", short: "Хилядолетната история на Аполония и Созопол, разказана чрез находки от сушата и морето.", description: "Музеят представя културното наследство на Созопол и района от праисторията до Новото време, с особен акцент върху антична Аполония.", history: "Археологическият музей е създаден през 1961 г. Експозицията проследява историята на района от V хилядолетие пр. Хр. до XVIII век и включва каменни котви, антична керамика, находки от некрополите на Аполония и средновековни предмети. Част от разказа е мраморният реликварий, свързан с откритите през 2010 г. на остров Свети Иван реликви, приписвани на свети Йоан Кръстител.", facts: ["Музеят е създаден през 1961 г.", "Експозицията включва над хиляда предмета в няколко тематични зали.", "Колекцията пази свидетелства за морската търговия и историята на антична Аполония."], keywords: ["Созопол", "Аполония", "археология", "гръцка керамика", "морско наследство"] },
      en: { name: "Sozopol Archaeological Museum", short: "The millennial story of Apollonia and Sozopol told through finds from land and sea.", description: "The museum presents the heritage of Sozopol and its region from prehistory to the early modern period, with a particular focus on ancient Apollonia.", history: "Founded in 1961, the Archaeological Museum follows the region from the fifth millennium BCE to the eighteenth century. Its displays include stone anchors, ancient ceramics, finds from Apollonia's necropolises and medieval objects. The story also includes the marble reliquary connected with relics discovered on St. Ivan Island in 2010 and attributed to St. John the Baptist.", facts: ["The museum was established in 1961.", "More than a thousand objects are presented across several thematic halls.", "The collections preserve evidence of maritime trade and the history of ancient Apollonia."], keywords: ["Sozopol", "Apollonia", "archaeology", "Greek pottery", "maritime heritage"] }
    }, images: [],
    sources: [
      { title: "Археологически музей", url: "https://sozopol-museums.bg/arheologicheski-muzey/", publisher: "ОКИ „Музеен център“ — Созопол", verifiedAt: regionalVerifiedAt },
      { title: "Sozopol Archaeological Museum coordinate record", url: "https://www.wikidata.org/wiki/Q637064", publisher: "Wikidata", verifiedAt: regionalVerifiedAt }
    ]
  },
  {
    id: "lm-begliktash", slug: "begliktash", category: "archaeology", municipality: "Приморско", area: "Маслен нос",
    address: null, latitude: 42.311516, longitude: 27.767165,
    officialUrl: "https://www.burgasmuseums.bg/en/encdetail/beglik-tash-23", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: regionalVerifiedAt, status: "PUBLISHED", featured: true,
    translations: {
      bg: { name: "Бегликташ", short: "Скална среда край Приморско, проучвана като тракийски ритуален комплекс.", description: "Бегликташ е археологически обект сред големи естествени сиенитни блокове в района на Маслен нос, северно от Приморско.", history: "Археологическите проучвания определят Бегликташ като тракийско светилище, използвано през продължителен период от късната бронзова епоха до късната античност. Разкопките разкриват ритуален комплекс и свързани пространства. Функциите на отделните скални форми се представят предпазливо, защото част от популярните астрономически тълкувания остават интерпретации, а не безспорно установени факти.", facts: ["Системните археологически проучвания започват в началото на XXI век.", "Обектът се намира сред естествени скални блокове в района на Маслен нос.", "Посетителската информация и условията за достъп трябва да се проверяват преди тръгване."], keywords: ["Бегликташ", "траки", "светилище", "скален комплекс", "Приморско"] },
      en: { name: "Begliktash", short: "A rock landscape near Primorsko studied as a Thracian ritual complex.", description: "Begliktash is an archaeological site among large natural syenite blocks in the Maslen Nos area north of Primorsko.", history: "Archaeological research identifies Begliktash as a Thracian sanctuary used over a long period from the Late Bronze Age into Late Antiquity. Excavations revealed a ritual complex and associated spaces. The functions of individual rock formations are described cautiously because some popular astronomical readings remain interpretations rather than firmly established facts.", facts: ["Systematic archaeological research began in the early twenty-first century.", "The site lies among natural rock blocks in the Maslen Nos area.", "Current visitor information and access conditions should be checked before travelling."], keywords: ["Begliktash", "Thracian", "sanctuary", "rock complex", "Primorsko"] }
    }, images: [],
    sources: [
      { title: "Beglik Tash", url: "https://www.burgasmuseums.bg/en/encdetail/beglik-tash-23", publisher: "Регионален исторически музей — Бургас", verifiedAt: regionalVerifiedAt },
      { title: "Beglik Tash map record", url: "https://www.openstreetmap.org/node/487114743", publisher: "OpenStreetMap contributors", verifiedAt: regionalVerifiedAt }
    ]
  },
  {
    id: "lm-ropotamo-pier", slug: "ropotamo-boat-pier", category: "nature", municipality: "Приморско", area: "Резерват „Ропотамо“",
    address: "пристанът под моста на път E87", latitude: 42.302675, longitude: 27.727931,
    officialUrl: "https://pdbase.eea.government.bg/zpo/bg/area.jsp?NEM_Partition=1&areaID=53&categoryID=1", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: regionalVerifiedAt, status: "PUBLISHED", featured: false,
    translations: {
      bg: { name: "Посетителски пристан при резерват „Ропотамо“", short: "Точна отправна точка към разрешено опознаване на една от най-ценните защитени територии по Южното Черноморие.", description: "Маркерът показва пристана под моста на E87, публикуван като изходна точка за организирани туристически пътувания с лодка по долното течение на Ропотамо.", history: "Резерват „Ропотамо“ опазва съчетание от речни, крайбрежни, горски и влажни местообитания. Като строг резерват той има специален режим: разрешени са организирани туристически пътувания с лодки и посещения с познавателна цел по определени маршрути. Затова приложението не поставя произволен център на защитената площ, а конкретна посетителска точка.", facts: ["Ропотамо е резерват с площ 1000,7 хектара според официалния регистър.", "Посещенията трябва да следват разрешените маршрути и действащия режим на защитената територия.", "Маркерът е при пристана под моста на E87, а не в чувствителна вътрешна част на резервата."], keywords: ["Ропотамо", "резерват", "природа", "лодка", "защитена територия"] },
      en: { name: "Ropotamo Reserve Visitor Boat Pier", short: "A precise starting point for permitted discovery of one of the southern Black Sea coast's most valuable protected areas.", description: "The marker identifies the pier beneath the E87 bridge, published as the starting point for organised visitor boat trips along the lower Ropotamo River.", history: "Ropotamo Reserve protects a combination of river, coastal, forest and wetland habitats. As a strict reserve it has a special regime: organised tourist boat trips and educational visits on designated routes are among the permitted activities. The application therefore marks a specific visitor access point rather than an arbitrary centre inside the protected area.", facts: ["The official register gives the reserve an area of 1,000.7 hectares.", "Visits must follow designated routes and the current protected-area rules.", "The marker is at the pier beneath the E87 bridge, not in a sensitive interior area of the reserve."], keywords: ["Ropotamo", "reserve", "nature", "boat", "protected area"] }
    }, images: [],
    sources: [
      { title: "Регистър на защитените територии — Ропотамо", url: "https://pdbase.eea.government.bg/zpo/bg/area.jsp?NEM_Partition=1&areaID=53&categoryID=1", publisher: "Изпълнителна агенция по околна среда", verifiedAt: regionalVerifiedAt },
      { title: "Резерват „Ропотамо“ — посетителски точки и координати", url: "https://greencorridors.burgas.bg/bg/objects/view/15", publisher: "Проект „Зелени коридори“", verifiedAt: regionalVerifiedAt }
    ]
  },
  {
    id: "lm-pomorie-salt", slug: "pomorie-salt-museum", category: "museums", municipality: "Поморие", area: "Поморийско езеро",
    address: "край Поморийското езеро", latitude: 42.565542, longitude: 27.631802,
    officialUrl: "https://pomorietourism.bg/en/salt-museum-pomorie/", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: regionalVerifiedAt, status: "PUBLISHED", featured: true,
    translations: {
      bg: { name: "Музей на солта — Поморие", short: "Жива връзка между Поморийското езеро, морската вода и традиционния солодобив.", description: "Музеят съчетава експозиция и открити солници, които обясняват традиционния добив на морска сол чрез слънчево изпарение.", history: "Музеят на солта е създаден с подкрепата на Община Поморие, Република България и Европейския съюз. Той представя местната анхиалска технология за производство на сол и връзката ѝ с развитието на Поморие. До музейната сграда са запазени солни басейни, които превръщат мястото в открита демонстрация на културен пейзаж и трудова традиция.", facts: ["Музеят се намира на брега на Поморийското езеро.", "Експозицията включва снимки, инструменти и предмети, свързани със солодобива.", "Работното време и условията за посещение се проверяват в официалния сайт."], keywords: ["Поморие", "сол", "солници", "музей", "Поморийско езеро"] },
      en: { name: "Pomorie Salt Museum", short: "A living connection between Pomorie Lake, seawater and traditional salt making.", description: "The museum combines an indoor exhibition with open salt pans that explain traditional sea-salt production through solar evaporation.", history: "The Salt Museum was created with support from Pomorie Municipality, the Republic of Bulgaria and the European Union. It presents the local Anhialo method of salt production and its connection with the development of Pomorie. Preserved salt pans beside the museum turn the site into an open-air interpretation of a cultural landscape and working tradition.", facts: ["The museum stands on the shore of Pomorie Lake.", "Its exhibition includes photographs, tools and objects connected with salt production.", "Current opening information and visitor conditions should be checked on the official website."], keywords: ["Pomorie", "salt", "salt pans", "museum", "Pomorie Lake"] }
    }, images: [],
    sources: [
      { title: "Музей на солта — Поморие", url: "https://pomorietourism.bg/en/salt-museum-pomorie/", publisher: "Община Поморие", verifiedAt: regionalVerifiedAt },
      { title: "Pomorie Salt Museum map record", url: "https://www.openstreetmap.org/way/254395824", publisher: "OpenStreetMap contributors", verifiedAt: regionalVerifiedAt }
    ]
  },
  {
    id: "lm-pomorie-tomb", slug: "pomorie-ancient-tomb", category: "archaeology", municipality: "Поморие", area: "Кротирия",
    address: "местност Кротирия", latitude: 42.567376, longitude: 27.596345,
    officialUrl: "https://pomorietourism.bg/en/thracian-antique-dome-tomb/", accessibility: null, openingHours: null, entryFees: null,
    lastVerifiedAt: regionalVerifiedAt, status: "PUBLISHED", featured: false,
    translations: {
      bg: { name: "Антична куполна гробница край Поморие", short: "Необичайна антична гробнична архитектура в западния некропол на древния Анхиало.", description: "Гробницата е разположена под могилен насип и включва дълъг коридор и кръгла камера с куха централна колона.", history: "Обектът е датиран в римската епоха, между II и IV век. Тълкува се като мавзолей на заможно семейство от Анхиало, където са извършвани възпоменателни и религиозни ритуали. Архитектурата съчетава коридор, кръгла камера и куха колона, която се разширява нагоре и се слива със свода.", facts: ["Коридорът към камерата е дълъг около 22 метра.", "Кръглата камера е с диаметър около 11,6 метра.", "Датировката и интерпретацията като мавзолей са представени от официалния туристически източник на Община Поморие."], keywords: ["Поморие", "Анхиало", "гробница", "мавзолей", "римска епоха"] },
      en: { name: "Ancient Domed Tomb near Pomorie", short: "Unusual ancient funerary architecture in the western necropolis of ancient Anchialos.", description: "The tomb lies beneath a burial mound and consists of a long corridor and a circular chamber with a hollow central column.", history: "The site is dated to the Roman period, between the second and fourth centuries. It is interpreted as the mausoleum of a prosperous family from Anchialos, where commemorative and religious rites were performed. Its architecture combines a corridor, circular chamber and hollow column that broadens upward and merges with the vault.", facts: ["The corridor leading to the chamber is about 22 metres long.", "The circular chamber is about 11.6 metres in diameter.", "The dating and interpretation as a mausoleum follow the official Pomorie Municipality tourism source."], keywords: ["Pomorie", "Anchialos", "tomb", "mausoleum", "Roman period"] }
    }, images: [],
    sources: [
      { title: "Тракийска антична куполна гробница", url: "https://pomorietourism.bg/en/thracian-antique-dome-tomb/", publisher: "Община Поморие", verifiedAt: regionalVerifiedAt },
      { title: "Ancient domed tomb map record", url: "https://www.openstreetmap.org/node/1890541427", publisher: "OpenStreetMap contributors", verifiedAt: regionalVerifiedAt }
    ]
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

export const landmarks = raw.map((item) => {
  const photo=licensedPhotos[item.slug as keyof typeof licensedPhotos];
  return landmarkSchema.parse({...item,images:photo?[photo]:item.images});
});

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
}), routeSchema.parse({
  id: "route-north-coast", slug: "north-coast-heritage", transportMode: "DRIVING",
  translations: {
    bg: { title: "Наследството на северния бряг", description: "Целодневна регионална линия от Бургас през солта и античността на Поморие до многопластовия Старинен Несебър. Придвижването между градовете изисква транспорт." },
    en: { title: "North Coast Heritage", description: "A full-day regional sequence from Burgas through Pomorie's salt and ancient heritage to layered Ancient Nessebar. Transport is required between towns." }
  },
  stops: [
    { landmarkSlug: "archaeological-museum", note: { bg: "Регионален контекст преди пътуването", en: "Regional context before the journey" } },
    { landmarkSlug: "pomorie-salt-museum", note: { bg: "Живият пейзаж на солодобива", en: "The living landscape of salt making" } },
    { landmarkSlug: "pomorie-ancient-tomb", note: { bg: "Антична гробнична архитектура", en: "Ancient funerary architecture" } },
    { landmarkSlug: "ancient-nessebar", note: { bg: "UNESCO финал на скалистия полуостров", en: "A UNESCO finale on the rocky peninsula" } }
  ]
}), routeSchema.parse({
  id: "route-south-coast", slug: "south-coast-discovery", transportMode: "MIXED",
  translations: {
    bg: { title: "Открития по южния бряг", description: "Регионална екскурзия от археологията на Бургас и Созопол към Бегликташ и разрешената посетителска точка при Ропотамо. Нужни са автомобил и пешеходни участъци; лодката е отделна сезонна услуга." },
    en: { title: "South Coast Discovery", description: "A regional excursion from the archaeology of Burgas and Sozopol to Begliktash and the permitted visitor point at Ropotamo. Driving and walking sections are required; boat trips are a separate seasonal service." }
  },
  stops: [
    { landmarkSlug: "archaeological-museum", note: { bg: "Въведение в историята на залива", en: "An introduction to the bay's history" } },
    { landmarkSlug: "sozopol-archaeological-museum", note: { bg: "Аполония, морето и археологията", en: "Apollonia, the sea and archaeology" } },
    { landmarkSlug: "begliktash", note: { bg: "Скалният ритуален комплекс", en: "The rock ritual complex" } },
    { landmarkSlug: "ropotamo-boat-pier", note: { bg: "Разрешена отправна точка към резервата", en: "A permitted gateway to the reserve" } }
  ]
})];

export const categories = [
  { id: "museums", bg: "Музеи", en: "Museums" },
  { id: "architecture", bg: "Архитектура", en: "Architecture" },
  { id: "archaeology", bg: "Археология", en: "Archaeology" },
  { id: "urban-heritage", bg: "Градско наследство", en: "Urban heritage" },
  { id: "historic-sites", bg: "Исторически места", en: "Historic sites" },
  { id: "nature", bg: "Природа", en: "Nature" },
  { id: "event-venue", bg: "Евровизия 2027", en: "Eurovision 2027" }
];
