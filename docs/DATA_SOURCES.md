# Data and image sources

Last research verification: **22 October 2026**. Visitor information is intentionally nullable; the application does not publish hours, prices, or accessibility claims where current authoritative data was not confirmed.

## Dining and accommodation handoff

Dining summaries were checked on **26 October 2026** against the venues' own websites: [Ti Bar & Kitchen](https://ti-bar.com/bg/za-nas) and [Neptun Restaurant & Bar](https://www.neptunburgas.com/en/restaurant). The app does not republish their photographs, ratings, prices, hours or menus. The cards link to each source and open an external Google Maps search rather than asserting an unverified pinpoint.

The stays page sends visitors to [Booking.com Burgas search](https://www.booking.com/searchresults.html?ss=Burgas%2C%20Bulgaria) and [Airbnb Burgas stays](https://www.airbnb.com/burgas-bulgaria/stays). These are external searches, without live inventory, prices or claimed commercial partnerships. [Booking.com Demand API](https://developers.booking.com/demand/docs/getting-started/prerequisites) requires Managed Affiliate status, an API token and an affiliate ID. Airbnb's [API terms](https://www.airbnb.com/help/article/3418) describe partner programs; no open general accommodation search API was verified for this project.

## City story

- [Burgas Municipality — Historical overview](https://www.burgas.bg/bg/istoricheska-spravka), accessed 22 October 2026. Used for the settlement layers, Pyrgos, the post-Liberation municipality, the Yambol–Burgas railway, the 1891 urban plan, and the 1903 port.
- [Burgas Municipality — Integrated Development Plan 2021–2027 public consultation](https://www.burgas.bg/bg/novini/planat-za-integrirano-razvitie-na-obshtina-burgas-2021-2027-g-be-razgledan-na-obshtestveno-obsazhdane), accessed 22 October 2026. Used only to describe published strategic directions; no future outcome is presented as guaranteed.

## Editorial and visitor sources

| Record | Primary sources |
|---|---|
| Archaeological Museum | [RHM Burgas visitor information](https://www.burgasmuseums.bg/bg/visit), [About the museum](https://www.burgasmuseums.bg/bg/about) |
| Ethnographic Museum | [RHM Burgas visitor information](https://www.burgasmuseums.bg/bg/visit), [Cultural programme](https://burgasmuseums.bg/bg/culturalprogramme) |
| Historical Museum | [Museum history](https://www.burgasmuseums.bg/bg/encdetail/kratka-hronika-istoriyata-istoricheskiya-muzey-333), [visitor information](https://www.burgasmuseums.bg/bg/visit) |
| Saints Cyril and Methodius Cathedral | [Official Go to Burgas entry](https://info.gotoburgas.com/bg/explore/religious/church-saints-cyril-and-methodius) |
| The Burgas Clock | [Go to Burgas walking-tour meeting-point reference](https://info.gotoburgas.com/bg/news/free-tours-of-burgas-for-the-eighth-consecutive-year-from-bu) |
| Aquae Calidae | [Official Go to Burgas landmark directory](https://info.gotoburgas.com/bg/explore/landmark), [Wikimedia category/coordinate record](https://commons.wikimedia.org/wiki/Category:Aquae_Calidae) |
| St. Anastasia Island | [Official Go to Burgas entry](https://info.gotoburgas.com/bg/explore/landmark/st-anastasia-island) |
| Arena Burgas — Eurovision 2027 | [Official Eurovision Host City FAQ](https://www.eurovision.com/newsroom/frequently-asked-questions/faqs-burgas-2027/), [BNT Burgas 2027 information](https://eurovision2027.bg/), [coordinate record](https://musicbrainz.org/place/cd28e70d-8dcc-40b6-81b9-7b7efb60b35b) |

Coordinates were cross-checked against official location context and OpenStreetMap/Wikimedia records before inclusion. Each source URL and verification date is also stored with its landmark in the seed manifest.

## Image rights

| Asset | Creator | License | Original |
|---|---|---|---|
| Archaeological Museum | MiremS | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Археологически_музей_-_един_от_четирите_музея_в_рамките_на_Регионалния_исторически_музей_в_град_Бургас.jpg) |
| Ethnographic Museum | Vassia Atanassova – Spiritia | CC BY-SA 3.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Burgas-Ethnographic-museum.jpg) |
| Cathedral | Vammpi | Public domain | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kathedrale_Hl._Kyrill_und_Method_in_Burgas,_Bulgarien.jpg) |
| Aquae Calidae | Galileo01 | CC BY 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Aquae_Calidae.jpg) |
| St. Anastasia Island | EvelinaRibarova | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:St._Anastasia_Island_(о-в_Света_Анастасия)_-_Burgas,_Bulgaria_-7-2017_(247).jpg) |

The Historical Museum and Burgas Clock use branded non-documentary fallbacks because a suitable reusable image was not included. Generated imagery is not presented as documentary evidence. Attribution remains visible beside every documentary image.

Arena Burgas also uses the branded non-documentary fallback. No official Eurovision logo or event photography is redistributed. As of 22 October 2026, Arena Burgas is the confirmed contest venue; official Eurovision Village and EuroClub locations have not been announced and are therefore not included.

## Publication procedure

Before a public release, re-check official names, operational status, coordinates, visitor details, image licenses, and external URLs. Update `lastVerifiedAt` and source-level `verifiedAt` only after checking. Never infer missing prices, opening hours, accessibility, or protection status.

