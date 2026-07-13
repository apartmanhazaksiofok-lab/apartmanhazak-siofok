import { useState, useEffect, useRef } from 'react';

const BASE = 'https://www.apartmanhazaksiofok.hu/static/img';



const T = {
  hu: {
    flag: '🇭🇺',
    nav: { home: 'Főoldal', miro: 'Miro Ház', dali: 'Dali Ház', booking: 'Foglalás', area: 'Környék & Programok', galeria: 'Galéria', contact: 'Kapcsolat' },
    hero: { title: 'Családi, baráti vakáció', sub: 'gyönyörű környezetben', desc: 'Két művészi apartmanház az Aranyparton, Siófokon.\nMindössze pár lépésre a Balatontól. 🌊', miro: 'Miro Ház', dali: 'Dali Ház', fromStrand150: '🌊 150m a strandtól', fromStrand200: '🌊 200m a strandtól' },
    features: { wifi: 'Ingyenes WiFi', pet: 'Kisállatbarát', ac: 'Klíma', baby: 'Bababarát', parking: 'Ingyenes parkolás', grill: 'Kerti grill', playground: 'Játszótér' },
    house: { apartments: 'Apartmanjaink', gallery: 'Galéria', book: 'Foglalás →', from: '-tól' },
    booking: { title: 'Foglalás', desc: 'Válassza ki az Önnek megfelelő időpontot és apartmant', checkin: 'Érkezés', checkout: 'Távozás', guests: 'Vendégek', apartment: 'Apartman', anyone: 'Mindegy', send: 'Foglalási kérelem küldése', or: 'vagy foglaljon közvetlenül:', sent: 'Foglalási kérelem elküldve!', sentDesc: 'Hamarosan felvesszük Önnel a kapcsolatot.\nVagy foglaljon közvetlenül itt:', onlineBook: 'Online Foglalás →', person: 'fő', conditions: '📋 Foglalási feltételek', preseason: 'Előszézon', preseasonDesc: 'Jún 1 – Jún 18 min. 2 éjszaka, szabad érkezési nap.', highseason: 'Főszezon', highseasonDesc: 'Jún 19 – Aug 23: min. 5 éjszaka, érkezés vasárnap és hétfőn.', postseason: 'Utószezón', postseasonDesc: 'Aug 24 – Szept 14: min. 3 éjszaka, szabad érkezés.', arrival: 'Érkezés', departure: 'Távozás', cancel: 'Lemondás', cancelDesc: '51+ nap: ingyenes · 20–50 nap: 50% kötbér · 19 nap alatt: 100%', ifa: 'IFA', ifaDesc: '750 Ft/fő/éj (18 év felett)', payment: 'Fizetés', paymentDesc: 'OTP SZÉP kártya elfogadva · Átutalás (HUF/EUR)' },
    contact: { title: 'Kapcsolat', contacts: 'Elérhetőségek', message: 'Üzenjen nekünk', name: 'Neve', email: 'Email címe', msg: 'Üzenete…', send: 'Üzenet küldése →', sent: 'Üzenet elküldve! Hamarosan válaszolunk. 🎉', miroRoute: '📍 Miro Ház útvonaltervezés →', daliRoute: '📍 Dali Ház útvonaltervezés →' },
    area: { title: 'Környék & Programok', desc: 'Fedezze fel Siófok kínálatát!', web: 'Weboldal megtekintése →' },
    gallery: { title: 'Galéria', desc: 'Apartmanjaink képei' },
    home: { intro: 'Nem hotel. Nem tömeg. Hanem balatoni nyugalom.\nMűvészi hangulatú házaink Siófok csendes, zöldövezeti részén várják vendégeinket otthonos apartmanokkal, tágas nappalikkal és kényelmes hálószobákkal. A gondozott kertben grill, árnyas pihenőrészek és családias hangulat biztosítja a feltöltődést, miközben nálunk a kutyusok is szívesen látott vendégek.\nA Dali és Miro ház pár perc sétára található az ingyenes Aranypart strandtól, ahol széles partszakasz, büfék, éttermek, vízi sportok és programlehetőségek várják a vendégeket. A közelben homokos öböl, balatoni séták és nyugodt esti kikapcsolódás teszi teljessé a pihenést — távol a party-Siófok nyüzsgésétől.', choose: 'Válasszon házaink közül', chooseDesc: 'Mindkét ház az Aranyparton, nyugodt, zöld környezetben', view: 'Megnézem →', ready: 'Készen áll a pihenésre?', readyDesc: 'Foglalja le álmai apartmanját a Balaton partján!', bookNow: 'Foglalás most →', features: [{ icon: 'calendar', label: 'Online foglalás', desc: 'Egyszerű, gyors' }, { icon: 'chat', label: 'Élő chat', desc: 'Azonnali segítség' }, { icon: 'doc', label: 'Early Check-in', desc: 'Gyorsabb érkezés' }, { icon: 'star', label: '8 egyedi apartman', desc: 'Családoknak, pároknak' }] },
    reviews: { title: 'Rólunk mondták', subtitle: 'Vendégeink véleménye a Booking.com-on', bookingLink: 'Összes vélemény a Booking.com-on →', miroLabel: 'Miro Ház', daliLabel: 'Dali Ház' },
    footer: '© 2026 apARTmanházak Siófok · Telmat Kft. · Minden jog fenntartva',
  },
  en: {
    flag: '🇬🇧',
    nav: { home: 'Home', miro: 'Miro House', dali: 'Dali House', booking: 'Booking', area: 'Neighbourhood', galeria: 'Gallery', contact: 'Contact' },
    hero: { title: 'Family & Friends Vacation', sub: 'in a beautiful setting', desc: 'Two artistic apartment houses on the Golden Shore, Siófok.\nJust a few steps from Lake Balaton. 🌊', miro: 'Miro House', dali: 'Dali House', fromStrand150: '🌊 150m from the beach', fromStrand200: '🌊 200m from the beach' },
    features: { wifi: 'Free WiFi', pet: 'Pet friendly', ac: 'Air conditioning', baby: 'Baby friendly', parking: 'Free parking', grill: 'Garden BBQ', playground: 'Playground' },
    house: { apartments: 'Our Apartments', gallery: 'Gallery', book: 'Book now →', from: 'from' },
    booking: { title: 'Booking', desc: 'Choose your preferred dates and apartment', checkin: 'Check-in', checkout: 'Check-out', guests: 'Guests', apartment: 'Apartment', anyone: 'Any', send: 'Send booking request', or: 'or book directly:', sent: 'Booking request sent!', sentDesc: 'We will contact you shortly.\nOr book directly here:', onlineBook: 'Online Booking →', person: 'guests', conditions: '📋 Booking conditions', preseason: 'Pre-season', preseasonDesc: 'Jun 1 – Jun 18: min. 2 nights, flexible arrival.', highseason: 'High season', highseasonDesc: 'Jun 19 – Aug 23: min. 5 nights, arrival Sun & Mon.', postseason: 'Post-season', postseasonDesc: 'Aug 24 – Sep 14: min. 3 nights, flexible arrival.', arrival: 'Arrival', departure: 'Departure', cancel: 'Cancellation', cancelDesc: '51+ days: free · 20–50 days: 50% fee · Under 19 days: 100%', ifa: 'Tourist tax', ifaDesc: '750 HUF/person/night (over 18)', payment: 'Payment', paymentDesc: 'OTP SZÉP card accepted · Bank transfer (HUF/EUR)' },
    contact: { title: 'Contact', contacts: 'Contact details', message: 'Send us a message', name: 'Your name', email: 'Your email', msg: 'Your message…', send: 'Send message →', sent: 'Message sent! We will reply soon. 🎉', miroRoute: '📍 Miro House directions →', daliRoute: '📍 Dali House directions →' },
    area: { title: 'Neighbourhood & Activities', desc: 'Discover what Siófok has to offer!', web: 'Visit website →' },
    gallery: { title: 'Gallery', desc: 'Photos of our apartments' },
    home: { intro: 'Not a hotel. Not a crowd. Just pure Balaton tranquillity.\nOur artistically inspired houses await guests in the quiet green district of Siófok, with homely apartments, spacious living rooms and comfortable bedrooms. In the well-kept garden, a barbecue, shaded relaxation areas and a warm family atmosphere ensure a truly restorative stay — and your four-legged friends are warmly welcome too.\nDali and Miro House are just a few minutes\' walk from the free Golden Shore beach, where a wide waterfront, snack bars, restaurants, water sports and activities await. Nearby you\'ll find sandy bays, lakeside walks and peaceful evening relaxation — far from the hustle of party Siófok.', choose: 'Choose your house', chooseDesc: 'Both houses on the Golden Shore, in a peaceful green setting', view: 'View →', ready: 'Ready for your vacation?', readyDesc: 'Book your dream apartment on the shores of Lake Balaton!', bookNow: 'Book now →', features: [{ icon: 'calendar', label: 'Online booking', desc: 'Simple & fast' }, { icon: 'chat', label: 'Live chat', desc: 'Instant help' }, { icon: 'doc', label: 'Early Check-in', desc: 'Faster arrival' }, { icon: 'star', label: '8 unique apartments', desc: 'For families & couples' }] },
    reviews: { title: 'What our guests say', subtitle: 'Guest reviews on Booking.com', bookingLink: 'All reviews on Booking.com →', miroLabel: 'Miro House', daliLabel: 'Dali House' },
    footer: '© 2026 apARTmanházak Siófok · Telmat Kft. · All rights reserved',
  },
  de: {
    flag: '🇩🇪',
    nav: { home: 'Startseite', miro: 'Miro Haus', dali: 'Dali Haus', booking: 'Buchung', area: 'Umgebung', galeria: 'Galerie', contact: 'Kontakt' },
    hero: { title: 'Familien- & Freundesurlaub', sub: 'in wunderschöner Umgebung', desc: 'Zwei künstlerische Apartmenthäuser am Goldenen Ufer, Siófok.\nNur wenige Schritte vom Balaton. 🌊', miro: 'Miro Haus', dali: 'Dali Haus', fromStrand150: '🌊 150m vom Strand', fromStrand200: '🌊 200m vom Strand' },
    features: { wifi: 'Kostenloses WLAN', pet: 'Haustierfreundlich', ac: 'Klimaanlage', baby: 'Babyfreundlich', parking: 'Kostenloser Parkplatz', grill: 'Garten-Grill', playground: 'Spielplatz' },
    house: { apartments: 'Unsere Apartments', gallery: 'Galerie', book: 'Buchen →', from: 'ab' },
    booking: { title: 'Buchung', desc: 'Wählen Sie Ihre bevorzugten Daten und Ihr Apartment', checkin: 'Anreise', checkout: 'Abreise', guests: 'Gäste', apartment: 'Apartment', anyone: 'Egal', send: 'Buchungsanfrage senden', or: 'oder direkt buchen:', sent: 'Buchungsanfrage gesendet!', sentDesc: 'Wir werden Sie in Kürze kontaktieren.\nOder buchen Sie direkt hier:', onlineBook: 'Online buchen →', person: 'Pers.', conditions: '📋 Buchungsbedingungen', preseason: 'Vorsaison', preseasonDesc: '1. Jun – 18. Jun: min. 2 Nächte, freier Anreisetag.', highseason: 'Hochsaison', highseasonDesc: '19. Jun – 23. Aug: min. 5 Nächte, Anreise So & Mo.', postseason: 'Nachsaison', postseasonDesc: '24. Aug – 14. Sep: min. 3 Nächte, freie Anreise.', arrival: 'Anreise', departure: 'Abreise', cancel: 'Stornierung', cancelDesc: '51+ Tage: kostenlos · 20–50 Tage: 50% · Unter 19 Tage: 100%', ifa: 'Kurtaxe', ifaDesc: '750 HUF/Person/Nacht (über 18)', payment: 'Zahlung', paymentDesc: 'OTP SZÉP Karte akzeptiert · Überweisung (HUF/EUR)' },
    contact: { title: 'Kontakt', contacts: 'Kontaktdaten', message: 'Schreiben Sie uns', name: 'Ihr Name', email: 'Ihre E-Mail', msg: 'Ihre Nachricht…', send: 'Nachricht senden →', sent: 'Nachricht gesendet! Wir antworten bald. 🎉', miroRoute: '📍 Wegbeschreibung Miro Haus →', daliRoute: '📍 Wegbeschreibung Dali Haus →' },
    area: { title: 'Umgebung & Aktivitäten', desc: 'Entdecken Sie das Angebot von Siófok!', web: 'Website besuchen →' },
    gallery: { title: 'Galerie', desc: 'Fotos unserer Apartments' },
    home: { intro: 'Kein Hotel. Keine Masse. Einfach Balaton-Ruhe.\nUnsere künstlerisch gestalteten Häuser empfangen Gäste im ruhigen, grünen Teil Siófoks mit gemütlichen Apartments, großzügigen Wohnzimmern und komfortablen Schlafzimmern. Im gepflegten Garten sorgen ein Grill, schattige Ruhebereiche und eine familiäre Atmosphäre für echte Erholung — und Vierbeiner sind bei uns herzlich willkommen.\nDali und Miro House sind nur wenige Gehminuten vom kostenlosen Goldenen-Ufer-Strand entfernt, wo ein breites Ufer, Imbisse, Restaurants, Wassersport und Freizeitangebote warten. In der Nähe laden Sandbuchten, Spaziergänge am See und ruhige Abende zur Entspannung ein — weit weg vom Trubel des Party-Siófok.', choose: 'Wählen Sie Ihr Haus', chooseDesc: 'Beide Häuser am Goldenen Ufer, in ruhiger grüner Umgebung', view: 'Ansehen →', ready: 'Bereit für den Urlaub?', readyDesc: 'Buchen Sie Ihr Traumapartment am Ufer des Balatons!', bookNow: 'Jetzt buchen →', features: [{ icon: 'calendar', label: 'Online-Buchung', desc: 'Einfach & schnell' }, { icon: 'chat', label: 'Live-Chat', desc: 'Sofortige Hilfe' }, { icon: 'doc', label: 'Early Check-in', desc: 'Schnellere Ankunft' }, { icon: 'star', label: '8 einzigartige Apartments', desc: 'Für Familien & Paare' }] },
    reviews: { title: 'Das sagen unsere Gäste', subtitle: 'Gästebewertungen auf Booking.com', bookingLink: 'Alle Bewertungen auf Booking.com →', miroLabel: 'Miro Haus', daliLabel: 'Dali Haus' },
    footer: '© 2026 apARTmanházak Siófok · Telmat Kft. · Alle Rechte vorbehalten',
  },
  pl: {
    flag: '🇵🇱',
    nav: { home: 'Strona główna', miro: 'Dom Miro', dali: 'Dom Dali', booking: 'Rezerwacja', area: 'Okolica', galeria: 'Galeria', contact: 'Kontakt' },
    hero: { title: 'Wakacje z rodziną i przyjaciółmi', sub: 'w pięknym otoczeniu', desc: 'Dwa artystyczne apartamentowce na Złotym Brzegu, Siófok.\nZaledwie kilka kroków od Balatonu. 🌊', miro: 'Dom Miro', dali: 'Dom Dali', fromStrand150: '🌊 150m od plaży', fromStrand200: '🌊 200m od plaży' },
    features: { wifi: 'Bezpłatne WiFi', pet: 'Zwierzęta mile widziane', ac: 'Klimatyzacja', baby: 'Przyjazny dla dzieci', parking: 'Bezpłatny parking', grill: 'Grill ogrodowy', playground: 'Plac zabaw' },
    house: { apartments: 'Nasze apartamenty', gallery: 'Galeria', book: 'Zarezerwuj →', from: 'od' },
    booking: { title: 'Rezerwacja', desc: 'Wybierz preferowane daty i apartament', checkin: 'Przyjazd', checkout: 'Wyjazd', guests: 'Goście', apartment: 'Apartament', anyone: 'Dowolny', send: 'Wyślij prośbę o rezerwację', or: 'lub zarezerwuj bezpośrednio:', sent: 'Prośba wysłana!', sentDesc: 'Skontaktujemy się wkrótce.\nLub zarezerwuj bezpośrednio tutaj:', onlineBook: 'Rezerwacja online →', person: 'os.', conditions: '📋 Warunki rezerwacji', preseason: 'Przedsezon', preseasonDesc: '1 cze – 18 cze: min. 2 noce, dowolny dzień przyjazdu.', highseason: 'Sezon wysoki', highseasonDesc: '19 cze – 23 sie: min. 5 nocy, przyjazd niedz. i pon.', postseason: 'Posezon', postseasonDesc: '24 sie – 14 wrz: min. 3 noce, dowolny przyjazd.', arrival: 'Przyjazd', departure: 'Wyjazd', cancel: 'Anulowanie', cancelDesc: '51+ dni: bezpłatne · 20–50 dni: 50% · Poniżej 19 dni: 100%', ifa: 'Opłata turystyczna', ifaDesc: '750 HUF/osoba/noc (powyżej 18 lat)', payment: 'Płatność', paymentDesc: 'Karta OTP SZÉP akceptowana · Przelew (HUF/EUR)' },
    contact: { title: 'Kontakt', contacts: 'Dane kontaktowe', message: 'Napisz do nas', name: 'Twoje imię', email: 'Twój e-mail', msg: 'Twoja wiadomość…', send: 'Wyślij wiadomość →', sent: 'Wiadomość wysłana! Odpowiemy wkrótce. 🎉', miroRoute: '📍 Trasa do Domu Miro →', daliRoute: '📍 Trasa do Domu Dali →' },
    area: { title: 'Okolica i atrakcje', desc: 'Odkryj ofertę Siófok!', web: 'Odwiedź stronę →' },
    gallery: { title: 'Galeria', desc: 'Zdjęcia naszych apartamentów' },
    home: { intro: 'Nie hotel. Nie tłum. Po prostu balatońska cisza.\nNasze artystycznie nastrojone domy czekają na gości w cichej, zielonej dzielnicy Siófoku z przytulnymi apartamentami, przestronnymi salonami i wygodnymi sypialniami. W zadbanym ogrodzie grill, zacienione miejsca do wypoczynku i rodzinna atmosfera zapewniają prawdziwy relaks — a czworonogi są u nas mile widziane.\nDomy Dali i Miro znajdują się zaledwie kilka minut pieszo od bezpłatnej plaży Złotego Brzegu, gdzie czeka szeroka linia brzegowa, bary, restauracje, sporty wodne i atrakcje. W pobliżu piaszczyste zatoki, spacery nad jeziorem i spokojne wieczory dopełniają wypoczynek — z dala od zgiełku imprezowego Siófoku.', choose: 'Wybierz swój dom', chooseDesc: 'Oba domy na Złotym Brzegu, w spokojnym zielonym otoczeniu', view: 'Zobacz →', ready: 'Gotowy na wakacje?', readyDesc: 'Zarezerwuj apartament swoich marzeń nad Balatonem!', bookNow: 'Zarezerwuj teraz →', features: [{ icon: 'calendar', label: 'Rezerwacja online', desc: 'Prosto i szybko' }, { icon: 'chat', label: 'Live chat', desc: 'Natychmiastowa pomoc' }, { icon: 'doc', label: 'Early Check-in', desc: 'Szybszy przyjazd' }, { icon: 'star', label: '8 wyjątkowych apartamentów', desc: 'Dla rodzin i par' }] },
    reviews: { title: 'Co mówią nasi goście', subtitle: 'Opinie gości na Booking.com', bookingLink: 'Wszystkie opinie na Booking.com →', miroLabel: 'Dom Miro', daliLabel: 'Dom Dali' },
    footer: '© 2026 apARTmanházak Siófok · Telmat Kft. · Wszelkie prawa zastrzeżone',
  },
  sk: {
    flag: '🇸🇰',
    nav: { home: 'Domov', miro: 'Dom Miro', dali: 'Dom Dali', booking: 'Rezervácia', area: 'Okolie', galeria: 'Galéria', contact: 'Kontakt' },
    hero: { title: 'Rodinná & priateľská dovolenka', sub: 'v krásnom prostredí', desc: 'Dva umelecké apartmánové domy na Zlatom brehu, Siófok.\nLen pár krokov od Balatonu. 🌊', miro: 'Dom Miro', dali: 'Dom Dali', fromStrand150: '🌊 150m od pláže', fromStrand200: '🌊 200m od pláže' },
    features: { wifi: 'Bezplatné WiFi', pet: 'Domáce zvieratá vítané', ac: 'Klimatizácia', baby: 'Priateľský k deťom', parking: 'Bezplatné parkovanie', grill: 'Záhradný gril', playground: 'Ihrisko' },
    house: { apartments: 'Naše apartmány', gallery: 'Galéria', book: 'Rezervovať →', from: 'od' },
    booking: { title: 'Rezervácia', desc: 'Vyberte si preferované dátumy a apartmán', checkin: 'Príchod', checkout: 'Odchod', guests: 'Hostia', apartment: 'Apartmán', anyone: 'Ľubovoľný', send: 'Odoslať požiadavku', or: 'alebo rezervujte priamo:', sent: 'Požiadavka odoslaná!', sentDesc: 'Čoskoro vás budeme kontaktovať.\nAlebo rezervujte priamo tu:', onlineBook: 'Online rezervácia →', person: 'os.', conditions: '📋 Podmienky rezervácie', preseason: 'Predsezóna', preseasonDesc: '1. jún – 18. jún: min. 2 noci, voľný deň príchodu.', highseason: 'Hlavná sezóna', highseasonDesc: '19. jún – 23. aug: min. 5 nocí, príchod ned. a pon.', postseason: 'Posezóna', postseasonDesc: '24. aug – 14. sep: min. 3 noci, voľný príchod.', arrival: 'Príchod', departure: 'Odchod', cancel: 'Zrušenie', cancelDesc: '51+ dní: zdarma · 20–50 dní: 50% · Do 19 dní: 100%', ifa: 'Turistický poplatok', ifaDesc: '750 HUF/osoba/noc (nad 18 rokov)', payment: 'Platba', paymentDesc: 'Karta OTP SZÉP akceptovaná · Bankový prevod (HUF/EUR)' },
    contact: { title: 'Kontakt', contacts: 'Kontaktné údaje', message: 'Napíšte nám', name: 'Vaše meno', email: 'Váš e-mail', msg: 'Vaša správa…', send: 'Odoslať správu →', sent: 'Správa odoslaná! Čoskoro odpovieme. 🎉', miroRoute: '📍 Trasa k Domu Miro →', daliRoute: '📍 Trasa k Domu Dali →' },
    area: { title: 'Okolie & Aktivity', desc: 'Objavte ponuku Siófoku!', web: 'Navštíviť web →' },
    gallery: { title: 'Galéria', desc: 'Fotografie našich apartmánov' },
    home: { intro: 'Nie hotel. Nie dav. Len balatónsky pokoj.\nNaše umelecky ladené domy čakajú na hostí v tichej, zelenej časti Siófoku s útulnými apartmánmi, priestrannými obývacími izbami a pohodlnými spálňami. V upratanej záhrade gril, tienisté oddychové kútiky a rodinná atmosféra zaručujú skutočnú regeneráciu — a štvornožci sú u nás srdečne vítaní.\nDomy Dali a Miro sú len pár minút pešo od bezplatnej pláže Zlatého brehu, kde čaká široké pobrežie, bufety, reštaurácie, vodné športy a zábava. V okolí pieskové zálivy, prechádzky pri jazere a pokojné večery dotvárajú oddych — ďaleko od ruchu párty Siófoku.', choose: 'Vyberte si dom', chooseDesc: 'Oba domy na Zlatom brehu, v pokojnom zelenom prostredí', view: 'Zobraziť →', ready: 'Pripravení na dovolenku?', readyDesc: 'Rezervujte si apartmán snov pri Balatone!', bookNow: 'Rezervovať teraz →', features: [{ icon: 'calendar', label: 'Online rezervácia', desc: 'Jednoducho a rýchlo' }, { icon: 'chat', label: 'Live chat', desc: 'Okamžitá pomoc' }, { icon: 'doc', label: 'Early Check-in', desc: 'Rýchlejší príchod' }, { icon: 'star', label: '8 jedinečných apartmánov', desc: 'Pre rodiny a páry' }] },
    reviews: { title: 'Čo hovoria naši hostia', subtitle: 'Hodnotenia hostí na Booking.com', bookingLink: 'Všetky hodnotenia na Booking.com →', miroLabel: 'Dom Miro', daliLabel: 'Dom Dali' },
    footer: '© 2026 apARTmanházak Siófok · Telmat Kft. · Všetky práva vyhradené',
  },
};

const APARTMENTS = {
  miro: {
    name: 'Miro Ház', distance: '150m a szabad strandtól', description: 'Modern épület klasszikus részletekkel, 4 apartman két szinten.',
    exterior: `${BASE}/house-miro/exterior-thumb-960.jpg`, priceFrom: '35 000 Ft/éj',
    features: ['Zárt parkolás', 'WiFi', 'Kerti grillezés', 'Homokozó', 'Légkondicionálás'],
    apartments: [
      { id: 'sarga', name: 'Sárga Apartman', color: '#E8B930', beds: '4 fő · 40m² · földszinti · terasz', floor: '2 hálószobás · kilátással a játszótérre', imgPos: 'center 20%',
        hero: `https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/sarga/SargaDouble.png`,
        images: [`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/sarga/miro_sarga_ebedlo_CP.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/sarga/miro_sarga_single_CP.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/sarga/miro_sarga_konyha_cp.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/sarga/miro_sarga_halak_cp.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/sarga/miro_sarga_tv_CP.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/sarga/SargaFurdo.png`],
        amenities: ['Zuhanyzó', 'Felszerelt konyha', 'Mikró', 'Hűtő', 'Smart TV', 'Klíma'] },
      { id: 'barna', name: 'Barna Apartman', color: '#8B6914', beds: '4 fő · 40m² · földszinti · terasz', floor: '2 hálószobás · hűvös terasz',
        hero: `https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/barna/miro_barna_asztal_cp.png`,
        images: [`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/barna/miro_barna_etkezo.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/barna/miro_barna_furdo_cp.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/barna/miro_barna_konyha.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/barna/miroablak.jpg`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/barna/mirojatszoterJo.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/barna/mirokertjo.PNG`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/barna/miroparkolo.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/barna/miroterasz.jpg`,`https://raw.githubusercontent.com/apartmanhazaksiofok-lab/apartmanhazak-siofok/main/miro_barna_furdo_cp.png`,`https://raw.githubusercontent.com/apartmanhazaksiofok-lab/apartmanhazak-siofok/main/miro_barna_singleCP.png`,`https://raw.githubusercontent.com/apartmanhazaksiofok-lab/apartmanhazak-siofok/main/miro_barna_doublecp.png`],
        amenities: ['Zuhanyzó', 'Felszerelt konyha', 'Mikró', 'Hűtő', 'Smart TV', 'Klíma'] },
      { id: 'szurke', name: 'Szürke Apartman', color: '#7A8B8B', beds: '4 fő · 40m² · emeleti · erkély', floor: '2 hálószobás · nagy nappalival',
        hero: `https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/szurke/miro_szurke_double_CP.png`,
        images: [`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/szurke/miro_szurke_double_CP2.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/szurke/miro_szzurke_single4_CP.png`,`https://raw.githubusercontent.com/apartmanhazaksiofok-lab/apartmanhazak-siofok/main/miro_szurke_konyha_CP.png`,`https://raw.githubusercontent.com/apartmanhazaksiofok-lab/apartmanhazak-siofok/main/miro_szurke_furdoCP.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/szurke/miro_szurke_konyhablak_CP.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/szurke/miro_szurke_fotel_CP.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/szurke/miro_szurke_siraly_CP.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/szurke/Miro_szruke_BEACH.jpg`,`https://raw.githubusercontent.com/apartmanhazaksiofok-lab/apartmanhazak-siofok/main/miro_szurke_Reggeli.png`],
        amenities: ['Zuhanyzó', 'Felszerelt konyha', 'Mikró', 'Hűtő', 'Smart TV', 'Klíma'] },
      { id: 'kek', name: 'Kék Apartman', color: '#3B6B9E', beds: '4 fő · 40m² · emeleti · erkély', floor: '2 hálószobás · különálló konyhával',
        hero: `https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/kek/miro_kek_nappali_CP.png`,
        images: [`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/kek/MIRO_KEK_agy.jpg`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/kek/miro_kek_nappali2.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/kek/miro_kek_single_cp.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/kek/miro_kek_konyha_cp.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/kek/miro_kek_wc.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/kek/miro_kek_relax.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/kek/miro_kek_hajoCP.png`,`https://raw.githubusercontent.com/apartmanhazaksiofok-lab/apartmanhazak-siofok/main/miro_kek_reggeli.png`],
        amenities: ['Kád', 'Felszerelt konyha', 'Különálló konyha', 'Mikró', 'Hűtő', 'Smart TV', 'Klíma'] },
    ],
  },
  dali: {
    name: 'Dali Ház', distance: '200m a szabad strandtól', description: 'Mediterrán jellegű épület, különálló házakkal a kertben.',
    exterior: `${BASE}/house-dali/exterior-thumb-960.jpg`, priceFrom: '30 000 Ft/éj',
    features: ['WiFi', 'Kerti grillezés', 'Homokozó', 'Teraszok', 'Erkélyek'],
    apartments: [
      { id: 'bezs', name: 'Bézs Apartman', color: '#C4A882', beds: '6 fő · 60m² · emeleti · 2 erkély', floor: '3 hálószobás',
        hero: `https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/bezs/daliBezsNappali.PNG`,
        images: [`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/bezs/DALIbBEZSaGYkEPPEL.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/bezs/DaliBezsDupla.PNG`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/bezs/DaliBezsSingle.PNG`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/bezs/DaliBezsEbedlo.PNG`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/bezs/DaliBezsKonyha.PNG`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/bezs/DaliBezsFurdo.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/bezs/DaliBezsBejarat.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/bezs/DaliKert.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/bezs/DaliGrill.jpg`],
        amenities: ['Kád', 'Felszerelt konyha', 'Mikró', 'Hűtő', 'Smart TV', 'Légkondicionálás', 'Parkolás'] },
      { id: 'lila', name: 'Lila Apartman', color: '#7B4D8E', beds: '4 fő · 50m² · emeleti', floor: '2 hálószobás',
        hero: `https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/lila/daliLIlaAgyjoo.png`,
        images: [`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/lila/DaliLilaagy.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/lila/DaliLilaagykeppeljo.jpg`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/lila/daliLilaSingle.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/lila/daliLilanappalijoo.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/lila/dalililakonyha.PNG`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/lila/Clila.png`],
        amenities: ['Zuhanyzó', 'Felszerelt konyha', 'Mikró', 'Hűtő', 'Smart TV', 'Klíma'] },
      { id: 'piros', name: 'Piros Stúdió', color: '#C0392B', beds: '2+1 fő · 30m² · földszinti · terasz', floor: 'Stúdió · zárható kertrészben',
        hero: `https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/piros/DaliPirosJo.png`,
        images: [`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/piros/DaliPirosagy.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/piros/DAliPirosebedlo.jpg`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/piros/DaliPirosbejarat.jpg`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/piros/DaliSutogeto.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/piros/daliKIshazJo.png`],
        amenities: ['Zuhanyzó', 'Felszerelt konyha', 'Mikró', 'Hűtő', 'Smart TV'] },
      { id: 'zold', name: 'Zöld Apartman', color: '#2E7D32', beds: '2 fő · 40m² · földszinti · terasz', floor: 'Stúdió · különálló konyhával',
        hero: `https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/zold/dalizoldfotel.png`,
        images: [`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/zold/daliZoldAgy.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/zold/dalizoldagyjo.PNG`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/zold/dalizoldkonyhajo.jpg`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/zold/dalizoldfurdo.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/zold/dalizoldrelax.png`,`https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/zold/DaliSutogeto.png`],
        amenities: ['Kád', 'Felszerelt konyha', 'Mikró', 'Hűtő', 'Smart TV'] },
    ],
  },
};

const Icon = ({ name, size = 20 }) => {
  const icons = {
    sun: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>,
    calendar: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
    chat: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    doc: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>,
    map: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
    phone: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>,
    mail: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
    close: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
    check: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="20 6 9 17 4 12"/></svg>,
    wifi: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
    star: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    left: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="15 18 9 12 15 6"/></svg>,
    right: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="9 18 15 12 9 6"/></svg>,
    dog: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M10 5.172C10 3.782 8.884 2.667 7.495 2.667c-.238 0-.452.032-.653.09C6.318 1.149 5.258 0 3.918 0 2.266 0 1 1.567 1 3.5S2.266 7 3.918 7H6" transform="translate(4 6) scale(.9)"/><circle cx="12" cy="14" r="4"/></svg>,
    menu: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="18" x2="21" y2="18"/></svg>,
    upload: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><polyline points="16 16 12 12 8 16"/><line x1="12" y1="12" x2="12" y2="21"/><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"/></svg>,
    parking: <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M9 17V7h4a3 3 0 0 1 0 6H9"/></svg>,
    quote: <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/></svg>,
  };
  return icons[name] || null;
};

const GalleryModal = ({ images, current, onClose, onNav }) => {
  if (current === null) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, background: 'rgba(0,0,0,.92)', display: 'flex', alignItems: 'center', justifyContent: 'center' }} onClick={onClose}>
      <button onClick={(e) => { e.stopPropagation(); onNav(-1); }} style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}><Icon name="left" size={28} /></button>
      <img src={images[current]} alt="" loading="lazy" decoding="async" onClick={(e) => e.stopPropagation()} style={{ maxWidth: '85vw', maxHeight: '85vh', borderRadius: 8, objectFit: 'contain' }} />
      <button onClick={(e) => { e.stopPropagation(); onNav(1); }} style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: '50%', width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}><Icon name="right" size={28} /></button>
      <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, background: 'rgba(255,255,255,.15)', border: 'none', borderRadius: '50%', width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#fff' }}><Icon name="close" size={22} /></button>
      <div style={{ position: 'absolute', bottom: 20, color: '#fff9', fontSize: 14 }}>{current + 1} / {images.length}</div>
    </div>
  );
};

const ChatWidget = () => {
  useEffect(() => {
    var s1 = document.createElement('script'); var s0 = document.getElementsByTagName('script')[0];
    s1.async = true; s1.src = 'https://embed.tawk.to/69f112b3214e0d1c316be780/1jnar23p5';
    s1.charset = 'UTF-8'; s1.setAttribute('crossorigin', '*'); s0.parentNode.insertBefore(s1, s0);
  }, []);
  return null;
};

const labelStyle = { display: 'flex', flexDirection: 'column', gap: 6, fontFamily: 'var(--body)', fontSize: 13, color: '#555', fontWeight: 600 };
const inputStyle = { padding: '12px 14px', border: '1px solid #ddd', borderRadius: 10, fontSize: 15, fontFamily: 'var(--body)', outline: 'none', background: '#fafbfc' };
const btnPrimary = { padding: '12px 32px', background: 'linear-gradient(135deg, #1a5276, #2e86c1)', color: '#fff', border: 'none', borderRadius: 12, fontFamily: 'var(--heading)', fontSize: 15, fontWeight: 600, cursor: 'pointer' };

const BookingPanel = () => {
  useEffect(() => {
    if (document.querySelector('script[src="https://foglalas.appartman.hu/embed-script-min.js"]')) return;
    const s = document.createElement('script');
    s.src = 'https://foglalas.appartman.hu/embed-script-min.js';
    s.async = true;
    document.body.appendChild(s);
  }, []);
  return (
    <div id="appartman-embed-iframe-wrapper" style={{ width: '100%', minHeight: 600 }}>
      <iframe
        id="appartman-embed-iframe"
        src="https://foglalas.appartman.hu/siofok/embed"
        width="100%"
        scrolling="yes"
        style={{ border: 'none', minHeight: 600, display: 'block' }}
        title="Appartman foglalás"
      />
    </div>
  );
};

const ApartmentCard = ({ apt, onGallery, t, onBook }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)} style={{ borderRadius: 20, overflow: 'hidden', background: '#fff', boxShadow: hovered ? '0 16px 48px rgba(0,0,0,.12)' : '0 4px 20px rgba(0,0,0,.06)', transition: 'all .35s', transform: hovered ? 'translateY(-4px)' : 'none', border: `3px solid ${apt.color}22` }}>
      <div style={{ position: 'relative', overflow: 'hidden', height: 150 }}>
        <img src={apt.hero} alt={apt.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: apt.imgPos || 'center', transition: 'transform .5s', transform: hovered ? 'scale(1.05)' : 'scale(1)' }} />
        {apt.floor && <div style={{ position: 'absolute', top: 10, left: 10, background: apt.color, color: '#fff', padding: '4px 12px', borderRadius: 20, fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 11 }}>{apt.floor}</div>}
      </div>
      <div style={{ padding: '14px 18px' }}>
        <h4 style={{ fontFamily: 'var(--heading)', fontSize: 18, color: '#1a2a3a', margin: '0 0 4px' }}>{apt.name}</h4>
        <p style={{ fontFamily: 'var(--body)', fontSize: 12, color: '#777', margin: '0 0 10px' }}>{apt.beds}</p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 5, marginBottom: 12 }}>
          {apt.amenities.map((a) => (<span key={a} style={{ fontSize: 10, fontFamily: 'var(--body)', padding: '3px 8px', borderRadius: 8, background: `${apt.color}12`, color: apt.color, fontWeight: 600 }}>{a}</span>))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button onClick={() => onGallery(apt)} style={{ flex: 1, padding: '8px 0', border: `2px solid ${apt.color}`, borderRadius: 10, background: 'transparent', color: apt.color, fontFamily: 'var(--heading)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{t.house.gallery}</button>
          <button onClick={onBook} style={{ flex: 1, padding: '8px 0', border: 'none', borderRadius: 10, background: apt.color, color: '#fff', fontFamily: 'var(--heading)', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>{t.house.book}</button>
        </div>
      </div>
    </div>
  );
};

/* ─── Contact Form with Formspree ─── */
const ContactForm = ({ t }) => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.message) return;
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/xeenzajp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message }),
      });
      if (res.ok) { setStatus('sent'); setForm({ name: '', email: '', message: '' }); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  if (status === 'sent') return (
    <div style={{ textAlign: 'center', padding: '40px 20px' }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
      <p style={{ fontFamily: 'var(--heading)', fontSize: 20, color: '#1a5276', fontWeight: 700 }}>{t.contact.sent}</p>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
      <input placeholder={t.contact.name} value={form.name} onChange={(e) => set('name', e.target.value)} style={inputStyle} />
      <input placeholder={t.contact.email} value={form.email} onChange={(e) => set('email', e.target.value)} style={inputStyle} />
      <textarea placeholder={t.contact.msg} value={form.message} onChange={(e) => set('message', e.target.value)} rows={8} style={{ ...inputStyle, resize: 'vertical' }} />
      {status === 'error' && <p style={{ color: '#e74c3c', fontSize: 13, fontFamily: 'var(--body)' }}>Hiba történt. Kérjük próbálja újra.</p>}
      <button onClick={handleSubmit} disabled={status === 'sending'} style={{ ...btnPrimary, width: '100%', padding: '14px', fontSize: 16, opacity: status === 'sending' ? 0.7 : 1 }}>
        {status === 'sending' ? '⏳ Küldés...' : t.contact.send}
      </button>
    </div>
  );
};

const MIRO_BOOKING_URL = 'https://www.booking.com/hotel/hu/apartmanhazak-miro-haz.en-gb.html?aid=304142&label=gen173nr-10CAEoggI46AdIM1gEaGeIAQGYATO4AQfIAQzYAQPoAQH4AQGIAgGoAgG4AuSgntAGwAIB0gIkY2FiOGVhNjQtYzY4OS00NzEzLTg5ZDctMjZiOWU0Nzg4MWFi2AIB4AIB&sid=0f56370cadfbe1f9607d70d5a02784e1';
const DALI_BOOKING_URL = 'https://www.booking.com/hotel/hu/apartmanhazak-dali-haz-siofok.en-gb.html?aid=304142&label=gen173nr-10CAEoggI46AdIM1gEaGeIAQGYATO4AQfIAQzYAQPoAQH4AQGIAgGoAgG4AuSgntAGwAIB0gIkY2FiOGVhNjQtYzY4OS00NzEzLTg5ZDctMjZiOWU0Nzg4MWFi2AIB4AIB&sid=0f56370cadfbe1f9607d70d5a02784e1';

const REVIEWS = {
  miro: [
    { name: 'Agnieszka', country: '🇵🇱', score: 10, date: 'August 2025', text: {
      hu: 'Nagyszerű létesítmény. A háziasszony nagyon barátságos és segítőkész volt. A Balaton szó szerint 2 perc sétára van. Nagyon szép üdülőhely. Csodálatosan éreztük magunkat itt, és biztosan visszatérünk.',
      en: 'Great facility. The hostess was very nice and helpful. Lake Balaton is literally a 2-minute walk away. A very nice resort. We had a wonderful time here and will definitely be back.',
      de: 'Tolle Einrichtung. Die Gastgeberin war sehr nett und hilfsbereit. Der Balaton ist buchstäblich 2 Gehminuten entfernt. Ein sehr schönes Resort. Wir hatten eine wunderbare Zeit hier und kommen definitiv wieder.',
      pl: 'Świetny obiekt. Gospodyni bardzo sympatyczna i pomocna. Do Balatonu dosłownie 2 minuty pieszo. Bardzo fajny ośrodek. Spędziliśmy tutaj cudowny czas i napewno wrócimy.',
      sk: 'Skvelé zariadenie. Hostiteľka bola veľmi milá a nápomocná. Jazero Balaton je doslova 2 minúty chôdze. Veľmi pekné letovisko. Strávili sme tu úžasný čas a určite sa vrátime.',
    }},
    { name: 'Filip', country: '🇨🇿', score: 10, date: 'August 2025', text: {
      hu: 'Nyugalom, tisztaság, tökéletes felszereltség, pár lépésre a strandtól.',
      en: 'Privacy, peace, everything clean and perfectly equipped, just a short walk to the beach.',
      de: 'Privatsphäre, Ruhe, alles sauber und perfekt ausgestattet, nur ein kurzer Spaziergang zum Strand.',
      pl: 'Prywatność, spokój, wszystko czyste i doskonale wyposażone, kilka kroków od plaży.',
      sk: 'Súkromie, pokoj, všetko čisté a perfektne vybavené, len krátka prechádzka na pláž.',
    }},
    { name: 'Filipov', country: '🇧🇬', score: 10, date: 'July 2025', text: {
      hu: 'Nagyszerű apartman nagyszerű helyen! 1 percre a strandtól, 30 másodpercre egy élelmiszerbolttól. Az apartmanhoz tartozik egy saját parkolóhely az udvarban.',
      en: 'Great apartment at a great location! 1 minute away from the beach, 30 seconds away from a grocery store. The apartment also came with a private parking spot on the yard.',
      de: 'Tolle Wohnung in toller Lage! 1 Minute vom Strand entfernt, 30 Sekunden von einem Lebensmittelgeschäft. Die Wohnung hatte auch einen privaten Parkplatz im Hof.',
      pl: 'Świetny apartament w świetnej lokalizacji! 1 minuta od plaży, 30 sekund od sklepu spożywczego. Do apartamentu należy prywatne miejsce parkingowe na podwórku.',
      sk: 'Skvelý apartmán na skvelom mieste! 1 minútu od pláže, 30 sekúnd od obchodu s potravinami. K apartmánu patrí súkromné parkovacie miesto na dvore.',
    }},
    { name: 'Grzegorz', country: '🇵🇱', score: 9, date: 'August 2025', text: {
      hu: 'Nagyon jó kapcsolat a tulajdonossal. Nagyon közel a Balatonhoz. Az apartmantól pár méterre bolt a legszükségesebb dolgokkal. Az apartman jól felszerelt, semmit sem nélkülöztünk.',
      en: 'Very good contact with the owner. Very close to Lake Balaton. A shop with the most necessary items a few meters from the apartment. The apartment is quite well equipped, we lacked nothing.',
      de: 'Sehr guter Kontakt zum Eigentümer. Sehr nah am Balaton. Ein Geschäft mit den wichtigsten Dingen nur wenige Meter von der Wohnung entfernt. Die Wohnung ist gut ausgestattet, es fehlte uns nichts.',
      pl: 'Bardzo dobry kontakt z właścicielem. Bardzo blisko Balatonu. Sklep z najważniejszymi artykułami kilka metrów od apartamentu. Apartament bardzo dobrze wyposażony, niczego nam nie brakowało.',
      sk: 'Veľmi dobrý kontakt s majiteľom. Veľmi blízko Balatonu. Obchod s najdôležitejšími vecami len pár metrov od apartmánu. Apartmán je dobre vybavený, nič nám nechýbalo.',
    }},
    { name: 'Martina', country: '🇸🇰', score: 8, date: 'September 2025', text: {
      hu: 'A szállás kellemes, tiszta, külön bejárattal rendelkezik és földszinten van. Tetszett a csendes elhelyezkedés a tóhoz kő dobásnyira, és az udvari parkolás. A háziasszony nagyon kedves, angolul gond nélkül kommunikáltunk.',
      en: "The accommodation is pleasant, clean, with a separate entrance and located on the ground floor. We liked the quiet location a stone's throw from the lake and parking in the yard. The hostess is very nice, we communicated in English without any problems.",
      de: 'Die Unterkunft ist angenehm, sauber, mit eigenem Eingang und im Erdgeschoss. Wir mochten die ruhige Lage einen Steinwurf vom See entfernt und den Parkplatz im Hof. Die Gastgeberin ist sehr nett, wir haben uns auf Englisch problemlos verständigt.',
      pl: 'Zakwaterowanie jest przyjemne, czyste, z osobnym wejściem i na parterze. Podobała nam się cicha lokalizacja o rzut kamieniem od jeziora i parking na podwórku. Gospodyni jest bardzo miła, komunikowaliśmy się po angielsku bez żadnych problemów.',
      sk: 'Ubytovanie je príjemné, čisté, s oddeleným vchodom a na prízemí. Páčila sa nám tichá poloha kameňom dohodená od jazera a parkovanie na dvore. Hostiteľka je veľmi milá, komunikovali sme po anglicky bez akýchkoľvek problémov.',
    }},
    { name: 'Martin', country: '🇨🇿', score: 10, date: 'August 2025', text: {
      hu: '5 perc sétára a strandtól, ABC élelmiszerbolt a sarkon, segítőkész személyzet.',
      en: '5 min walk to the beach, ABC grocery store right around the corner, helpful staff.',
      de: '5 Minuten Fußweg zum Strand, ABC-Lebensmittelgeschäft gleich um die Ecke, hilfsbereites Personal.',
      pl: '5 minut pieszo do plaży, sklep spożywczy ABC za rogiem, pomocny personel.',
      sk: '5 minút pešo na pláž, obchod ABC hneď za rohom, nápomocný personál.',
    }},
    { name: 'Ulrike', country: '🇩🇪', score: 9, date: 'July 2025', text: {
      hu: 'A helyszín fantasztikus, kevesebb mint 2 perc a vízhez. 2026-ban ismét eljövünk!',
      en: 'The location is fantastic, less than 2 minutes to the water. We will come back in 2026!',
      de: 'Die Lage ist Mega, keine 2 Minuten zum Wasser. Wir kommen 2026 wieder!',
      pl: 'Lokalizacja jest fantastyczna, mniej niż 2 minuty do wody. Wrócimy w 2026 roku!',
      sk: 'Poloha je fantastická, menej ako 2 minúty k vode. V roku 2026 sa vrátime!',
    }},
    { name: 'Pavel', country: '🇨🇿', score: 10, date: 'September 2024', text: {
      hu: 'Minden rendben van. Tökéletes szállás.',
      en: 'Everything is fine. Perfect accommodation.',
      de: 'Alles ist in Ordnung. Perfekte Unterkunft.',
      pl: 'Wszystko jest w porządku. Idealne zakwaterowanie.',
      sk: 'Všetko je v poriadku. Perfektné ubytovanie.',
    }},
    { name: 'Arnold', country: '🇸🇰', score: 10, date: 'July 2024', text: {
      hu: 'A tulajdonos kedves és segítőkész volt. A szállás megfelelt az elvárásainknak. A helyszín jó volt.',
      en: 'The owner was nice and helpful. The accommodation met our requirements. The location was good.',
      de: 'Der Eigentümer war nett und hilfsbereit. Die Unterkunft erfüllte unsere Anforderungen. Die Lage war gut.',
      pl: 'Właściciel był miły i pomocny. Zakwaterowanie spełniło nasze wymagania. Lokalizacja była dobra.',
      sk: 'Majiteľ bol milý a nápomocný. Ubytovanie splnilo naše požiadavky. Poloha bola dobrá.',
    }},
    { name: 'Füsi', country: '🇸🇰', score: 8, date: 'July 2024', text: {
      hu: 'A szállás tiszta, rendezett. Kedves szállásadó. Minden megvan ami a kellemes pihentető nyaraláshoz kell!',
      en: 'The accommodation is clean and tidy. A friendly host. Everything you need for a pleasant and relaxing holiday!',
      de: 'Die Unterkunft ist sauber und ordentlich. Ein freundlicher Gastgeber. Alles, was man für einen angenehmen und erholsamen Urlaub braucht!',
      pl: 'Zakwaterowanie jest czyste i schludne. Przyjazny gospodarz. Wszystko, czego potrzebujesz na przyjemne i relaksujące wakacje!',
      sk: 'Ubytovanie je čisté a uprané. Priateľský hostiteľ. Všetko, čo potrebujete na príjemnú a oddychovú dovolenku!',
    }},
    { name: 'Illés', country: '🇭🇺', score: 10, date: 'August 2024', text: {
      hu: 'Otthonos, tág, tiszta, kényelmes, szép. Imádtuk!',
      en: 'Homely, spacious, clean, comfortable, beautiful. We loved it!',
      de: 'Heimelig, geräumig, sauber, komfortabel, schön. Wir liebten es!',
      pl: 'Przytulny, przestronny, czysty, wygodny, piękny. Pokochaliśmy to miejsce!',
      sk: 'Útulný, priestranný, čistý, pohodlný, krásny. Zbožňovali sme to!',
    }},
    { name: 'Grzegorz', country: '🇵🇱', score: 10, date: 'August 2024', text: {
      hu: 'Kiváló helyszín, kedves tulajdonosok, csend, zöld környezet. Jól felszerelt szobák.',
      en: 'Excellent location, friendly owners, silence, green surroundings. Well-equipped rooms.',
      de: 'Ausgezeichnete Lage, freundliche Eigentümer, Stille, grüne Umgebung. Gut ausgestattete Zimmer.',
      pl: 'Świetna lokalizacja, mili gospodarze, cisza, zieleń. Dobrze wyposażone pokoje.',
      sk: 'Výborná poloha, priateľskí majitelia, ticho, zelené okolie. Dobre vybavené izby.',
    }},
  ],
  dali: [
    { name: 'Agnieszka', country: '🇵🇱', score: 10, date: 'August 2025', text: {
      hu: 'Nagyszerű létesítmény. A háziasszony nagyon barátságos és segítőkész volt. A Balaton szó szerint 2 perc sétára van. Nagyon szép üdülőhely. Csodálatosan éreztük magunkat itt, és biztosan visszatérünk.',
      en: 'Great facility. The hostess was very nice and helpful. Lake Balaton is literally a 2-minute walk away. A very nice resort. We had a wonderful time here and will definitely be back.',
      de: 'Tolle Einrichtung. Die Gastgeberin war sehr nett und hilfsbereit. Der Balaton ist buchstäblich 2 Gehminuten entfernt. Sehr schönes Resort. Wir kommen definitiv wieder.',
      pl: 'Świetny obiekt. Gospodyni bardzo sympatyczna i pomocna. Do Balatonu dosłownie 2 minuty pieszo. Bardzo fajny ośrodek. Napewno wrócimy.',
      sk: 'Skvelé zariadenie. Hostiteľka bola veľmi milá a nápomocná. Jazero Balaton je doslova 2 minúty chôdze. Určite sa vrátime.',
    }},
    { name: 'Filip', country: '🇨🇿', score: 10, date: 'August 2025', text: {
      hu: 'Magánélet, nyugalom, minden tiszta és tökéletesen felszerelt, pár lépésre a strandtól.',
      en: 'Privacy, peace, everything clean and perfectly equipped, just a short walk to the beach.',
      de: 'Privatsphäre, Ruhe, alles sauber und perfekt ausgestattet, kurzer Spaziergang zum Strand.',
      pl: 'Prywatność, spokój, wszystko czyste i doskonale wyposażone, kilka kroków od plaży.',
      sk: 'Súkromie, pokoj, všetko čisté a perfektne vybavené, krátka prechádzka na pláž.',
    }},
    { name: 'Pavel', country: '🇨🇿', score: 10, date: 'September 2024', text: {
      hu: 'Minden rendben volt. Az ágyak cseréjét kérték — ezt következő szezonban meg is tettük.',
      en: 'Everything is fine. They just wanted the beds to be changed — which we did in the next season.',
      de: 'Alles war in Ordnung. Sie wünschten sich neue Betten — das haben wir in der nächsten Saison erledigt.',
      pl: 'Wszystko było w porządku. Prosili o wymianę łóżek — co zrobiliśmy w następnym sezonie.',
      sk: 'Všetko bolo v poriadku. Žiadali výmenu postelí — čo sme urobili v nasledujúcej sezóne.',
    }},
    { name: 'Arnold', country: '🇸🇰', score: 10, date: 'July 2024', text: {
      hu: 'A tulajdonos kedves és segítőkész volt. A szállás megfelelt az elvárásainknak. A helyszín jó volt.',
      en: 'The owner was nice and helpful. The accommodation met our requirements. The location was good.',
      de: 'Der Eigentümer war nett und hilfsbereit. Die Unterkunft erfüllte unsere Anforderungen. Die Lage war gut.',
      pl: 'Właściciel był miły i pomocny. Zakwaterowanie spełniło nasze wymagania. Lokalizacja była dobra.',
      sk: 'Majiteľ bol milý a nápomocný. Ubytovanie splnilo naše požiadavky. Poloha bola dobrá.',
    }},
    { name: 'Füsi', country: '🇸🇰', score: 8, date: 'July 2024', text: {
      hu: 'A szállás tiszta, rendezett. Kedves szállásadó. Minden megvan ami a kellemes pihentető nyaraláshoz kell!',
      en: 'The accommodation is clean and tidy. A friendly host. Everything you need for a pleasant and relaxing holiday!',
      de: 'Die Unterkunft ist sauber und ordentlich. Ein freundlicher Gastgeber. Alles was man für schönen Urlaub braucht!',
      pl: 'Zakwaterowanie jest czyste i schludne. Przyjazny gospodarz. Wszystko czego potrzebujesz na przyjemne wakacje!',
      sk: 'Ubytovanie je čisté a upratané. Priateľský hostiteľ. Všetko čo potrebujete na príjemnú dovolenku!',
    }},
    { name: 'Tamás', country: '🇭🇺', score: 10, date: 'September 2025', text: {
      hu: 'Kivételes élmény, mindent tízessel értékelt a családunk.',
      en: 'Exceptional experience, our family gave it top marks across the board.',
      de: 'Außergewöhnliches Erlebnis, unsere Familie hat alles mit Höchstnoten bewertet.',
      pl: 'Wyjątkowe doświadczenie, nasza rodzina oceniła wszystko najwyżej.',
      sk: 'Výnimočný zážitok, naša rodina ohodnotila všetko najvyšším hodnotením.',
    }},
    { name: 'Sz', country: '🇭🇺', score: 9, date: 'August 2025', text: {
      hu: 'Remek szállás, nagyon elégedett volt az egész família.',
      en: 'Great accommodation, the whole family was very satisfied.',
      de: 'Tolle Unterkunft, die ganze Familie war sehr zufrieden.',
      pl: 'Świetne zakwaterowanie, cała rodzina była bardzo zadowolona.',
      sk: 'Skvelé ubytovanie, celá rodina bola veľmi spokojná.',
    }},
    { name: 'Jens', country: '🇩🇪', score: 9, date: 'August 2025', text: {
      hu: 'Nagyon szép szállás. 1 perc a strandhoz és 1 perc a bevásárláshoz. Parkolási lehetőségek az udvaron. Nagyon gondozott szobák. Mind a 4-en nagyon elégedett voltunk.',
      en: 'Very nice accommodation. 1 minute to the beach and 1 minute to shopping. Parking facilities in the yard. Very nicely maintained rooms. All 4 of us were very satisfied.',
      de: 'Sehr schöne Unterkunft. 1 Minute zum Strand und 1 Minute zum Einkaufen. Parkmöglichkeiten im Hof. Sehr schön gepflegte Zimmer. Wir waren alle 4 sehr zufrieden.',
      pl: 'Bardzo ładne zakwaterowanie. 1 minuta na plażę i 1 minuta do sklepu. Miejsca parkingowe na podwórku. Bardzo zadbane pokoje. Wszyscy 4 byliśmy bardzo zadowoleni.',
      sk: 'Veľmi pekné ubytovanie. 1 minúta na pláž a 1 minúta do obchodu. Parkovacie miesta na dvore. Veľmi dobre udržiavané izby. Všetci 4 sme boli veľmi spokojní.',
    }},
  ],
};

const REVIEWS_META = {
  miro: {
    score: 9.8,
    count: { hu: '23 értékelés', en: '23 reviews', de: '23 Bewertungen', pl: '23 opinii', sk: '23 hodnotení' },
    label: { hu: 'Rendkívüli', en: 'Exceptional', de: 'Außergewöhnlich', pl: 'Wyjątkowy', sk: 'Výnimočný' },
  },
  dali: {
    score: 9.8,
    count: { hu: '7 értékelés', en: '7 reviews', de: '7 Bewertungen', pl: '7 opinii', sk: '7 hodnotení' },
    label: { hu: 'Rendkívüli', en: 'Exceptional', de: 'Außergewöhnlich', pl: 'Wyjątkowy', sk: 'Výnimočný' },
  },
};

const ALL_REVIEWS_META = {
  score: 9.8,
  count: { hu: '30 értékelés', en: '30 reviews', de: '30 Bewertungen', pl: '30 opinii', sk: '30 hodnotení' },
  label: { hu: 'Rendkívüli', en: 'Exceptional', de: 'Außergewöhnlich', pl: 'Wyjątkowy', sk: 'Výnimočný' },
};

const ALL_REVIEWS = [...REVIEWS.miro, ...REVIEWS.dali];

const ReviewsSection = ({ t, lang }) => {
  const [page, setPage] = useState(0);
  const [perPage, setPerPage] = useState(3);

  useEffect(() => {
    const update = () => setPerPage(window.innerWidth < 700 ? 1 : window.innerWidth < 1000 ? 2 : 3);
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const totalPages = Math.ceil(ALL_REVIEWS.length / perPage);
  const visible = ALL_REVIEWS.slice(page * perPage, page * perPage + perPage);
  const prev = () => setPage(p => (p - 1 + totalPages) % totalPages);
  const next = () => setPage(p => (p + 1) % totalPages);

  const scoreLabel = ALL_REVIEWS_META.label[lang] || ALL_REVIEWS_META.label.hu;
  const countLabel = ALL_REVIEWS_META.count[lang] || ALL_REVIEWS_META.count.hu;

  return (
    <div style={{ background: 'linear-gradient(160deg, #0f1e30 0%, #1a2e44 60%, #0f1e30 100%)', padding: '70px 24px 60px' }}>
      <div style={{ maxWidth: 1160, margin: '0 auto' }}>

        {/* Title */}
        <h2 style={{ fontFamily: 'var(--heading)', fontSize: 44, color: '#fff', textAlign: 'center', marginBottom: 36, fontWeight: 900, letterSpacing: -0.5 }}>
          {t.reviews.title}
        </h2>

        {/* Booking badge — pill shape like screenshot */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 52 }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', borderRadius: 18, overflow: 'hidden', boxShadow: '0 4px 24px rgba(0,0,0,.4)', background: 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.15)', backdropFilter: 'blur(12px)' }}>
            {/* Booking.com label */}
            <div style={{ padding: '14px 22px', display: 'flex', alignItems: 'center', gap: 9 }}>
              <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="2.5"/><path d="M8 12h8M12 8v8" stroke="#fff" strokeWidth="2.5" strokeLinecap="round"/></svg>
              </div>
              <span style={{ fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 15, color: '#fff' }}>Booking.com</span>
            </div>
            {/* Divider */}
            <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,.2)' }} />
            {/* Score */}
            <div style={{ padding: '14px 20px', background: '#003580' }}>
              <span style={{ fontFamily: 'var(--heading)', fontWeight: 900, fontSize: 26, color: '#fff', letterSpacing: -1 }}>{ALL_REVIEWS_META.score}</span>
            </div>
            {/* Label + count */}
            <div style={{ padding: '14px 22px' }}>
              <div style={{ fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 17, color: '#fff', lineHeight: 1.2 }}>{scoreLabel}</div>
              <div style={{ fontFamily: 'var(--body)', fontSize: 12, color: 'rgba(255,255,255,.55)', marginTop: 3 }}>{countLabel}</div>
            </div>
          </div>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: `repeat(${perPage}, 1fr)`, gap: 22, minHeight: 280 }}>
          {visible.map((r, i) => (
            <div key={page * 100 + i} style={{ background: 'rgba(255,255,255,.07)', border: '1px solid rgba(255,255,255,.12)', borderRadius: 22, padding: '30px 28px 26px', display: 'flex', flexDirection: 'column', gap: 16 }}>
              {/* Big quote mark */}
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 62, color: '#4a9fd4', lineHeight: 0.65, userSelect: 'none', marginBottom: 2 }}>"</div>
              {/* Text */}
              <p style={{ fontFamily: 'var(--body)', fontSize: 14.5, color: 'rgba(255,255,255,.82)', lineHeight: 1.68, margin: 0, flexGrow: 1, fontStyle: 'italic' }}>
                „{r.text[lang] || r.text.en}"
              </p>
              {/* Divider */}
              <div style={{ height: 1, background: 'rgba(255,255,255,.13)' }} />
              {/* Author */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 11 }}>
                  <div style={{ width: 42, height: 42, borderRadius: '50%', background: 'linear-gradient(135deg, #3a8fc4, #1a4e6e)', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--heading)', fontWeight: 800, fontSize: 18, flexShrink: 0 }}>{r.name[0]}</div>
                  <div>
                    <div style={{ fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 15, color: '#fff' }}>{r.name}</div>
                    <div style={{ fontSize: 18, lineHeight: 1.1, marginTop: 2 }}>{r.country}</div>
                  </div>
                </div>
                <div style={{ background: '#1a3a6b', color: '#fff', borderRadius: 10, width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--heading)', fontWeight: 900, fontSize: 17 }}>{r.score}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 18, marginTop: 40 }}>
          <button onClick={prev} style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.22)', color: '#fff', fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>‹</button>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            {Array.from({ length: totalPages }).map((_, i) => (
              <button key={i} onClick={() => setPage(i)}
                style={{ width: i === page ? 30 : 10, height: 10, borderRadius: 5, background: i === page ? '#4a9fd4' : 'rgba(255,255,255,.28)', border: 'none', cursor: 'pointer', padding: 0, transition: 'all .25s' }} />
            ))}
          </div>
          <button onClick={next} style={{ width: 46, height: 46, borderRadius: '50%', background: 'rgba(255,255,255,.12)', border: '1px solid rgba(255,255,255,.22)', color: '#fff', fontSize: 24, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>›</button>
        </div>

        {/* Booking link */}
        <div style={{ textAlign: 'center', marginTop: 34 }}>
          <a href={MIRO_BOOKING_URL} target="_blank" rel="noopener noreferrer"
            style={{ fontFamily: 'var(--body)', fontSize: 14, color: 'rgba(255,255,255,.6)', textDecoration: 'underline', textUnderlineOffset: 4, letterSpacing: .2 }}>
            {t.reviews.bookingLink}
          </a>
        </div>

      </div>
    </div>
  );
};

export default function App() {
  const [lang, setLang] = useState('hu');
  const [activeSection, setActiveSection] = useState('home');
  const [galleryApt, setGalleryApt] = useState(null);
  const [galleryIdx, setGalleryIdx] = useState(null);
  const [reviewTab, setReviewTab] = useState('miro');
  const [mobileMenu, setMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [infoBarHeight, setInfoBarHeight] = useState(33);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const infoBarRef = useRef(null);
  const t = T[lang];

  useEffect(() => { const h = () => setScrolled(window.scrollY > 60); window.addEventListener('scroll', h); return () => window.removeEventListener('scroll', h); }, []);
  useEffect(() => {
    const update = () => { if (infoBarRef.current) setInfoBarHeight(infoBarRef.current.offsetHeight); };
    update(); window.addEventListener('resize', update); return () => window.removeEventListener('resize', update);
  }, []);

  const openGallery = (apt) => { setGalleryApt(apt); setGalleryIdx(0); };
  const navGallery = (dir) => { if (!galleryApt) return; const imgs = [galleryApt.hero, ...galleryApt.images]; setGalleryIdx((p) => (p + dir + imgs.length) % imgs.length); };

  const sections = [
    { id: 'home', label: t.nav.home }, { id: 'miro', label: t.nav.miro }, { id: 'dali', label: t.nav.dali },
    { id: 'booking', label: t.nav.booking }, { id: 'area', label: t.nav.area }, { id: 'galeria', label: t.nav.galeria }, { id: 'contact', label: t.nav.contact },
  ];

  const DesktopLangSwitcher = () => (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setLangMenuOpen(!langMenuOpen)} style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, padding: '5px 9px', cursor: 'pointer', fontSize: 20, lineHeight: 1 }}>{t.flag}</button>
      {langMenuOpen && (
        <div style={{ position: 'absolute', right: 0, top: '110%', background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.15)', padding: 8, display: 'flex', flexDirection: 'column', gap: 2, zIndex: 200 }}>
          {Object.entries(T).map(([code, val]) => (
            <button key={code} onClick={() => { setLang(code); setLangMenuOpen(false); }} style={{ background: lang === code ? '#e8f4fd' : 'transparent', border: lang === code ? '2px solid #1a5276' : '2px solid transparent', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 20 }}>{val.flag}</button>
          ))}
        </div>
      )}
    </div>
  );

  const MobileLangSwitcher = () => (
    <div style={{ position: 'relative' }}>
      <button onClick={() => setLangMenuOpen(!langMenuOpen)} style={{ background: 'rgba(255,255,255,.15)', border: '1px solid rgba(255,255,255,.3)', borderRadius: 8, padding: '5px 9px', cursor: 'pointer', fontSize: 22, lineHeight: 1 }}>{t.flag}</button>
      {langMenuOpen && (
        <div style={{ position: 'absolute', right: 0, top: '110%', background: '#fff', borderRadius: 12, boxShadow: '0 8px 32px rgba(0,0,0,.2)', padding: 8, display: 'flex', flexDirection: 'column', gap: 4, zIndex: 300 }}>
          {Object.entries(T).map(([code, val]) => (
            <button key={code} onClick={() => { setLang(code); setLangMenuOpen(false); }} style={{ background: lang === code ? '#e8f4fd' : 'transparent', border: lang === code ? '2px solid #1a5276' : '2px solid transparent', borderRadius: 8, padding: '6px 10px', cursor: 'pointer', fontSize: 22 }}>{val.flag}</button>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div style={{ fontFamily: 'var(--body)', background: '#f8f9fb', minHeight: '100vh' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=Source+Sans+3:wght@300;400;600;700&display=swap');
        :root { --heading: 'Playfair Display', Georgia, serif; --body: 'Source Sans 3', 'Segoe UI', sans-serif; }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes waveMove { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        .desktop-nav { display: flex; }
        .mobile-controls { display: none; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-controls { display: flex !important; align-items: center; gap: 8px; }
          .hero-title { font-size: 36px !important; }
          .hero-sub { font-size: 16px !important; }
          .section-pad { padding: 48px 16px !important; }
          .house-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {galleryApt && <GalleryModal images={[galleryApt.hero, ...galleryApt.images]} current={galleryIdx} onClose={() => { setGalleryApt(null); setGalleryIdx(null); }} onNav={navGallery} />}

      {/* TOP INFO BAR */}
      <div ref={infoBarRef} style={{ background: '#0f1a26', color: '#fff', padding: '6px 32px', fontFamily: 'var(--body)', fontSize: 13, position: 'fixed', top: 0, left: 0, right: 0, zIndex: 102 }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
          <a href="tel:+36705401107" style={{ color: '#adc8e0', textDecoration: 'none' }}>📞 +36 70 540 1107</a>
          <a href="https://www.facebook.com/apartmanhazakMiroesDali" target="_blank" rel="noreferrer" style={{ color: '#adc8e0', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 5 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="#4267B2"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            Apartmanhazak Miro &amp; Dali
          </a>
          <a href="https://maps.google.com/?q=8600+Siófok,+Szent+László+utca+119" target="_blank" rel="noreferrer" style={{ color: '#adc8e0', textDecoration: 'none' }}>📍 8600 Siófok, Szent László u. 119, 150</a>
        </div>
      </div>

      {/* NAV */}
      <nav style={{ position: 'fixed', top: infoBarHeight, left: 0, right: 0, zIndex: 100, background: scrolled || activeSection !== 'home' ? 'rgba(15,26,38,.85)' : 'transparent', backdropFilter: scrolled || activeSection !== 'home' ? 'blur(12px)' : 'none', transition: 'all .4s', padding: scrolled || activeSection !== 'home' ? '4px 0' : '12px 0' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span onClick={() => setActiveSection('home')} style={{ fontFamily: 'var(--heading)', fontWeight: 700, fontSize: 15, color: '#fff', cursor: 'pointer' }}>apARTmanházak Siófok – Miro & Dali</span>
          <div style={{ gap: 4, alignItems: 'center' }} className="desktop-nav">
            {sections.map((s) =>
              s.id === 'booking' ? (
                <button key={s.id} onClick={() => { setActiveSection('booking'); setMobileMenu(false); }} style={{ background: 'linear-gradient(135deg, #1a78c2, #2196F3)', padding: '8px 14px', borderRadius: 10, fontFamily: 'var(--body)', fontSize: 14, fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer' }}>{s.label}</button>
              ) : (
                <button key={s.id} onClick={() => { setActiveSection(s.id); setMobileMenu(false); }} style={{ background: activeSection === s.id ? 'rgba(255,255,255,.15)' : 'transparent', border: 'none', padding: '8px 14px', borderRadius: 10, fontFamily: 'var(--body)', fontSize: 14, fontWeight: activeSection === s.id ? 700 : 500, color: '#fff', cursor: 'pointer' }}>{s.label}</button>
              )
            )}
            <DesktopLangSwitcher />
          </div>
          <div className="mobile-controls">
            <MobileLangSwitcher />
            <button onClick={() => setMobileMenu(!mobileMenu)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#fff' }}>
              <Icon name={mobileMenu ? 'close' : 'menu'} size={28} />
            </button>
          </div>
        </div>
        {mobileMenu && (
          <div style={{ background: '#fff', padding: '16px 24px', display: 'flex', flexDirection: 'column', gap: 4, boxShadow: '0 8px 24px rgba(0,0,0,.1)' }}>
            {sections.map((s) =>
              s.id === 'booking' ? (
                <button key={s.id} onClick={() => { setActiveSection('booking'); setMobileMenu(false); }} style={{ background: 'linear-gradient(135deg, #1a78c2, #2196F3)', padding: '12px 16px', borderRadius: 10, fontFamily: 'var(--body)', fontSize: 15, fontWeight: 700, color: '#fff', border: 'none', cursor: 'pointer', display: 'block', textAlign: 'left' }}>{s.label} →</button>
              ) : (
                <button key={s.id} onClick={() => { setActiveSection(s.id); setMobileMenu(false); }} style={{ background: activeSection === s.id ? '#e8f4fd' : 'transparent', border: 'none', padding: '12px 16px', borderRadius: 10, textAlign: 'left', fontFamily: 'var(--body)', fontSize: 15, fontWeight: activeSection === s.id ? 700 : 400, color: activeSection === s.id ? '#1a5276' : '#555', cursor: 'pointer' }}>{s.label}</button>
              )
            )}
          </div>
        )}
      </nav>

      {/* HERO */}
      {activeSection === 'home' && (
        <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/balaton.png)`, backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(10,30,50,.75), rgba(20,60,100,.60))' }} />
          <div style={{ position: 'absolute', bottom: -2, left: 0, width: '200%', height: 80, overflow: 'hidden' }}>
            <svg viewBox="0 0 2400 80" style={{ width: '100%', height: '100%', animation: 'waveMove 12s linear infinite' }}><path d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 C1350,80 1550,0 1800,40 C2050,80 2250,0 2400,40 V80 H0 Z" fill="#f8f9fb" /></svg>
          </div>
          <div style={{ position: 'relative', zIndex: 2, minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '120px 24px 100px', color: '#fff' }}>
            <h1 className="hero-title" style={{ fontFamily: 'var(--heading)', fontSize: 56, fontWeight: 900, lineHeight: 1.1, animation: 'fadeUp .8s ease-out both', textShadow: '0 4px 30px rgba(0,0,0,.3)' }}>
              {t.hero.title}<br /><span style={{ fontStyle: 'italic', fontWeight: 400, fontSize: '0.7em' }}>{t.hero.sub}</span>
            </h1>
            <p className="hero-sub" style={{ fontFamily: 'var(--body)', fontSize: 20, fontWeight: 300, maxWidth: 560, marginTop: 20, lineHeight: 1.6, opacity: 0.9, animation: 'fadeUp .8s ease-out .2s both' }}>
              {t.hero.desc.split('\n').map((l, i) => <span key={i}>{l}<br /></span>)}
            </p>
            <div style={{ display: 'flex', gap: 14, marginTop: 36, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp .8s ease-out .4s both' }}>
              <button onClick={() => setActiveSection('miro')} style={{ padding: '14px 32px', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', border: '2px solid #fff6', borderRadius: 14, color: '#fff', fontFamily: 'var(--heading)', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span>{t.hero.miro}</span><span style={{ fontSize: 15, fontWeight: 600 }}>{t.hero.fromStrand150}</span>
              </button>
              <button onClick={() => setActiveSection('dali')} style={{ padding: '14px 32px', background: 'rgba(255,255,255,.15)', backdropFilter: 'blur(8px)', border: '2px solid #fff6', borderRadius: 14, color: '#fff', fontFamily: 'var(--heading)', fontSize: 16, fontWeight: 700, cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
                <span>{t.hero.dali}</span><span style={{ fontSize: 15, fontWeight: 600 }}>{t.hero.fromStrand200}</span>
              </button>
            </div>
            <div style={{ display: 'flex', gap: 20, marginTop: 52, flexWrap: 'wrap', justifyContent: 'center', animation: 'fadeUp .8s ease-out .6s both' }}>
              {[{ icon: 'wifi', label: t.features.wifi }, { icon: 'dog', label: t.features.pet }, { icon: 'sun', label: t.features.ac }, { icon: 'star', label: t.features.baby }, { icon: 'parking', label: t.features.parking }, { icon: 'sun', label: t.features.grill }, { icon: 'star', label: t.features.playground }].map((f) => (
                <div key={f.label} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 16px', background: 'rgba(255,255,255,.1)', borderRadius: 30, fontFamily: 'var(--body)', fontSize: 13, fontWeight: 600, color: '#fff', backdropFilter: 'blur(4px)' }}>
                  <Icon name={f.icon} size={16} /> {f.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* HOUSE SECTIONS */}
      {(activeSection === 'miro' || activeSection === 'dali') && (() => {
        const house = activeSection === 'miro' ? APARTMENTS.miro : APARTMENTS.dali;
        return (
          <div style={{ paddingTop: infoBarHeight }}>
            <div style={{ position: 'relative', height: 620, overflow: 'hidden' }}>
              <img src={activeSection === 'miro' ? `https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/images-2026/miro-house/barna/mirokertjo.PNG` : `https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/dali-house/bezs/daliBezsNappali.PNG`} alt={house.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 30%' }} />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.6)' }} />
              <div style={{ position: 'absolute', bottom: 120, left: 40, color: '#fff', zIndex: 3 }}>
                <h2 style={{ fontFamily: 'var(--heading)', fontSize: 48, fontWeight: 900 }}>{house.name}</h2>
                <p style={{ fontFamily: 'var(--body)', fontSize: 20, opacity: 0.9, marginTop: 8 }}>📍 {house.distance} · {house.description}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginTop: 16 }}>
                  {house.features.map((f) => (<span key={f} style={{ color: '#fff', fontFamily: 'var(--body)', fontSize: 16, fontWeight: 600 }}>✓ {f}</span>))}
                  <span style={{ color: '#ffd700', fontFamily: 'var(--heading)', fontSize: 17, fontWeight: 700 }}>💰 {house.priceFrom}-tól</span>
                </div>
              </div>
              <div style={{ position: 'absolute', bottom: -2, left: 0, width: '200%', height: 80, overflow: 'hidden', zIndex: 4 }}>
                <svg viewBox="0 0 2400 80" style={{ width: '100%', height: '100%', animation: 'waveMove 12s linear infinite' }}><path d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 C1350,80 1550,0 1800,40 C2050,80 2250,0 2400,40 V80 H0 Z" fill="#f8f9fb" /></svg>
              </div>
            </div>
            <div className="section-pad" style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px' }}>
              <h3 style={{ fontFamily: 'var(--heading)', fontSize: 28, color: '#1a2a3a', textAlign: 'center', marginBottom: 36 }}>{t.house.apartments}</h3>
              <div className="house-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2, minmax(0, 420px))', gap: 24, justifyContent: 'center' }}>
                {house.apartments.map((apt) => (<ApartmentCard key={apt.id} apt={apt} onGallery={openGallery} t={t} onBook={() => setActiveSection('booking')} />))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* BOOKING */}
      {activeSection === 'booking' && (
        <div style={{ paddingTop: infoBarHeight + 60 }}>
          <div className="section-pad" style={{ maxWidth: 800, margin: '0 auto', padding: '0 24px 60px' }}>
            <div style={{ textAlign: 'center', marginBottom: 36 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📅</div>
              <h2 style={{ fontFamily: 'var(--heading)', fontSize: 36, color: '#1a2a3a' }}>{t.booking.title}</h2>
              <p style={{ fontFamily: 'var(--body)', fontSize: 16, color: '#777', marginTop: 8 }}>{t.booking.desc}</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 24, padding: 24, boxShadow: '0 8px 40px rgba(0,0,0,.06)' }}><BookingPanel /></div>
            <div style={{ marginTop: 36, background: '#fff', borderRadius: 20, padding: '28px 32px', boxShadow: '0 4px 20px rgba(0,0,0,.04)' }}>
              <h4 style={{ fontFamily: 'var(--heading)', fontSize: 20, color: '#1a2a3a', marginBottom: 16 }}>{t.booking.conditions}</h4>
              <div style={{ fontFamily: 'var(--body)', fontSize: 14, color: '#555', lineHeight: 1.8 }}>
                <p><strong>{t.booking.preseason}:</strong> {t.booking.preseasonDesc}</p>
                <p><strong>{t.booking.highseason}:</strong> {t.booking.highseasonDesc}</p>
                <p><strong>{t.booking.postseason}:</strong> {t.booking.postseasonDesc}</p>
                <p><strong>{t.booking.arrival}:</strong> 15:00–18:00 · <strong>{t.booking.departure}:</strong> 10:00-11:00</p>
                <p><strong>{t.booking.cancel}:</strong> {t.booking.cancelDesc}</p>
                <p><strong>{t.booking.ifa}:</strong> {t.booking.ifaDesc}</p>
                <p><strong>{t.booking.payment}:</strong> {t.booking.paymentDesc}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* AREA */}
      {activeSection === 'area' && (
        <div style={{ paddingTop: infoBarHeight }}>
          <div style={{ position: 'relative', height: 437, overflow: 'hidden', backgroundImage: `url(https://raw.githubusercontent.com/siofokapartmanhazak/siofokapartmanhazak.github.io/main/static/img/images-2026/siofok-strand.png)`, backgroundSize: 'cover', backgroundPosition: 'center 60%' }}>
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,30,50,.7), rgba(10,30,50,.1))' }} />
            <div style={{ position: 'absolute', bottom: -2, left: 0, width: '200%', height: 80, overflow: 'hidden' }}>
              <svg viewBox="0 0 2400 80" style={{ width: '100%', height: '100%', animation: 'waveMove 12s linear infinite' }}><path d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 C1350,80 1550,0 1800,40 C2050,80 2250,0 2400,40 V80 H0 Z" fill="#f8f9fb" /></svg>
            </div>
            <div style={{ position: 'absolute', bottom: 90, left: 0, right: 0, textAlign: 'center', color: '#fff' }}>
              <h2 style={{ fontFamily: 'var(--heading)', fontSize: 42, fontWeight: 900, textShadow: '0 4px 20px rgba(0,0,0,.4)' }}>{t.area.title}</h2>
              <p style={{ fontFamily: 'var(--body)', fontSize: 18, opacity: 0.9, marginTop: 8 }}>{t.area.desc}</p>
            </div>
          </div>
          <div className="section-pad" style={{ maxWidth: 900, margin: '0 auto', padding: '40px 24px 60px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: 20 }}>
              {[
                { emoji: '🏖️', title: 'Aranypart Szabadstrand', dist: '150–200m', desc: { hu: '4 km-es ingyenes strand, éttermek, büfék, vízi sportok.', en: '4 km free beach, restaurants, water sports.', de: '4 km langer kostenloser Strand, Restaurants, Wassersport.', pl: '4 km bezpłatna plaża, restauracje, sporty wodne.', sk: '4 km bezplatná pláž, reštaurácie, vodné športy.' }, url: 'https://siofok.hu/latnivalok/' },
                { emoji: '🐾', title: 'Bella Állatpark', dist: '2.7 km', desc: { hu: 'Közel 300 állatfaj, interaktív programok, lovaglás.', en: 'Nearly 300 animal species, horse riding, interactive programs.', de: 'Fast 300 Tierarten, Reiten, interaktive Programme.', pl: 'Prawie 300 gatunków zwierząt, jeździectwo.', sk: 'Takmer 300 druhov zvierat, jazdenie na koňoch.' }, url: 'https://www.bellapuszta.hu' },
                { emoji: '🌊', title: 'Bebo Aquapark', dist: '150m', desc: { hu: 'Csúszdák, medencék, gyerekeknek és felnőtteknek.', en: 'Slides, pools, fun for kids and adults.', de: 'Rutschen, Pools, für Jung und Alt.', pl: 'Zjeżdżalnie, baseny, dla dzieci i dorosłych.', sk: 'Šmýkačky, bazény, pre deti aj dospelých.' }, url: 'https://www.beboaquapark.hu' },
                { emoji: '🏊', title: 'Galerius Fürdő', dist: { hu: '5 perc kocsival', en: '5 min by car', de: '5 Min. mit Auto', pl: '5 min samochodem', sk: '5 min autom' }, desc: { hu: 'Élményfürdő, wellness, fedett és kültéri medencék.', en: 'Spa, wellness, indoor and outdoor pools.', de: 'Erlebnisbad, Wellness, Innen- und Außenbecken.', pl: 'Aquapark, wellness, baseny.', sk: 'Aquapark, wellness, bazény.' }, url: 'https://galerius-furdo.hu/' },
                { emoji: '🚌', title: { hu: 'Buszmegálló', en: 'Bus stop', de: 'Bushaltestelle', pl: 'Przystanek', sk: 'Zastávka' }, dist: '50m', desc: { hu: 'Közvetlen az épületek mellett, rendszeres járatokkal.', en: 'Right next to the buildings, regular services.', de: 'Direkt neben den Gebäuden.', pl: 'Tuż obok budynków.', sk: 'Priamo vedľa budov.' }, url: null },
                { emoji: '🛒', title: { hu: 'Kis közért', en: 'Grocery store', de: 'Lebensmittelladen', pl: 'Sklep', sk: 'Obchod' }, dist: '100m', desc: { hu: 'Alapvető élelmiszerek, napi szükségletek.', en: 'Basic groceries, daily essentials.', de: 'Grundlebensmittel, täglicher Bedarf.', pl: 'Podstawowe artykuły spożywcze.', sk: 'Základné potraviny.' }, url: null },
                { emoji: '🚂', title: { hu: 'Vasútállomás', en: 'Train station', de: 'Bahnhof', pl: 'Stacja kolejowa', sk: 'Železničná stanica' }, dist: { hu: '15 perc', en: '15 min', de: '15 Min.', pl: '15 min', sk: '15 min' }, desc: { hu: 'Közvetlen vonatkapcsolat Budapesttel.', en: 'Direct train to Budapest.', de: 'Direktverbindung nach Budapest.', pl: 'Bezpośredni pociąg do Budapesztu.', sk: 'Priamy vlak do Budapešti.' }, url: 'https://www.mavcsoport.hu' },
                { emoji: '🏛️', title: 'Tihanyi Bencés Apátság', dist: '~40 km', desc: { hu: 'A Balaton egyik jelképe, lenyűgöző kilátással a tóra.', en: "One of Lake Balaton's landmarks, with a stunning view of the lake.", de: 'Eines der Wahrzeichen des Balatons mit atemberaubendem Blick auf den See.', pl: 'Jeden z symboli Balatonu, z zapierającym dech widokiem na jezioro.', sk: 'Jeden zo symbolov Balatonu s nádherným výhľadom na jazero.' }, url: 'https://www.tihanyiapatsag.hu' },
                { emoji: '💜', title: 'Tihanyi-félsziget & Levendulás', dist: '~40 km', desc: { hu: 'Belső-tó, levendulamezők, hangulatos falusi séta.', en: 'Inner Lake, lavender fields, a charming village walk.', de: 'Innerer See, Lavendelfelder, gemütlicher Dorfspaziergang.', pl: 'Jezioro Wewnętrzne, pola lawendy, urokliwy spacer po wiosce.', sk: 'Vnútorné jazero, levanduľové polia, príjemná dedinská prechádzka.' }, url: null },
                { emoji: '🌊', title: 'Balatonfüred – Tagore sétány', dist: '~45 km', desc: { hu: 'Elegáns tóparti sétány, éttermekkel és mólóval.', en: 'Elegant lakeside promenade with restaurants and a pier.', de: 'Elegante Uferpromenade mit Restaurants und Steg.', pl: 'Elegancka promenada nad jeziorem z restauracjami i molo.', sk: 'Elegantná promenáda pri jazere s reštauráciami a mólom.' }, url: 'https://turizmus.balatonfured.hu/en/sights/tagore-promenade/' },
                { emoji: '🕳️', title: 'Lóczy-barlang', dist: '~50 km', desc: { hu: 'Rövid, családbarát barlangtúra, esős napra is jó.', en: 'Short family-friendly cave tour, great for rainy days.', de: 'Kurze, familienfreundliche Höhlentour, auch bei Regen.', pl: 'Krótka, przyjazna rodzinom wycieczka do jaskini.', sk: 'Krátka, rodinná prehliadka jaskyne, vhodná aj na dažďové dni.' }, url: 'https://www.bfnp.hu/hu/latogatohelyek-3/loczy-barlang-balatonfured' },
                { emoji: '🔭', title: 'Jókai-kilátó (Tamás-hegy)', dist: '~50 km', desc: { hu: 'Gyönyörű panoráma egy könnyű túra végén.', en: 'Beautiful panorama at the end of an easy hike.', de: 'Schöne Aussicht am Ende einer leichten Wanderung.', pl: 'Piękna panorama na końcu łatwej wędrówki.', sk: 'Krásna panoráma na konci ľahkého výletu.' }, url: null },
                { emoji: '🏰', title: 'Veszprémi várnegyed', dist: '~50 km', desc: { hu: 'Hangulatos óváros, vár és kávézók.', en: 'Charming old town, castle district and cafés.', de: 'Charmante Altstadt, Burgviertel und Cafés.', pl: 'Urokliwe stare miasto, dzielnica zamkowa i kawiarnie.', sk: 'Malebné staré mesto, hradná štvrť a kaviarne.' }, url: 'https://vetk.hu/en/' },
                { emoji: '🦁', title: 'Veszprémi Állatkert', dist: '~50 km', desc: { hu: 'Egész napos élmény gyerekekkel.', en: 'A full day out with the kids.', de: 'Ein ganztägiger Ausflug mit Kindern.', pl: 'Całodniowa atrakcja z dziećmi.', sk: 'Celodenný zážitok s deťmi.' }, url: 'https://www.veszpzoo.hu/' },
                { emoji: '🌉', title: 'Kőröshegyi völgyhíd', dist: '~22 km', desc: { hu: 'Az M7 ikonikus hídja, remek fotópontokkal.', en: "The M7 motorway's iconic bridge, great photo spots.", de: 'Die ikonische Brücke der Autobahn M7, tolle Fotospots.', pl: 'Ikoniczny most autostrady M7, świetne miejsca na zdjęcia.', sk: 'Ikonický most diaľnice M7, skvelé fotomiesta.' }, url: null },
                { emoji: '💜', title: 'Kőröshegyi Levendulás', dist: '~22 km', desc: { hu: 'Látványos levendulamezők nyári szezonban.', en: 'Spectacular lavender fields in summer.', de: 'Spektakuläre Lavendelfelder im Sommer.', pl: 'Spektakularne pola lawendy latem.', sk: 'Nádherné levanduľové polia v lete.' }, url: 'https://koroshegyilevendulas.hu/' },
                { emoji: '🐎', title: 'Szántódpuszta Majorság', dist: '~22 km', desc: { hu: 'Régi majorsági épületek, jó családos program.', en: 'Historic manor buildings, a great family outing.', de: 'Historische Gutsgebäude, toller Familienausflug.', pl: 'Zabytkowe budynki folwarczne, świetna wycieczka rodzinna.', sk: 'Historické majerské budovy, skvelý rodinný výlet.' }, url: 'https://www.szantodpuszta.hu/en/' },
                { emoji: '🔭', title: 'Zamárdi – Kőhegyi kilátó', dist: '~15 km', desc: { hu: 'Közeli panoráma a Balatonra.', en: 'A nearby panoramic view of Lake Balaton.', de: 'Nahegelegener Panoramablick auf den Balaton.', pl: 'Pobliska panorama na Balaton.', sk: 'Blízka panoráma na Balaton.' }, url: null },
                { emoji: '⚓', title: 'Balatonföldvári Hajózástörténeti Központ', dist: '~27 km', desc: { hu: 'Hajózástörténet és kilátó egy helyen.', en: 'Sailing history and a lookout tower in one place.', de: 'Schifffahrtsgeschichte und Aussichtsturm an einem Ort.', pl: 'Historia żeglugi i wieża widokowa w jednym miejscu.', sk: 'História plavby a vyhliadková veža na jednom mieste.' }, url: 'https://balatonfoldvarikilato.hu/en/home/' },
                { emoji: '🌐', title: 'Balatonboglári Gömbkilátó', dist: '~42 km', desc: { hu: 'Ikonikus balatoni kilátó, rövid kirándulásra.', en: 'Iconic Balaton lookout, perfect for a short trip.', de: 'Ikonischer Balaton-Aussichtsturm, kurzer Ausflug.', pl: 'Ikoniczna wieża widokowa nad Balatonem, na krótką wycieczkę.', sk: 'Ikonická vyhliadka nad Balatonom, na krátky výlet.' }, url: 'https://balatonboglarbob.hu/gombkilato' },
                { emoji: '🍷', title: 'Balatonlelle – Kishegyi kilátó', dist: '~45 km', desc: { hu: 'Szép kilátás, közelben borospincékkel.', en: 'Beautiful view, with wine cellars nearby.', de: 'Schöne Aussicht, in der Nähe Weinkeller.', pl: 'Piękny widok, w pobliżu piwnice z winem.', sk: 'Krásny výhľad, v okolí vínne pivnice.' }, url: null },
              ].map((p, i) => (
                <div key={i} style={{ background: '#fff', borderRadius: 18, padding: '24px 22px', boxShadow: '0 4px 16px rgba(0,0,0,.04)', cursor: p.url ? 'pointer' : 'default' }} onClick={() => p.url && window.open(p.url, '_blank')}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>{p.emoji}</div>
                  <h4 style={{ fontFamily: 'var(--heading)', fontSize: 17, color: '#1a2a3a', marginBottom: 4 }}>{typeof p.title === 'object' ? p.title[lang] : p.title}</h4>
                  <span style={{ display: 'inline-block', background: '#e8f4fd', color: '#1a5276', padding: '2px 10px', borderRadius: 8, fontSize: 12, fontWeight: 600, marginBottom: 8 }}>{typeof p.dist === 'object' ? p.dist[lang] : p.dist}</span>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 14, color: '#666', lineHeight: 1.5 }}>{p.desc[lang]}</p>
                  {p.url && <p style={{ fontFamily: 'var(--body)', fontSize: 13, color: '#2e86c1', marginTop: 10, fontWeight: 600 }}>{t.area.web}</p>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* GALLERY */}
      {activeSection === 'galeria' && (() => {
        const noFloor = (u) => !u.includes('floor') && !u.includes('alaprajz');
        const allPhotos = [
          ...APARTMENTS.miro.apartments.map((apt) => [{ house: 'Miro Ház', apt: apt.name, url: apt.hero }, ...apt.images.filter(noFloor).map(url => ({ house: 'Miro Ház', apt: apt.name, url }))]).flat(),
          ...APARTMENTS.dali.apartments.map((apt) => [{ house: 'Dali Ház', apt: apt.name, url: apt.hero }, ...apt.images.filter(noFloor).map(url => ({ house: 'Dali Ház', apt: apt.name, url }))]).flat(),
        ];
        return (
          <div style={{ paddingTop: infoBarHeight }}>
            <div style={{ position: 'relative', height: 300, overflow: 'hidden', background: 'linear-gradient(135deg, #1a2a3a, #2e4a6a)' }}>
              <div style={{ position: 'absolute', bottom: -2, left: 0, width: '200%', height: 80, overflow: 'hidden' }}>
                <svg viewBox="0 0 2400 80" style={{ width: '100%', height: '100%', animation: 'waveMove 12s linear infinite' }}><path d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 C1350,80 1550,0 1800,40 C2050,80 2250,0 2400,40 V80 H0 Z" fill="#f8f9fb" /></svg>
              </div>
              <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, textAlign: 'center', color: '#fff' }}>
                <h2 style={{ fontFamily: 'var(--heading)', fontSize: 42, fontWeight: 900 }}>{t.gallery.title}</h2>
                <p style={{ fontFamily: 'var(--body)', fontSize: 18, opacity: 0.9, marginTop: 8 }}>{t.gallery.desc}</p>
              </div>
            </div>
            <div style={{ maxWidth: 1200, margin: '0 auto', padding: '40px 24px 60px' }}>
              <div style={{ columns: '6 140px', gap: 10 }}>
                {allPhotos.map((photo, i) => (
                  <div key={i} onClick={() => { setGalleryApt({ hero: photo.url, images: [] }); setGalleryIdx(0); }} style={{ breakInside: 'avoid', marginBottom: 10, borderRadius: 10, overflow: 'hidden', cursor: 'pointer', position: 'relative' }}>
                    <img src={photo.url} alt={photo.apt} loading="lazy" decoding="async" style={{ width: '100%', display: 'block', borderRadius: 10 }} />
                    <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(0,0,0,.7), transparent)', padding: '14px 8px 6px', borderRadius: '0 0 10px 10px' }}>
                      <div style={{ fontFamily: 'var(--body)', fontSize: 9, color: '#fff', fontWeight: 700, textTransform: 'uppercase', opacity: 0.8 }}>{photo.house}</div>
                      <div style={{ fontFamily: 'var(--heading)', fontSize: 11, color: '#fff', fontWeight: 700 }}>{photo.apt}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* CONTACT */}
      {activeSection === 'contact' && (
        <div style={{ paddingTop: infoBarHeight + 60 }}>
          <div className="section-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px 60px' }}>
            <div style={{ textAlign: 'center', marginBottom: 40 }}>
              <div style={{ fontSize: 40, marginBottom: 12 }}>📞</div>
              <h2 style={{ fontFamily: 'var(--heading)', fontSize: 36, color: '#1a2a3a' }}>{t.contact.title}</h2>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 24, alignItems: 'stretch' }}>
              {/* Left: contacts card */}
              <div style={{ background: 'linear-gradient(135deg, #1a5276, #2e86c1)', borderRadius: 24, padding: 36, color: '#fff' }}>
                <h3 style={{ fontFamily: 'var(--heading)', fontSize: 22, marginBottom: 24 }}>{t.contact.contacts}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><Icon name="map" size={22} /><div><div style={{ fontSize: 14, fontWeight: 600 }}>Miro: Szent László u. 119.</div><div style={{ fontSize: 14, fontWeight: 600 }}>Dali: Szent László u. 150.</div><div style={{ fontSize: 13, opacity: 0.8 }}>8600 Siófok</div></div></div>
                  <a href="tel:+36705401107" style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#fff', textDecoration: 'none' }}><Icon name="phone" size={22} /><span style={{ fontSize: 16, fontWeight: 600 }}>+36 70 540 1107</span></a>
                  <a href="mailto:apartmanhazaksiofok@gmail.com" style={{ display: 'flex', alignItems: 'center', gap: 14, color: '#fff', textDecoration: 'none' }}><Icon name="mail" size={22} /><span style={{ fontSize: 14, fontWeight: 600 }}>apartmanhazaksiofok@gmail.com</span></a>
                </div>
                <div style={{ marginTop: 28, paddingTop: 20, borderTop: '1px solid rgba(255,255,255,.2)', fontSize: 12, opacity: 0.7, lineHeight: 1.8 }}>
                  NTAK: Miro ház EG19023010 · Dali ház EG19023027 · Telmat Kft. · 12057384-2-41<br /><br />
                  <strong style={{ opacity: 1 }}>HUF:</strong> HU93 1040 2166 2163 5676 0000 0000<br />
                  <strong style={{ opacity: 1 }}>EUR:</strong> HU72 1041 0400 0000 0190 0058 6944<br /><br />
                  <strong style={{ opacity: 1 }}>OTP SZÉP kártya elfogadóhely:</strong> TELMAT Telematikai Szolgáltató és Kereskedelmi Kft.
                </div>
              </div>
              {/* Right: map */}
              <div style={{ borderRadius: 24, overflow: 'hidden', minHeight: 360, boxShadow: '0 8px 32px rgba(0,0,0,.1)' }}>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1363!2d18.0432!3d46.9053!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4769f4f3b6b6b6b7%3A0x0!2zU3plbnQgTMOhc3psw7MgdXRjYSAxMTksIDg2MDAgU2nDs2Zvaw!5e0!3m2!1shu!2shu!4v1" width="100%" height="100%" style={{ border: 0, display: 'block', minHeight: 360 }} allowFullScreen loading="lazy" title="térkép" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: 16, marginTop: 20, justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="https://maps.google.com/?q=8600+Siófok,+Szent+László+utca+119" target="_blank" rel="noreferrer" style={{ padding: '10px 20px', background: '#1a5276', color: '#fff', borderRadius: 12, fontFamily: 'var(--body)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>{t.contact.miroRoute}</a>
              <a href="https://maps.google.com/?q=8600+Siófok,+Szent+László+utca+150" target="_blank" rel="noreferrer" style={{ padding: '10px 20px', background: '#C0714F', color: '#fff', borderRadius: 12, fontFamily: 'var(--body)', fontSize: 14, fontWeight: 600, textDecoration: 'none' }}>{t.contact.daliRoute}</a>
            </div>
          </div>
        </div>
      )}

      {/* HOME EXTRA */}
      {activeSection === 'home' && (
        <div style={{ background: '#f8f9fb' }}>
          <div className="section-pad" style={{ maxWidth: 1100, margin: '0 auto', padding: '60px 24px' }}>
            {/* Intro paragraphs */}
            <div style={{ maxWidth: 820, margin: '0 auto 52px', textAlign: 'center' }}>
              {t.home.intro.split('\n').map((para, i) => (
                i === 0
                  ? <p key={i} style={{ fontFamily: 'var(--heading)', fontSize: 22, fontWeight: 800, color: '#1a2a3a', lineHeight: 1.45, margin: '0 0 18px' }}>{para}</p>
                  : <p key={i} style={{ fontFamily: 'var(--body)', fontSize: 16.5, color: '#445566', lineHeight: 1.78, margin: '0 0 14px' }}>{para}</p>
              ))}
            </div>
            <h2 style={{ fontFamily: 'var(--heading)', fontSize: 36, color: '#1a2a3a', textAlign: 'center', marginBottom: 8 }}>{t.home.choose}</h2>
            <p style={{ fontFamily: 'var(--body)', fontSize: 16, color: '#888', textAlign: 'center', marginBottom: 40 }}>{t.home.chooseDesc}</p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: 28 }}>
              {[{ key: 'miro', ...APARTMENTS.miro, accent: '#1a5276' }, { key: 'dali', ...APARTMENTS.dali, accent: '#C0714F' }].map((h) => (
                <div key={h.key} onClick={() => setActiveSection(h.key)} style={{ position: 'relative', borderRadius: 24, overflow: 'hidden', height: 380, cursor: 'pointer', boxShadow: '0 8px 32px rgba(0,0,0,.1)' }}>
                  <img src={h.exterior} alt={h.name} loading="lazy" decoding="async" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, ${h.accent}dd, transparent 60%)` }} />
                  <div style={{ position: 'absolute', bottom: 28, left: 28, color: '#fff' }}>
                    <h3 style={{ fontFamily: 'var(--heading)', fontSize: 32, fontWeight: 900 }}>{h.name}</h3>
                    <p style={{ fontFamily: 'var(--body)', fontSize: 17, marginTop: 4, fontWeight: 700 }}>📍 {h.distance}</p>
                    <p style={{ fontFamily: 'var(--body)', fontSize: 14, opacity: 0.8, marginTop: 2 }}>{h.apartments.length} · {h.priceFrom} {t.house.from}</p>
                    <span style={{ display: 'inline-block', marginTop: 14, padding: '10px 22px', background: 'rgba(255,255,255,.2)', backdropFilter: 'blur(8px)', borderRadius: 12, fontFamily: 'var(--heading)', fontSize: 14, fontWeight: 700 }}>{t.home.view}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <ReviewsSection t={t} lang={lang} />

          <div style={{ background: '#1a2a3a', padding: '56px 24px' }}>
            <div style={{ maxWidth: 1000, margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 32, textAlign: 'center' }}>
              {t.home.features.map((f) => (
                <div key={f.label} style={{ color: '#fff' }}>
                  <div style={{ marginBottom: 12, opacity: 0.7 }}><Icon name={f.icon} size={28} /></div>
                  <h4 style={{ fontFamily: 'var(--heading)', fontSize: 18, marginBottom: 4 }}>{f.label}</h4>
                  <p style={{ fontFamily: 'var(--body)', fontSize: 14, opacity: 0.6 }}>{f.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* ═══ FOGLALÁS GOMB ELŐ ═══ */}
          <div style={{ textAlign: 'center', padding: '60px 24px' }}>
            <h2 style={{ fontFamily: 'var(--heading)', fontSize: 32, color: '#1a2a3a', marginBottom: 8 }}>{t.home.ready}</h2>
            <p style={{ fontFamily: 'var(--body)', fontSize: 16, color: '#888', marginBottom: 28 }}>{t.home.readyDesc}</p>
            <button onClick={() => setActiveSection('booking')} style={{ padding: '16px 48px', background: 'linear-gradient(135deg, #e67e22, #f39c12)', borderRadius: 16, color: '#fff', fontFamily: 'var(--heading)', fontSize: 18, fontWeight: 700, boxShadow: '0 6px 24px rgba(230,126,34,.35)', border: 'none', cursor: 'pointer', display: 'inline-block' }}>{t.home.bookNow}</button>
          </div>
        </div>
      )}

      <footer style={{ background: '#0f1a26', color: '#fff8', padding: '32px 24px', textAlign: 'center', fontFamily: 'var(--body)', fontSize: 13 }}>
        <p>{t.footer}</p>
        <p style={{ marginTop: 6, opacity: 0.5 }}>8600 Siófok, Szent László utca 119, 150</p>
      </footer>

      <ChatWidget />
    </div>
  );
}
