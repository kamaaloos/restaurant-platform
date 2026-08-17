import type { Locale } from "./locales";

export type MessageKey =
  | "authenticCuisine"
  | "welcome"
  | "welcomeBodyTable"
  | "welcomeBodyWalkIn"
  | "trackOrders"
  | "pickupBoard"
  | "searchMenu"
  | "allCategories"
  | "comingSoon"
  | "noSearchResults"
  | "noCategories"
  | "tapForDetails"
  | "soldOut"
  | "itemUnavailable"
  | "customize"
  | "cart"
  | "items"
  | "item"
  | "viewYourOrder"
  | "total"
  | "viewOrder"
  | "required"
  | "specialRequests"
  | "specialRequestsPlaceholder"
  | "quantity"
  | "add"
  | "close"
  | "tableNotFound"
  | "invalidQr"
  | "loadingMenu"
  | "callWaiter"
  | "requestBill"
  | "waiterNotified"
  | "billRequested"
  | "addedToCart"
  | "selectOptions"
  | "cartTitle"
  | "menu"
  | "emptyCartTitle"
  | "emptyCartBody"
  | "backToMenu"
  | "placeOrder"
  | "confirmOrder"
  | "confirmOrderBody"
  | "confirmOrderBodyWalkIn"
  | "cancel"
  | "cancelOrder"
  | "cancelOrderConfirm"
  | "orderCancelled"
  | "couldNotCancel"
  | "customerName"
  | "customerNameOptional"
  | "seat"
  | "seatAny"
  | "course"
  | "courseAppetizer"
  | "courseDrink"
  | "courseMain"
  | "courseDessert"
  | "courseOther"
  | "rushOrder"
  | "vipGuest"
  | "orderPlaced"
  | "orderNumberPlaced"
  | "orderAwaitingPayment"
  | "couldNotPlaceOrder"
  | "payNow"
  | "payWithCard"
  | "payAtCounterHint"
  | "paymentSuccess"
  | "couldNotPay"
  | "statusPendingPayment"
  | "kitchenAfterPay"
  | "yourOrder"
  | "pickupNumber"
  | "orderMore"
  | "orderNotFound"
  | "statusReceived"
  | "statusAccepted"
  | "statusPreparing"
  | "statusReady"
  | "statusServed"
  | "statusCompleted"
  | "statusCancelled"
  | "statusReadyPickup"
  | "tvBoard"
  | "pickupBoardTitle"
  | "preparingColumn"
  | "preparingHint"
  | "readyColumn"
  | "readyHint"
  | "live"
  | "connected"
  | "polling"
  | "homeEyebrow"
  | "homeTitle"
  | "homeBody"
  | "landingBrand"
  | "landingNavFeatures"
  | "landingNavProduct"
  | "landingNavHow"
  | "landingNavAbout"
  | "landingNavLogin"
  | "landingNavDemo"
  | "landingHeroLine1"
  | "landingHeroLine2"
  | "landingHeroLead"
  | "landingCtaTrial"
  | "landingCtaWatch"
  | "landingTrustEasy"
  | "landingTrustAllInOne"
  | "landingTrustDevices"
  | "landingTrustSecure"
  | "landingProductEyebrow"
  | "landingProductTitle"
  | "landingProductBullet1"
  | "landingProductBullet2"
  | "landingProductBullet3"
  | "landingProductBullet4"
  | "landingFeaturesTitle"
  | "landingFeatPosTitle"
  | "landingFeatPosBody"
  | "landingFeatTablesTitle"
  | "landingFeatTablesBody"
  | "landingFeatKitchenTitle"
  | "landingFeatKitchenBody"
  | "landingFeatOnlineTitle"
  | "landingFeatOnlineBody"
  | "landingFeatReportsTitle"
  | "landingFeatReportsBody"
  | "landingFeatStaffTitle"
  | "landingFeatStaffBody"
  | "landingHowEyebrow"
  | "landingHowTitle"
  | "landingHowBody"
  | "landingHowTableTitle"
  | "landingHowTableBody"
  | "landingHowWalkInTitle"
  | "landingHowWalkInBody"
  | "landingStoriesEyebrow"
  | "landingStoriesTitle"
  | "landingStoriesBody"
  | "landingStoriesRating"
  | "landingQuote1"
  | "landingQuote1By"
  | "landingQuote2"
  | "landingQuote2By"
  | "landingQuote3"
  | "landingQuote3By"
  | "landingFinalTitle"
  | "landingFinalBody"
  | "landingFinalNote"
  | "tenantEyebrow"
  | "tenantBody"
  | "tenantBranches"
  | "tenantNoBranches"
  | "tenantOrderHere"
  | "tenantNotFoundTitle"
  | "tenantNotFoundBody"
  | "openDemoTable"
  | "walkIn"
  | "pickupTv"
  | "allWalkInBranches"
  | "language"
  | "currency"
  | "loadingCart"
  | "loadingOrder"
  | "loading"
  | "notePrefix"
  | "yourOrders"
  | "noActiveOrders"
  | "tableLabel"
  | "customizeDish"
  | "sending"
  | "guestPlaceholder"
  | "orderStatus"
  | "allOrders"
  | "current"
  | "somethingWentWrong"
  | "orderInProgress"
  | "assistanceNote"
  | "ourMenu"
  | "addToCart"
  | "viewCart"
  | "orderSent"
  | "orderSentBody"
  | "queueNumberLabel"
  | "estimatedPrep"
  | "estimatedPrepTime"
  | "trackOrder"
  | "proceedCheckout"
  | "pairDeviceTitle"
  | "pairDeviceBody"
  | "deviceTokenLabel"
  | "pairDevicePlaceholder"
  | "pairDeviceCta"
  | "pairing"
  | "unpairDevice"
  | "catShakes"
  | "catHotDrinks"
  | "catSoftDrinks"
  | "catDrinks"
  | "catDesserts"
  | "catSalads"
  | "catStarters"
  | "catMainDishes"
  | "catMains";

export type Messages = Record<MessageKey, string>;

const en: Messages = {
  authenticCuisine: "Authentic cuisine",
  welcome: "Welcome!",
  welcomeBodyTable:
    "Browse our dishes and send your order straight to the kitchen.",
  welcomeBodyWalkIn:
    "Browse the menu, get a pickup number, and watch the board.",
  trackOrders: "Track orders",
  pickupBoard: "Pickup board",
  searchMenu: "Search the menu…",
  allCategories: "All",
  comingSoon: "Coming soon!",
  noSearchResults: "No dishes match your search.",
  noCategories: "Coming soon!",
  tapForDetails: "Tap for details",
  soldOut: "Sold out",
  itemUnavailable: "This item is sold out",
  customize: "Customize",
  cart: "Cart",
  items: "items",
  item: "item",
  viewYourOrder: "View your order",
  total: "Total",
  viewOrder: "View order",
  required: "Required",
  specialRequests: "Special requests",
  specialRequestsPlaceholder: "No onions, extra sauce…",
  quantity: "Quantity",
  add: "Add",
  close: "Close",
  tableNotFound: "Table not found",
  invalidQr: "Invalid QR code",
  loadingMenu: "Loading menu…",
  callWaiter: "Call waiter",
  requestBill: "Request bill",
  waiterNotified: "Waiter notified",
  billRequested: "Bill requested",
  addedToCart: "Added {qty}× {name}",
  selectOptions: "Please select at least {min} option(s) for {group}",
  cartTitle: "Cart",
  menu: "Menu",
  emptyCartTitle: "Your cart is empty",
  emptyCartBody: "Browse the menu to add something delicious.",
  backToMenu: "Back to Menu",
  placeOrder: "Place order",
  confirmOrder: "Confirm order?",
  confirmOrderBody: "Send this order to the kitchen?",
  confirmOrderBodyWalkIn: "Create this order? You’ll pay next, then kitchen starts.",
  cancel: "Cancel",
  cancelOrder: "Cancel order",
  cancelOrderConfirm: "Cancel this order? It will be removed from the kitchen.",
  orderCancelled: "Order cancelled",
  couldNotCancel: "Could not cancel order",
  customerName: "Your name",
  customerNameOptional: "Name (optional)",
  seat: "Seat",
  seatAny: "Any",
  course: "Course",
  courseAppetizer: "Starter",
  courseDrink: "Drink",
  courseMain: "Main",
  courseDessert: "Dessert",
  courseOther: "Other",
  rushOrder: "Rush — prioritize kitchen",
  vipGuest: "VIP guest",
  orderPlaced: "Order placed — kitchen is on it",
  orderNumberPlaced: "Order {number} placed",
  orderAwaitingPayment: "Order {number} created — pay to send it to the kitchen",
  couldNotPlaceOrder: "Could not place order",
  payNow: "Pay now",
  payWithCard: "Pay with card",
  payAtCounterHint: "Or pay at the counter — kitchen starts after payment.",
  paymentSuccess: "Paid — kitchen has your order",
  couldNotPay: "Payment failed",
  statusPendingPayment: "Awaiting payment",
  kitchenAfterPay: "Kitchen starts cooking after you pay.",
  yourOrder: "Your order",
  pickupNumber: "Pickup number",
  orderMore: "Order more",
  orderNotFound: "Order not found",
  statusReceived: "Received",
  statusAccepted: "Accepted",
  statusPreparing: "Preparing",
  statusReady: "Ready",
  statusServed: "Served",
  statusCompleted: "Completed",
  statusCancelled: "Cancelled",
  statusReadyPickup: "Ready for pickup",
  tvBoard: "TV board",
  pickupBoardTitle: "Pickup board",
  preparingColumn: "New / Preparing",
  preparingHint: "Kitchen is working on it",
  readyColumn: "Ready",
  readyHint: "Please collect",
  live: "Live",
  connected: "connected",
  polling: "polling",
  homeEyebrow: "Customer ordering",
  homeTitle: "Table or walk-in",
  homeBody:
    "Use the QR code or link from your restaurant. Seated guests scan a table QR. Standing guests use a walk-in link for a pickup number and the overhead TV board.",
  landingBrand: "MayleSoft",
  landingNavFeatures: "Features",
  landingNavProduct: "Product",
  landingNavHow: "How it works",
  landingNavAbout: "Stories",
  landingNavLogin: "Log in",
  landingNavDemo: "Book demo",
  landingHeroLine1: "Run your restaurant.",
  landingHeroLine2: "Not your software.",
  landingHeroLead:
    "MayleSoft is the complete platform for orders, tables, kitchen, and walk-in pickup — so your team can focus on guests.",
  landingCtaTrial: "Start free trial",
  landingCtaWatch: "See the product",
  landingTrustEasy: "Easy to use",
  landingTrustAllInOne: "All-in-one platform",
  landingTrustDevices: "Works on any device",
  landingTrustSecure: "Secure & reliable",
  landingProductEyebrow: "All-in-one",
  landingProductTitle: "Everything you need to run your restaurant.",
  landingProductBullet1: "Fast, intuitive till and payments",
  landingProductBullet2: "Table and floor management",
  landingProductBullet3: "Kitchen and waiter displays in sync",
  landingProductBullet4: "Guest QR ordering and pickup TV",
  landingFeaturesTitle: "Powerful features. Simple to use.",
  landingFeatPosTitle: "Smart POS",
  landingFeatPosBody:
    "Take walk-in and table payments with cash, card, or Terminal — clear totals every time.",
  landingFeatTablesTitle: "Table management",
  landingFeatTablesBody:
    "QR per table, live order status, and service requests without paper tickets.",
  landingFeatKitchenTitle: "Kitchen display",
  landingFeatKitchenBody:
    "Tickets appear the moment guests order — rush and VIP flags stay visible.",
  landingFeatOnlineTitle: "Online ordering",
  landingFeatOnlineBody:
    "Restaurant subdomains and walk-in links for guests on their own phones.",
  landingFeatReportsTitle: "Reports & insights",
  landingFeatReportsBody:
    "See what sold, what’s unpaid, and how the floor moved — without a spreadsheet.",
  landingFeatStaffTitle: "Staff & devices",
  landingFeatStaffBody:
    "Pair kitchen, waiter, and pickup screens with secure tokens from Admin.",
  landingHowEyebrow: "For guests",
  landingHowTitle: "Scan, order, enjoy",
  landingHowBody:
    "Restaurants on MayleSoft share a QR or link. Guests never need an app — just their phone browser.",
  landingHowTableTitle: "At the table",
  landingHowTableBody:
    "Scan the table QR, browse the menu, send dishes to the kitchen, and track the order live.",
  landingHowWalkInTitle: "Walk-in & pickup",
  landingHowWalkInBody:
    "Open the walk-in link, place an order, get a pickup number, and watch the TV board.",
  landingStoriesEyebrow: "Trusted by restaurants",
  landingStoriesTitle: "Built for Nordic hospitality.",
  landingStoriesBody:
    "From Helsinki cafés to busy dinner service — MayleSoft keeps floor, kitchen, and till on the same page.",
  landingStoriesRating: "Made for Finland · multi-language menus",
  landingQuote1:
    "Our guests order from the table and we stopped losing tickets between waiter and kitchen.",
  landingQuote1By: "Restaurant owner · Helsinki",
  landingQuote2:
    "Walk-in pickup with the TV board cut our lunch queue confusion in half.",
  landingQuote2By: "Café owner · Tampere",
  landingQuote3:
    "Finally one system for till, kitchen, and QR — not five different tools.",
  landingQuote3By: "Restaurant owner · Turku",
  landingFinalTitle: "Ready to grow your restaurant?",
  landingFinalBody: "Join MayleSoft and see the difference on the floor.",
  landingFinalNote: "No credit card required to start a conversation · Cancel anytime",
  tenantEyebrow: "Order online",
  tenantBody: "Choose a branch to browse the menu and place a walk-in order.",
  tenantBranches: "Branches",
  tenantNoBranches: "No branches are available yet. Please ask staff for a QR code.",
  tenantOrderHere: "Order",
  tenantNotFoundTitle: "Restaurant not found",
  tenantNotFoundBody:
    "This link does not match an active restaurant. Check the address or ask staff for a QR code.",
  openDemoTable: "Open demo table",
  walkIn: "Walk-in",
  pickupTv: "Pickup TV",
  allWalkInBranches: "All walk-in branches",
  language: "Language",
  currency: "Currency",
  loadingCart: "Loading cart…",
  loadingOrder: "Loading order…",
  loading: "Loading…",
  notePrefix: "Note:",
  yourOrders: "Your orders",
  noActiveOrders: "No active orders yet.",
  tableLabel: "Table {number}",
  customizeDish: "Customize this dish and add it to your order.",
  sending: "✓ Sending…",
  guestPlaceholder: "Guest",
  orderStatus: "Order status",
  allOrders: "All orders",
  current: "Current",
  somethingWentWrong: "Something went wrong",
  orderInProgress: "Order already in progress",
  assistanceNote: "Customer requested assistance",
  ourMenu: "Our Menu",
  addToCart: "Add to cart",
  viewCart: "View cart",
  orderSent: "Order sent!",
  orderSentBody: "The kitchen has your order and is getting started.",
  queueNumberLabel: "Your number",
  estimatedPrep: "Estimated preparation",
  estimatedPrepTime: "15–20 min",
  trackOrder: "Track order",
  proceedCheckout: "Proceed to checkout",
  pairDeviceTitle: "Pair this pickup TV",
  pairDeviceBody:
    "Paste a CUSTOMER_DISPLAY device token from Admin, or open the pairing QR URL.",
  deviceTokenLabel: "Device token",
  pairDevicePlaceholder: "Paste CUSTOMER_DISPLAY token",
  pairDeviceCta: "Open pickup board",
  pairing: "Pairing…",
  unpairDevice: "Unpair device",
  catShakes: "Shakes",
  catHotDrinks: "Hot drinks",
  catSoftDrinks: "Soft drinks",
  catDrinks: "Drinks",
  catDesserts: "Desserts",
  catSalads: "Salads",
  catStarters: "Starters",
  catMainDishes: "Main dishes",
  catMains: "Mains",
};

const fi: Messages = {
  authenticCuisine: "Aitoa keittiötä",
  welcome: "Tervetuloa!",
  welcomeBodyTable:
    "Selaa ruokalistaa ja lähetä tilauksesi suoraan keittiöön.",
  welcomeBodyWalkIn:
    "Selaa ruokalistaa, saat numeron ja seuraa näyttöä.",
  trackOrders: "Seuraa tilauksia",
  pickupBoard: "Noutotaulu",
  searchMenu: "Hae ruokalistasta…",
  allCategories: "Kaikki",
  comingSoon: "Tulossa pian!",
  noSearchResults: "Ei hakutuloksia.",
  noCategories: "Tulossa pian!",
  tapForDetails: "Napauta nähdäksesi",
  soldOut: "Loppu",
  itemUnavailable: "Tuote on loppu",
  customize: "Muokkaa",
  cart: "Kori",
  items: "tuotetta",
  item: "tuote",
  viewYourOrder: "Näytä tilauksesi",
  total: "Yhteensä",
  viewOrder: "Näytä tilaus",
  required: "Pakollinen",
  specialRequests: "Erityistoiveet",
  specialRequestsPlaceholder: "Ei sipulia, lisää kastiketta…",
  quantity: "Määrä",
  add: "Lisää",
  close: "Sulje",
  tableNotFound: "Pöytää ei löytynyt",
  invalidQr: "Virheellinen QR-koodi",
  loadingMenu: "Ladataan ruokalistaa…",
  callWaiter: "Kutsu tarjoilija",
  requestBill: "Pyydä lasku",
  waiterNotified: "Tarjoilijalle ilmoitettu",
  billRequested: "Lasku pyydetty",
  addedToCart: "Lisätty {qty}× {name}",
  selectOptions: "Valitse vähintään {min} vaihtoehto(a) ryhmälle {group}",
  cartTitle: "Kori",
  menu: "Ruokalista",
  emptyCartTitle: "Korisi on tyhjä",
  emptyCartBody: "Selaa ruokalistaa ja lisää jotain herkullista.",
  backToMenu: "Takaisin listalle",
  placeOrder: "Tilaa",
  confirmOrder: "Vahvista tilaus?",
  confirmOrderBody: "Lähetetäänkö tilaus keittiöön?",
  confirmOrderBodyWalkIn:
    "Luodaanko tilaus? Seuraavaksi maksat, sitten keittiö aloittaa.",
  cancel: "Peruuta",
  cancelOrder: "Peruuta tilaus",
  cancelOrderConfirm: "Perutaanko tämä tilaus? Se poistuu keittiöstä.",
  orderCancelled: "Tilaus peruttu",
  couldNotCancel: "Tilausta ei voitu perua",
  customerName: "Nimesi",
  customerNameOptional: "Nimi (valinnainen)",
  seat: "Paikka",
  seatAny: "Mikä tahansa",
  course: "Ruokalaji",
  courseAppetizer: "Alkuruoka",
  courseDrink: "Juoma",
  courseMain: "Pääruoka",
  courseDessert: "Jälkiruoka",
  courseOther: "Muu",
  rushOrder: "Kiire — priorisoi keittiö",
  vipGuest: "VIP-vieras",
  orderPlaced: "Tilaus tehty — keittiö sai sen",
  orderNumberPlaced: "Tilaus {number} tehty",
  orderAwaitingPayment:
    "Tilaus {number} luotu — maksa, niin keittiö saa sen",
  couldNotPlaceOrder: "Tilausta ei voitu tehdä",
  payNow: "Maksa nyt",
  payWithCard: "Maksa kortilla",
  payAtCounterHint: "Tai maksa tiskillä — keittiö aloittaa maksun jälkeen.",
  paymentSuccess: "Maksettu — keittiö sai tilauksesi",
  couldNotPay: "Maksu epäonnistui",
  statusPendingPayment: "Odottaa maksua",
  kitchenAfterPay: "Keittiö aloittaa valmistuksen maksun jälkeen.",
  yourOrder: "Tilauksesi",
  pickupNumber: "Noutonumero",
  orderMore: "Tilaa lisää",
  orderNotFound: "Tilausta ei löytynyt",
  statusReceived: "Vastaanotettu",
  statusAccepted: "Hyväksytty",
  statusPreparing: "Valmistellaan",
  statusReady: "Valmis",
  statusServed: "Tarjoiltu",
  statusCompleted: "Valmis",
  statusCancelled: "Peruttu",
  statusReadyPickup: "Valmis noudettavaksi",
  tvBoard: "TV-taulu",
  pickupBoardTitle: "Noutotaulu",
  preparingColumn: "Uusi / Valmistuu",
  preparingHint: "Keittiö valmistaa",
  readyColumn: "Valmis",
  readyHint: "Nouda tilauksesi",
  live: "Live",
  connected: "yhdistetty",
  polling: "päivittyy",
  homeEyebrow: "Asiakastilaus",
  homeTitle: "Pöytä tai walk-in",
  homeBody:
    "Käytä ravintolan QR-koodia tai linkkiä. Pöytäasiakkaat skannaavat pöytä-QR:n. Walk-in-asiakkaat käyttävät walk-in-linkkiä numerolle ja näytölle.",
  landingBrand: "MayleSoft",
  landingNavFeatures: "Ominaisuudet",
  landingNavProduct: "Tuote",
  landingNavHow: "Miten toimii",
  landingNavAbout: "Tarinoita",
  landingNavLogin: "Kirjaudu",
  landingNavDemo: "Varaa demo",
  landingHeroLine1: "Johda ravintolaasi.",
  landingHeroLine2: "Älä ohjelmistoasi.",
  landingHeroLead:
    "MayleSoft on kokonaisalusta tilauksille, pöydille, keittiölle ja walk-in-noutoon — tiimisi voi keskittyä vieraisiin.",
  landingCtaTrial: "Aloita ilmainen kokeilu",
  landingCtaWatch: "Katso tuote",
  landingTrustEasy: "Helppokäyttöinen",
  landingTrustAllInOne: "Kaikki yhdessä",
  landingTrustDevices: "Toimii kaikilla laitteilla",
  landingTrustSecure: "Turvallinen ja luotettava",
  landingProductEyebrow: "Kaikki yhdessä",
  landingProductTitle: "Kaikki mitä tarvitset ravintolan pyörittämiseen.",
  landingProductBullet1: "Nopea kassa ja maksut",
  landingProductBullet2: "Pöytä- ja salinhallinta",
  landingProductBullet3: "Keittiö- ja tarjoilijanäytöt synkassa",
  landingProductBullet4: "Vieras-QR ja nouto-TV",
  landingFeaturesTitle: "Vahvat ominaisuudet. Yksinkertainen käyttää.",
  landingFeatPosTitle: "Älykäs kassa",
  landingFeatPosBody:
    "Walk-in- ja pöytämaksut käteisellä, kortilla tai Terminalilla — selkeät summat.",
  landingFeatTablesTitle: "Pöytähallinta",
  landingFeatTablesBody:
    "QR per pöytä, live-tila ja palvelupyynnöt ilman paperilappuja.",
  landingFeatKitchenTitle: "Keittiönäyttö",
  landingFeatKitchenBody:
    "Liput ilmestyvät heti kun vieras tilaa — rush ja VIP näkyvät.",
  landingFeatOnlineTitle: "Verkkotilaus",
  landingFeatOnlineBody:
    "Ravintolan alidomainit ja walk-in-linkit vieraan omalla puhelimella.",
  landingFeatReportsTitle: "Raportit",
  landingFeatReportsBody:
    "Näe myynti, maksamattomat ja salin liike — ilman taulukkoa.",
  landingFeatStaffTitle: "Henkilöstö ja laitteet",
  landingFeatStaffBody:
    "Parita keittiö-, tarjoilija- ja noutoruudut turvallisilla tokeneilla.",
  landingHowEyebrow: "Vieraille",
  landingHowTitle: "Skannaa, tilaa, nauti",
  landingHowBody:
    "MayleSoft-ravintolat jakavat QR:n tai linkin. Vieras ei tarvitse sovellusta.",
  landingHowTableTitle: "Pöydässä",
  landingHowTableBody:
    "Skannaa pöytä-QR, selaa menua, lähetä annokset keittiöön ja seuraa tilausta.",
  landingHowWalkInTitle: "Walk-in ja nouto",
  landingHowWalkInBody:
    "Avaa walk-in-linkki, tilaa, saa numero ja seuraa TV-taulua.",
  landingStoriesEyebrow: "Ravintoloiden luottama",
  landingStoriesTitle: "Rakennettu pohjoismaiseen hospitalityyn.",
  landingStoriesBody:
    "Helsingin kahviloista illallisruuhkaan — MayleSoft pitää salin, keittiön ja kassan samalla sivulla.",
  landingStoriesRating: "Suomeen · monikieliset menut",
  landingQuote1:
    "Vieraat tilaavat pöydästä, emmekä enää hukkaa lippuja tarjoilijan ja keittiön välillä.",
  landingQuote1By: "Ravintoloitsija · Helsinki",
  landingQuote2:
    "Walk-in-nouto TV-taululla puolitti lounasruuhkan sekaannukset.",
  landingQuote2By: "Kahvilan omistaja · Tampere",
  landingQuote3:
    "Vihdoin yksi järjestelmä kassalle, keittiölle ja QR:lle — ei viittä eri työkalua.",
  landingQuote3By: "Ravintoloitsija · Turku",
  landingFinalTitle: "Valmis kasvattamaan ravintolaasi?",
  landingFinalBody: "Liity MayleSoftiin ja näe ero salissa.",
  landingFinalNote: "Ei korttia keskustelun aloittamiseen · Peru milloin tahansa",
  tenantEyebrow: "Tilaa verkossa",
  tenantBody: "Valitse toimipiste nähdäksesi menun ja tehdäksesi walk-in-tilauksen.",
  tenantBranches: "Toimipisteet",
  tenantNoBranches:
    "Ei toimipisteitä vielä. Pyydä henkilökunnalta QR-koodi.",
  tenantOrderHere: "Tilaa",
  tenantNotFoundTitle: "Ravintolaa ei löydy",
  tenantNotFoundBody:
    "Tämä osoite ei vastaa aktiivista ravintolaa. Tarkista linkki tai pyydä QR-koodi henkilökunnalta.",
  openDemoTable: "Avaa demopöytä",
  walkIn: "Walk-in",
  pickupTv: "Nouto-TV",
  allWalkInBranches: "Kaikki walk-in-toimipisteet",
  language: "Kieli",
  currency: "Valuutta",
  loadingCart: "Ladataan koria…",
  loadingOrder: "Ladataan tilausta…",
  loading: "Ladataan…",
  notePrefix: "Huom:",
  yourOrders: "Tilauksesi",
  noActiveOrders: "Ei aktiivisia tilauksia.",
  tableLabel: "Pöytä {number}",
  customizeDish: "Muokkaa annosta ja lisää tilaukseen.",
  sending: "✓ Lähetetään…",
  guestPlaceholder: "Vieras",
  orderStatus: "Tilauksen tila",
  allOrders: "Kaikki tilaukset",
  current: "Nyt",
  somethingWentWrong: "Jotain meni pieleen",
  orderInProgress: "Tilaus on jo käynnissä",
  assistanceNote: "Asiakas pyysi apua",
  ourMenu: "Ruokalista",
  addToCart: "Lisää koriin",
  viewCart: "Näytä kori",
  orderSent: "Tilaus lähetetty!",
  orderSentBody: "Keittiö vastaanotti tilauksesi ja aloittaa valmistuksen.",
  queueNumberLabel: "Numerosi",
  estimatedPrep: "Arvioitu valmistusaika",
  estimatedPrepTime: "15–20 min",
  trackOrder: "Seuraa tilausta",
  proceedCheckout: "Siirry kassalle",
  pairDeviceTitle: "Yhdistä noutotaulu",
  pairDeviceBody:
    "Liitä CUSTOMER_DISPLAY-laiteavain Administa tai avaa QR-parin URL.",
  deviceTokenLabel: "Laiteavain",
  pairDevicePlaceholder: "Liitä CUSTOMER_DISPLAY-avain",
  pairDeviceCta: "Avaa noutotaulu",
  pairing: "Yhdistetään…",
  unpairDevice: "Poista laitepari",
  catShakes: "Pirtelöt",
  catHotDrinks: "Kuumat juomat",
  catSoftDrinks: "Virvoitusjuomat",
  catDrinks: "Juomat",
  catDesserts: "Jälkiruoat",
  catSalads: "Salaatit",
  catStarters: "Alkuruuat",
  catMainDishes: "Pääruoat",
  catMains: "Pääruoat",
};

const ar: Messages = {
  authenticCuisine: "مأكولات أصيلة",
  welcome: "أهلاً بكم!",
  welcomeBodyTable: "تصفّح القائمة وأرسل طلبك مباشرة إلى المطبخ.",
  welcomeBodyWalkIn: "تصفّح القائمة، احصل على رقم، وتابع اللوحة.",
  trackOrders: "تتبع الطلبات",
  pickupBoard: "لوحة الاستلام",
  searchMenu: "ابحث في القائمة…",
  allCategories: "الكل",
  comingSoon: "قريباً!",
  noSearchResults: "لا توجد أطباق مطابقة.",
  noCategories: "قريباً!",
  tapForDetails: "اضغط للتفاصيل",
  soldOut: "نفد",
  itemUnavailable: "هذا الصنف غير متوفر",
  customize: "تخصيص",
  cart: "السلة",
  items: "أصناف",
  item: "صنف",
  viewYourOrder: "عرض طلبك",
  total: "الإجمالي",
  viewOrder: "عرض الطلب",
  required: "مطلوب",
  specialRequests: "طلبات خاصة",
  specialRequestsPlaceholder: "بدون بصل، صلصة إضافية…",
  quantity: "الكمية",
  add: "أضف",
  close: "إغلاق",
  tableNotFound: "الطاولة غير موجودة",
  invalidQr: "رمز QR غير صالح",
  loadingMenu: "جاري تحميل القائمة…",
  callWaiter: "استدعاء النادل",
  requestBill: "طلب الفاتورة",
  waiterNotified: "تم إخطار النادل",
  billRequested: "تم طلب الفاتورة",
  addedToCart: "تمت إضافة {qty}× {name}",
  selectOptions: "يرجى اختيار {min} خيار على الأقل لـ {group}",
  cartTitle: "السلة",
  menu: "القائمة",
  emptyCartTitle: "سلتك فارغة",
  emptyCartBody: "تصفّح القائمة لإضافة شيء لذيذ.",
  backToMenu: "العودة للقائمة",
  placeOrder: "إرسال الطلب",
  confirmOrder: "تأكيد الطلب؟",
  confirmOrderBody: "إرسال هذا الطلب إلى المطبخ؟",
  confirmOrderBodyWalkIn: "إنشاء الطلب؟ ستدفع بعد ذلك ثم يبدأ المطبخ.",
  cancel: "إلغاء",
  cancelOrder: "إلغاء الطلب",
  cancelOrderConfirm: "هل تريد إلغاء هذا الطلب؟ سيُزال من المطبخ.",
  orderCancelled: "تم إلغاء الطلب",
  couldNotCancel: "تعذر إلغاء الطلب",
  customerName: "اسمك",
  customerNameOptional: "الاسم (اختياري)",
  seat: "مقعد",
  seatAny: "أي",
  course: "طبق",
  courseAppetizer: "مقبلات",
  courseDrink: "مشروب",
  courseMain: "رئيسي",
  courseDessert: "حلوى",
  courseOther: "أخرى",
  rushOrder: "مستعجل — أولوية المطبخ",
  vipGuest: "ضيف مميز",
  orderPlaced: "تم الطلب — المطبخ يعمل عليه",
  orderNumberPlaced: "تم طلب رقم {number}",
  orderAwaitingPayment: "تم إنشاء الطلب {number} — ادفع لإرساله للمطبخ",
  couldNotPlaceOrder: "تعذر إرسال الطلب",
  payNow: "ادفع الآن",
  payWithCard: "ادفع بالبطاقة",
  payAtCounterHint: "أو ادفع عند الكاشير — المطبخ يبدأ بعد الدفع.",
  paymentSuccess: "تم الدفع — المطبخ استلم طلبك",
  couldNotPay: "فشل الدفع",
  statusPendingPayment: "بانتظار الدفع",
  kitchenAfterPay: "يبدأ المطبخ بعد الدفع.",
  yourOrder: "طلبك",
  pickupNumber: "رقم الاستلام",
  orderMore: "اطلب المزيد",
  orderNotFound: "الطلب غير موجود",
  statusReceived: "تم الاستلام",
  statusAccepted: "مقبول",
  statusPreparing: "قيد التحضير",
  statusReady: "جاهز",
  statusServed: "تم التقديم",
  statusCompleted: "مكتمل",
  statusCancelled: "ملغى",
  statusReadyPickup: "جاهز للاستلام",
  tvBoard: "لوحة الشاشة",
  pickupBoardTitle: "لوحة الاستلام",
  preparingColumn: "جديد / قيد التحضير",
  preparingHint: "المطبخ يعمل عليه",
  readyColumn: "جاهز",
  readyHint: "يرجى الاستلام",
  live: "مباشر",
  connected: "متصل",
  polling: "تحديث",
  homeEyebrow: "طلب العميل",
  homeTitle: "طاولة أو وقوف",
  homeBody:
    "استخدم رمز QR أو الرابط من المطعم. الجلوس عبر رمز طاولة. الوقوف عبر رابط الطلب لرقم الشاشة.",
  landingBrand: "MayleSoft",
  landingNavFeatures: "الميزات",
  landingNavProduct: "المنتج",
  landingNavHow: "كيف يعمل",
  landingNavAbout: "قصص",
  landingNavLogin: "تسجيل الدخول",
  landingNavDemo: "احجز عرضاً",
  landingHeroLine1: "أدِر مطعمك.",
  landingHeroLine2: "لا برنامجك.",
  landingHeroLead:
    "MayleSoft منصة متكاملة للطلبات والطاولات والمطبخ والاستلام — ليركّز فريقك على الضيوف.",
  landingCtaTrial: "ابدأ تجربة مجانية",
  landingCtaWatch: "شاهد المنتج",
  landingTrustEasy: "سهل الاستخدام",
  landingTrustAllInOne: "كل شيء في مكان واحد",
  landingTrustDevices: "يعمل على أي جهاز",
  landingTrustSecure: "آمن وموثوق",
  landingProductEyebrow: "كل شيء معاً",
  landingProductTitle: "كل ما تحتاجه لإدارة مطعمك.",
  landingProductBullet1: "صندوق سريع ومدفوعات واضحة",
  landingProductBullet2: "إدارة الطاولات والصالة",
  landingProductBullet3: "شاشات المطبخ والنادل متزامنة",
  landingProductBullet4: "طلب عبر QR ولوحة الاستلام",
  landingFeaturesTitle: "ميزات قوية. استخدام بسيط.",
  landingFeatPosTitle: "نقطة بيع ذكية",
  landingFeatPosBody:
    "ادفع طلبات الوقوف والطاولات نقداً أو بطاقة أو Terminal.",
  landingFeatTablesTitle: "إدارة الطاولات",
  landingFeatTablesBody:
    "رمز لكل طاولة، حالة مباشرة، وطلبات خدمة بلا ورق.",
  landingFeatKitchenTitle: "شاشة المطبخ",
  landingFeatKitchenBody:
    "تظهر التذاكر فور طلب الضيف — مع علامات الاستعجال وVIP.",
  landingFeatOnlineTitle: "طلب عبر الإنترنت",
  landingFeatOnlineBody:
    "نطاقات فرعية للمطاعم وروابط وقوف على هاتف الضيف.",
  landingFeatReportsTitle: "تقارير ورؤى",
  landingFeatReportsBody:
    "اعرف ما بيع وما لم يُدفع دون جداول معقدة.",
  landingFeatStaffTitle: "الموظفون والأجهزة",
  landingFeatStaffBody:
    "اربط شاشات المطبخ والنادل والاستلام برموز آمنة من لوحة الإدارة.",
  landingHowEyebrow: "للضيوف",
  landingHowTitle: "امسح، اطلب، استمتع",
  landingHowBody:
    "مطاعم MayleSoft تشارك رمزاً أو رابطاً. لا حاجة لتطبيق.",
  landingHowTableTitle: "على الطاولة",
  landingHowTableBody:
    "امسح رمز الطاولة، تصفح القائمة، أرسل للمطبخ، وتابع الطلب.",
  landingHowWalkInTitle: "وقوف واستلام",
  landingHowWalkInBody:
    "افتح رابط الوقوف، اطلب، احصل على رقم، وتابع الشاشة.",
  landingStoriesEyebrow: "موثوق من المطاعم",
  landingStoriesTitle: "مبني لضيافة الشمال.",
  landingStoriesBody:
    "من مقاهي هلسنكي إلى خدمة العشاء — MayleSoft يوحّد الصالة والمطبخ والصندوق.",
  landingStoriesRating: "مخصص لفنلندا · قوائم متعددة اللغات",
  landingQuote1:
    "ضيوفنا يطلبون من الطاولة وتوقفنا عن ضياع التذاكر بين النادل والمطبخ.",
  landingQuote1By: "صاحب مطعم · هلسنكي",
  landingQuote2:
    "الاستلام مع لوحة التلفاز قلّل فوضى طابور الغداء للنصف.",
  landingQuote2By: "صاحبة مقهى · تامبيري",
  landingQuote3:
    "أخيراً نظام واحد للصندوق والمطبخ وQR — لا خمسة أدوات.",
  landingQuote3By: "صاحب مطعم · توركو",
  landingFinalTitle: "جاهز لتنمية مطعمك؟",
  landingFinalBody: "انضم إلى MayleSoft وشاهد الفرق في الصالة.",
  landingFinalNote: "لا بطاقة لبدء الحديث · ألغِ في أي وقت",
  tenantEyebrow: "اطلب عبر الإنترنت",
  tenantBody: "اختر فرعاً لتصفح القائمة وتقديم طلب وقوف.",
  tenantBranches: "الفروع",
  tenantNoBranches: "لا توجد فروع بعد. اطلب رمز QR من الموظفين.",
  tenantOrderHere: "اطلب",
  tenantNotFoundTitle: "المطعم غير موجود",
  tenantNotFoundBody:
    "هذا الرابط لا يطابق مطعماً نشطاً. تحقق من العنوان أو اطلب رمز QR من الموظفين.",
  openDemoTable: "فتح طاولة تجريبية",
  walkIn: "وقوف",
  pickupTv: "شاشة الاستلام",
  allWalkInBranches: "كل فروع الوقوف",
  language: "اللغة",
  currency: "العملة",
  loadingCart: "جاري تحميل السلة…",
  loadingOrder: "جاري تحميل الطلب…",
  loading: "جاري التحميل…",
  notePrefix: "ملاحظة:",
  yourOrders: "طلباتك",
  noActiveOrders: "لا توجد طلبات نشطة بعد.",
  tableLabel: "طاولة {number}",
  customizeDish: "خصّص هذا الطبق وأضفه إلى طلبك.",
  sending: "✓ جاري الإرسال…",
  guestPlaceholder: "ضيف",
  orderStatus: "حالة الطلب",
  allOrders: "كل الطلبات",
  current: "الحالية",
  somethingWentWrong: "حدث خطأ ما",
  orderInProgress: "الطلب قيد الإرسال بالفعل",
  assistanceNote: "طلب العميل المساعدة",
  ourMenu: "قائمتنا",
  addToCart: "أضف إلى السلة",
  viewCart: "عرض السلة",
  orderSent: "تم إرسال الطلب!",
  orderSentBody: "المطبخ استلم طلبك وبدأ التحضير.",
  queueNumberLabel: "رقمك",
  estimatedPrep: "الوقت المتوقع",
  estimatedPrepTime: "١٥–٢٠ دقيقة",
  trackOrder: "تتبع الطلب",
  proceedCheckout: "المتابعة للدفع",
  pairDeviceTitle: "اربط شاشة الاستلام",
  pairDeviceBody:
    "الصق رمز جهاز CUSTOMER_DISPLAY من لوحة الإدارة أو افتح رابط رمز QR.",
  deviceTokenLabel: "رمز الجهاز",
  pairDevicePlaceholder: "الصق رمز CUSTOMER_DISPLAY",
  pairDeviceCta: "افتح لوحة الاستلام",
  pairing: "جاري الربط…",
  unpairDevice: "إلغاء ربط الجهاز",
  catShakes: "ميلك شيك",
  catHotDrinks: "مشروبات ساخنة",
  catSoftDrinks: "مشروبات غازية",
  catDrinks: "مشروبات",
  catDesserts: "حلويات",
  catSalads: "سلطات",
  catStarters: "مقبلات",
  catMainDishes: "أطباق رئيسية",
  catMains: "أطباق رئيسية",
};

const so: Messages = {
  authenticCuisine: "Cunto dhaqameed",
  welcome: "Soo dhawoow!",
  welcomeBodyTable:
    "Baadh liiska cuntada oo u dir dalabkaaga jikada.",
  welcomeBodyWalkIn:
    "Baadh liiska, hel lambarka, oo daawo board-ka.",
  trackOrders: "La soco dalabka",
  pickupBoard: "Board-ka qaadista",
  searchMenu: "Raadi liiska…",
  allCategories: "Dhammaan",
  comingSoon: "Dhawaan!",
  noSearchResults: "Cunto kuma jirto raadintaada.",
  noCategories: "Dhawaan!",
  tapForDetails: "Taabo faahfaahinta",
  soldOut: "Waa dhammaaday",
  itemUnavailable: "Cuntadan waa la dhammeeyay",
  customize: "Habee",
  cart: "Shandad",
  items: "alaab",
  item: "shay",
  viewYourOrder: "Eeg dalabkaaga",
  total: "Wadarta",
  viewOrder: "Eeg dalabka",
  required: "Loo baahan yahay",
  specialRequests: "Codsiyo gaar ah",
  specialRequestsPlaceholder: "Basal la'aan, sauce dheeraad…",
  quantity: "Tirada",
  add: "Kudar",
  close: "Xir",
  tableNotFound: "Miiska lama helin",
  invalidQr: "QR code khaldan",
  loadingMenu: "Liiska waa la soo rarayaa…",
  callWaiter: "U yeer adeegaha",
  requestBill: "Codso biilka",
  waiterNotified: "Adeegaha waa la ogeysiiyay",
  billRequested: "Biilka waa la codsaday",
  addedToCart: "Waxaa lagu daray {qty}× {name}",
  selectOptions: "Fadlan dooro ugu yaraan {min} doorasho {group}",
  cartTitle: "Shandad",
  menu: "Liiska",
  emptyCartTitle: "Shandaddaadu waa madhan",
  emptyCartBody: "Baadh liiska oo ku dar wax macaan.",
  backToMenu: "Ku noqo liiska",
  placeOrder: "Dir dalabka",
  confirmOrder: "Xaqiiji dalabka?",
  confirmOrderBody: "Dalabkan ma u dirnaa jikada?",
  confirmOrderBodyWalkIn:
    "Dalabkan ma la sameeyaa? Marka xigta ayaad bixinaysaa, ka dib jikadu way bilowdaa.",
  cancel: "Jooji",
  cancelOrder: "Jooji dalabka",
  cancelOrderConfirm: "Ma joojinaysaa dalabkan? Waa laga saarayaa jikada.",
  orderCancelled: "Dalabka waa la joojiyay",
  couldNotCancel: "Dalabka lama joojin karin",
  customerName: "Magacaaga",
  customerNameOptional: "Magaca (ikhtiyaari)",
  seat: "Kursi",
  seatAny: "Kasta",
  course: "Koors",
  courseAppetizer: "Bilow",
  courseDrink: "Cabitaan",
  courseMain: "Weeyn",
  courseDessert: "Macmacaan",
  courseOther: "Kale",
  rushOrder: "Degdeg — mudnaanta jikada",
  vipGuest: "Marti VIP",
  orderPlaced: "Dalabka waa la diray — jikadu waa shaqaynaysaa",
  orderNumberPlaced: "Dalabka {number} waa la diray",
  orderAwaitingPayment:
    "Dalabka {number} waa la sameeyay — bixi si jikadu u hesho",
  couldNotPlaceOrder: "Dalabka lama diri karin",
  payNow: "Hadda bixi",
  payWithCard: "Ku bixi kaarka",
  payAtCounterHint: "Ama miiska ka bixi — jikadu waxay bilowdaa lacag-bixinta ka dib.",
  paymentSuccess: "Waa la bixiyay — jikadu way heshay",
  couldNotPay: "Lacag-bixintu waa fashilantay",
  statusPendingPayment: "Sugaya lacag-bixin",
  kitchenAfterPay: "Jikadu waxay bilowdaa karinta lacag-bixinta ka dib.",
  yourOrder: "Dalabkaaga",
  pickupNumber: "Lambarka qaadista",
  orderMore: "Dalbo wax kale",
  orderNotFound: "Dalabka lama helin",
  statusReceived: "La helay",
  statusAccepted: "La aqbalay",
  statusPreparing: "Waa la diyaarinayaa",
  statusReady: "Diyaar",
  statusServed: "La geeyay",
  statusCompleted: "Dhammaaday",
  statusCancelled: "La joojiyay",
  statusReadyPickup: "Diyaar in la qaato",
  tvBoard: "TV board",
  pickupBoardTitle: "Board-ka qaadista",
  preparingColumn: "Cusub / Diyaarin",
  preparingHint: "Jikadu waa shaqaynaysaa",
  readyColumn: "Diyaar",
  readyHint: "Fadlan soo qaado",
  live: "Toos",
  connected: "ku xiran",
  polling: "cusbooneysiin",
  homeEyebrow: "Dalabka macaamiisha",
  homeTitle: "Miis ama walk-in",
  homeBody:
    "Isticmaal QR ama link-ga makhaayadda. Martida miiska waxay scan-gareeyaan QR-ka miiska. Walk-in waxay isticmaalaan link-ga si ay u helaan lambar iyo TV-ga.",
  landingBrand: "MayleSoft",
  landingNavFeatures: "Astaamaha",
  landingNavProduct: "Alaabta",
  landingNavHow: "Sida u shaqeeyso",
  landingNavAbout: "Sheekooyin",
  landingNavLogin: "Gal",
  landingNavDemo: "Ballan demo",
  landingHeroLine1: "Maamul makhaayaddaada.",
  landingHeroLine2: "Ma aha software-kaaga.",
  landingHeroLead:
    "MayleSoft waa platform dhammaystiran oo loogu talagalay dalabyada, miisaska, jikada, iyo walk-in qaadista — si kooxdaadu ugu diiradda geliso martida.",
  landingCtaTrial: "Bilow tijaabo bilaash ah",
  landingCtaWatch: "Arag alaabta",
  landingTrustEasy: "Fudud in la isticmaalo",
  landingTrustAllInOne: "Dhammaan mid",
  landingTrustDevices: "Ku shaqeeya aalad kasta",
  landingTrustSecure: "Ammaan & la isku halleyn karo",
  landingProductEyebrow: "Dhammaan mid",
  landingProductTitle: "Wax kasta oo aad u baahan tahay inaad ku maamusho makhaayadda.",
  landingProductBullet1: "Khasnadda degdeg ah iyo lacag-bixinta",
  landingProductBullet2: "Maamulka miisaska iyo dabaqa",
  landingProductBullet3: "Shaashadaha jikada iyo waiter-ka oo iswaafaqsan",
  landingProductBullet4: "Dalabka QR ee martida iyo TV qaadista",
  landingFeaturesTitle: "Astaamo xooggan. Isticmaal fudud.",
  landingFeatPosTitle: "POS caqli leh",
  landingFeatPosBody:
    "Lacag-bixin walk-in iyo miis — cash, card, ama Terminal.",
  landingFeatTablesTitle: "Maamulka miisaska",
  landingFeatTablesBody:
    "QR miis kasta, xaalad toos ah, iyo codsiyo adeeg oo aan waraaq lahayn.",
  landingFeatKitchenTitle: "Shaashadda jikada",
  landingFeatKitchenBody:
    "Tigidhada waxay soo baxaan marka martidu dalbato — rush iyo VIP waa muuqdaan.",
  landingFeatOnlineTitle: "Dalab online",
  landingFeatOnlineBody:
    "Subdomain-yada makhaayadaha iyo link-yada walk-in ee telefoonka martida.",
  landingFeatReportsTitle: "Warbixinno",
  landingFeatReportsBody:
    "Arag waxa la iibiyay iyo waxa aan la bixin — spreadsheet la'aan.",
  landingFeatStaffTitle: "Shaqaalaha & aaladaha",
  landingFeatStaffBody:
    "Isku xidh shaashadaha jikada, waiter-ka, iyo qaadista token-yo ammaan ah.",
  landingHowEyebrow: "Martida",
  landingHowTitle: "Scan-garee, dalbo, ku raaxayso",
  landingHowBody:
    "Makhaayadaha MayleSoft waxay wadaagaan QR ama link. Uma baahnid app.",
  landingHowTableTitle: "Miiska",
  landingHowTableBody:
    "Scan-garee QR-ka miiska, fiiri menu-ga, u dir jikada, oo raac dalabka.",
  landingHowWalkInTitle: "Walk-in & qaadis",
  landingHowWalkInBody:
    "Fur link-ga walk-in, dalbo, hel lambar, oo daawo TV-ga.",
  landingStoriesEyebrow: "Makhaayadaha ayaa aaminay",
  landingStoriesTitle: "Loogu talagalay martigelinta Waqooyiga.",
  landingStoriesBody:
    "Laga bilaabo makhaayadaha Helsinki ilaa cashada fiidkii — MayleSoft wuxuu midaynayaa dabaqa, jikada, iyo khasnadda.",
  landingStoriesRating: "Loogu talagalay Finland · menu luqado badan",
  landingQuote1:
    "Martidayadu waxay ka dalbadaan miiska, waxaanana joojinay luminta tigidhada waiter iyo jiko.",
  landingQuote1By: "Mulkiilaha makhaayadda · Helsinki",
  landingQuote2:
    "Walk-in qaadis TV-ga ayaa kala badhay jahawareerka safka qadada.",
  landingQuote2By: "Mulkiilaha cafega · Tampere",
  landingQuote3:
    "Ugu dambayntii nidaam keliya khasnadda, jikada, iyo QR — ma aha shan qalab.",
  landingQuote3By: "Mulkiilaha makhaayadda · Turku",
  landingFinalTitle: "Diyaar ma u tahay inaad kor u qaaddo makhaayaddaada?",
  landingFinalBody: "Ku biir MayleSoft oo arag farqiga dabaqa.",
  landingFinalNote: "Kaarka looma baahna bilowga wadahadalka · Jooji markaad doonto",
  tenantEyebrow: "Dalbo online",
  tenantBody: "Dooro laanta si aad u aragto menu-ga oo aad u sameyso dalab walk-in.",
  tenantBranches: "Laamaha",
  tenantNoBranches: "Weli ma jiraan laamo. Weydii shaqaalaha QR.",
  tenantOrderHere: "Dalbo",
  tenantNotFoundTitle: "Makhaayadda lama helin",
  tenantNotFoundBody:
    "Link-gani ma waafaqsana makhaayad firfircoon. Hubi cinwaanka ama weydii shaqaalaha QR.",
  openDemoTable: "Fur miiska tijaabada",
  walkIn: "Walk-in",
  pickupTv: "TV qaadista",
  allWalkInBranches: "Dhammaan laamaha walk-in",
  language: "Luqadda",
  currency: "Lacagta",
  loadingCart: "Shandadda waa la soo rarayaa…",
  loadingOrder: "Dalabka waa la soo rarayaa…",
  loading: "Waa la soo rarayaa…",
  notePrefix: "Xusuusin:",
  yourOrders: "Dalabyadaada",
  noActiveOrders: "Weli ma jiraan dalabyo firfircoon.",
  tableLabel: "Miiska {number}",
  customizeDish: "Habee cuntadan oo ku dar dalabkaaga.",
  sending: "✓ Waa la dirayaa…",
  guestPlaceholder: "Marti",
  orderStatus: "Xaaladda dalabka",
  allOrders: "Dhammaan dalabyada",
  current: "Hadda",
  somethingWentWrong: "Wax baa khaldamay",
  orderInProgress: "Dalabku wuu socdaa",
  assistanceNote: "Macmiilku wuxuu codsaday caawimo",
  ourMenu: "Liiskeenna",
  addToCart: "Ku dar shandadda",
  viewCart: "Eeg shandadda",
  orderSent: "Dalabka waa la diray!",
  orderSentBody: "Jikadu way heshay dalabkaaga oo way bilowday.",
  queueNumberLabel: "Lambarkaaga",
  estimatedPrep: "Waqtiga qiyaasta",
  estimatedPrepTime: "15–20 daqiiqo",
  trackOrder: "La soco dalabka",
  proceedCheckout: "Sii wad checkout",
  pairDeviceTitle: "Isku xidh TV-ga qaadista",
  pairDeviceBody:
    "Ku dheji token-ka CUSTOMER_DISPLAY ee Admin, ama fur URL-ka QR.",
  deviceTokenLabel: "Token-ka qalabka",
  pairDevicePlaceholder: "Ku dheji token-ka CUSTOMER_DISPLAY",
  pairDeviceCta: "Fur board-ka qaadista",
  pairing: "Waa la isku xidhayaa…",
  unpairDevice: "Ka fur qalabka",
  catShakes: "Shakes",
  catHotDrinks: "Cabitaan kulul",
  catSoftDrinks: "Cabitaan qabow",
  catDrinks: "Cabitaan",
  catDesserts: "Macmacaan",
  catSalads: "Salad",
  catStarters: "Bilow",
  catMainDishes: "Cuntooyinka waaweyn",
  catMains: "Cuntooyinka waaweyn",
};

export const MESSAGES: Record<Locale, Messages> = { en, fi, ar, so };

export function translate(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string | number>,
): string {
  let text = MESSAGES[locale][key] ?? MESSAGES.en[key] ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}
