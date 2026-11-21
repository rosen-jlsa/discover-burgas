# Data and image sources

## Complete photo coverage — 21 November 2026

All fourteen published landmarks now have documentary photography. Nine previously empty records received explicitly selected Wikimedia Commons photographs, with creator, source page, license URL, original dimensions and retrieval date recorded in `src/data/landmark-photos.json`. Reproduction is available through `scripts/import-landmark-photos.mjs`; web versions are optimized WebP files in `public/images/landmarks/`. Original files range from 1755 to 5712 pixels wide; delivered derivatives are 1280 pixels wide. The existing five licensed images remain in use.

Arena Burgas uses an archival July 2021 exterior and is labelled accordingly. The Ropotamo image depicts a boat trip on the river, not the precise departure pier; the page explicitly distinguishes this from its verified map marker. Images have not been generated or stripped of watermarks. The final selected Pomorie tomb image is the exterior from `File:Pomorie Thracian tomb E7.jpg`.

Last regional-expansion research verification: **14 November 2026**. Visitor information is intentionally nullable; the application does not publish hours, prices, or accessibility claims where current authoritative data was not confirmed.

## Dining and accommodation handoff

Dining summaries were checked on **26 October 2026** against the venues' own websites: [Ti Bar & Kitchen](https://ti-bar.com/bg/za-nas) and [Neptun Restaurant & Bar](https://www.neptunburgas.com/en/restaurant). The app does not republish their photographs, ratings, prices, hours or menus. The cards link to each source and open an external Google Maps search rather than asserting an unverified pinpoint.

Venue photography can be loaded live through the official [Google Places API (New) Text Search and Place Photos endpoints](https://developers.google.com/maps/documentation/places/web-service/place-photos). This requires a server-only `GOOGLE_PLACES_API_KEY`, Places API (New), and an enabled billing account. Photo resource names are requested at display time and responses are sent with `Cache-Control: no-store`; author attribution and a direct Google Maps link are shown with each returned photo. No key is currently configured in this repository's local environment, so the dining UI uses a clearly branded non-documentary art fallback until the owner supplies a restricted key. Do not scrape Google Images or copy photos from Google Maps outside the official API.

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
| Aquae Calidae | [Official visitor site](https://www.aquae-calidae.com/), [RHM Burgas research overview](https://www.burgasmuseums.bg/en/encdetail/aqaue-calidae-24), [Wikimedia category/coordinate record](https://commons.wikimedia.org/wiki/Category:Aquae_Calidae) |
| St. Anastasia Island | [Municipal visitor and sailing information](https://tickets.gotoburgas.com/en/n1451-anastasiaisland), [Ministry of Tourism](https://www.tourism.government.bg/en/tourist-destinations/2802/5568) |
| Arena Burgas — Eurovision 2027 | [Official Eurovision Host City FAQ](https://www.eurovision.com/newsroom/frequently-asked-questions/faqs-burgas-2027/), [BNT Burgas 2027 information](https://eurovision2027.bg/), [coordinate record](https://musicbrainz.org/place/cd28e70d-8dcc-40b6-81b9-7b7efb60b35b) |
| Ancient City of Nessebar | [UNESCO World Heritage property](https://whc.unesco.org/en/list/217), [UNESCO geographical data and boundary map](https://whc.unesco.org/en/list/217/maps/) |
| Sozopol Archaeological Museum | [Museum Centre Sozopol](https://sozopol-museums.bg/arheologicheski-muzey/), [Wikidata coordinate record](https://www.wikidata.org/wiki/Q637064) |
| Begliktash | [RHM Burgas archaeological overview](https://www.burgasmuseums.bg/en/encdetail/beglik-tash-23), [OpenStreetMap cross-check](https://www.openstreetmap.org/node/487114743) |
| Ropotamo visitor boat pier | [Bulgarian protected-areas register](https://pdbase.eea.government.bg/zpo/bg/area.jsp?NEM_Partition=1&areaID=53&categoryID=1), [institutional visitor-point coordinates and access rules](https://greencorridors.burgas.bg/bg/objects/view/15) |
| Pomorie Salt Museum | [Pomorie Municipality tourism portal](https://pomorietourism.bg/en/salt-museum-pomorie/), [OpenStreetMap cross-check](https://www.openstreetmap.org/way/254395824) |
| Ancient Domed Tomb near Pomorie | [Pomorie Municipality tourism portal](https://pomorietourism.bg/en/thracian-antique-dome-tomb/), [OpenStreetMap cross-check](https://www.openstreetmap.org/node/1890541427) |

Coordinates were cross-checked against official location context and OpenStreetMap/Wikimedia records before inclusion. Each source URL and verification date is also stored with its landmark in the seed manifest.

## Image rights

| Asset | Creator | License | Original |
|---|---|---|---|
| Archaeological Museum | MiremS | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Археологически_музей_-_един_от_четирите_музея_в_рамките_на_Регионалния_исторически_музей_в_град_Бургас.jpg) |
| Ethnographic Museum | Vassia Atanassova – Spiritia | CC BY-SA 3.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Burgas-Ethnographic-museum.jpg) |
| Cathedral | Vammpi | Public domain | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Kathedrale_Hl._Kyrill_und_Method_in_Burgas,_Bulgarien.jpg) |
| Aquae Calidae | Galileo01 | CC BY 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Aquae_Calidae.jpg) |
| St. Anastasia Island | EvelinaRibarova | CC BY-SA 4.0 | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:St._Anastasia_Island_(о-в_Света_Анастасия)_-_Burgas,_Bulgaria_-7-2017_(247).jpg) |

The Historical Museum, Burgas Clock, Arena Burgas and all six regional additions use branded non-documentary fallbacks because a suitable reusable image was not included. The source brief did not provide evidence that any referenced images were licensed for republication. Generated imagery is not presented as documentary evidence. Attribution remains visible beside every documentary image.

Arena Burgas also uses the branded non-documentary fallback. No official Eurovision logo or event photography is redistributed. As of 22 October 2026, Arena Burgas is the confirmed contest venue; official Eurovision Village and EuroClub locations have not been announced and are therefore not included.

## Publication procedure

Before a public release, re-check official names, operational status, coordinates, visitor details, image licenses, and external URLs. Update `lastVerifiedAt` and source-level `verifiedAt` only after checking. Never infer missing prices, opening hours, accessibility, or protection status.

## Regional research decisions

| Candidate | Decision | Reason |
|---|---|---|
| Nessebar | `NEW` as `ancient-nessebar` | UNESCO defines a coherent World Heritage property on the peninsula. Individual churches can be added later only with their own visitor and source records. |
| Sozopol | `SPLIT` | The Archaeological Museum has an exact visitor point, institutional source and strong QR story. “Old Sozopol” remains contextual rather than becoming a vague centroid. |
| Aquae Calidae | `UPDATE` | Existing permanent slug preserved; official visitor and RHM sources strengthened. |
| Begliktash | `NEW` | Exact archaeological object and corroborated coordinate. Astronomical readings are not presented as established fact. |
| Ropotamo | `NEW` as `ropotamo-boat-pier` | A strict reserve is not a normal point. The marker is the published visitor pier under the E87 bridge and the copy states the protected-area restrictions. |
| Pomorie | `SPLIT` | The Salt Museum and Ancient Domed Tomb are separate cultural objects with different locations and stories. |
| St. Anastasia Island | `UPDATE` | Existing permanent slug preserved; current visitor authority and Ministry of Tourism sources added. Schedules and prices remain unpublished in the manifest. |
| Cape Atia | `REQUIRES MORE RESEARCH` | Evidence supports archaeological context around the peninsula, but a meaningful, publicly accessible visitor object was not established. The proximity of an active naval base makes an invented visitor marker inappropriate. |

The regional records were checked claim-by-claim for official name, chronology, status, coordinates, visitor meaning and access risks. Where sources supplied current operating information, the application still keeps those fields null because they can change independently of the historical record.

