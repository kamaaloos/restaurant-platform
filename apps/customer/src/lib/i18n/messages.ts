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
  | "tablePinTitle"
  | "tablePinBody"
  | "tablePinLabel"
  | "tablePinSubmit"
  | "tablePinInvalid"
  | "tablePinNotConfiguredTitle"
  | "tablePinNotConfiguredBody"
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
  | "landingCtaTrialSub"
  | "landingCtaDemo"
  | "landingCtaDemoSub"
  | "landingStat1Value"
  | "landingStat1Label"
  | "landingStat2Value"
  | "landingStat2Label"
  | "landingStat3Value"
  | "landingStat3Label"
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
  | "tenantScanHint"
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
  | "catMains"
  | "hubContact"
  | "hubContactUs"
  | "hubExploreProducts"
  | "hubGetStarted"
  | "hubHeroEyebrow"
  | "hubHeroTitleBefore"
  | "hubHeroTitleAfter"
  | "hubHeroWordRestaurants"
  | "hubHeroWordSchools"
  | "hubHeroWordHealthcare"
  | "hubHeroWordRetail"
  | "hubHeroLead"
  | "hubHeroPills"
  | "hubWhyTitle"
  | "hubFeatFast"
  | "hubFeatSecure"
  | "hubFeatMobile"
  | "hubFeatLanguage"
  | "hubFeatCloud"
  | "hubFeatAnalytics"
  | "hubProductsEyebrow"
  | "hubProductsTitle"
  | "hubProductRestaurant"
  | "hubProductDugsi"
  | "hubProductRetail"
  | "hubProductClinic"
  | "hubFeatureQr"
  | "hubFeatureKds"
  | "hubFeaturePos"
  | "hubFeatureWaiter"
  | "hubFeatureTables"
  | "hubFeaturePickup"
  | "hubFeatureStudents"
  | "hubFeatureTeachers"
  | "hubFeatureAttendance"
  | "hubFeatureExams"
  | "hubFeatureFinance"
  | "hubFeatureReports"
  | "hubFeatureRetailPos"
  | "hubFeatureRetailInventory"
  | "hubFeatureRetailOffline"
  | "hubFeatureRetailStaff"
  | "hubFeatureRetailReports"
  | "hubFeatureRetailWindows"
  | "hubFeatureClinicFlow"
  | "hubFeatureClinicRecords"
  | "hubFeatureClinicBilling"
  | "hubFeatureClinicLab"
  | "hubFeatureClinicPharmacy"
  | "hubFeatureClinicRoles"
  | "hubCtaRestaurant"
  | "hubCtaDugsi"
  | "hubCtaRetail"
  | "hubCtaClinic"
  | "hubEcosystemTitle"
  | "hubAvailableToday"
  | "hubComingSoon"
  | "hubSoonClinic"
  | "hubSoonRetail"
  | "hubSoonLogistics"
  | "hubSoonHr"
  | "hubTrustedEyebrow"
  | "hubStatBusinesses"
  | "hubStatUsers"
  | "hubStatUptime"
  | "hubStatSupport"
  | "hubScreensTitle"
  | "hubScreensBody"
  | "hubRestaurantDash"
  | "hubDugsiDash"
  | "hubRetailDash"
  | "hubClinicDash"
  | "hubMockToday"
  | "hubMockLiveFloor"
  | "hubMockOpenOrders"
  | "hubMockTables"
  | "hubMockKitchenWait"
  | "hubMockRevenue"
  | "hubMockDashboard"
  | "hubMockOrders"
  | "hubMockMenu"
  | "hubMockSpring"
  | "hubMockStudents"
  | "hubMockEnrolled"
  | "hubMockAttendance"
  | "hubMockRetailPos"
  | "hubMockRetailProducts"
  | "hubMockRetailStock"
  | "hubMockRetailOverview"
  | "hubMockRetailSales"
  | "hubMockRetailTx"
  | "hubMockRetailProfit"
  | "hubMockRetailLowStock"
  | "hubMockClinicPatients"
  | "hubMockClinicQueue"
  | "hubMockClinicLab"
  | "hubMockClinicBilling"
  | "hubMockClinicOverview"
  | "hubMockClinicVisits"
  | "hubMockClinicWaiting"
  | "hubMockClinicLabs"
  | "hubMockClinicRevenue"
  | "hubCtaTitle"
  | "hubCtaBody"
  | "hubFooterBlurb"
  | "hubFooterProducts"
  | "hubFooterCompany"
  | "hubFooterAbout"
  | "hubFooterAboutBody"
  | "hubFooterPrivacy"
  | "hubFooterPrivacyBody"
  | "hubFooterTerms"
  | "hubFooterTermsBody"
  | "hubFooterCredit"
  | "retailBrand"
  | "retailContact"
  | "retailEyebrow"
  | "retailTitle"
  | "retailLead"
  | "retailCtaPrimary"
  | "retailCtaSecondary"
  | "retailPlatformNote"
  | "retailFeaturesEyebrow"
  | "retailFeaturesTitle"
  | "retailFeatOfflineTitle"
  | "retailFeatOfflineBody"
  | "retailFeatPosTitle"
  | "retailFeatPosBody"
  | "retailFeatInventoryTitle"
  | "retailFeatInventoryBody"
  | "retailFeatStaffTitle"
  | "retailFeatStaffBody"
  | "retailFeatReportsTitle"
  | "retailFeatReportsBody"
  | "retailFeatLocalTitle"
  | "retailFeatLocalBody"
  | "retailFinalTitle"
  | "retailFinalBody"
  | "retailFooterCredit"
  | "retailMockSell"
  | "retailMockProducts"
  | "retailMockStock"
  | "retailMockStaff"
  | "retailMockReports"
  | "retailMockRegister"
  | "retailMockCheckout"
  | "retailMockItem1"
  | "retailMockItem2"
  | "retailMockItem3"
  | "retailMockTotal"
  | "retailMockPay"
  | "retailDownloadEyebrow"
  | "retailDownloadTitle"
  | "retailDownloadBody"
  | "retailDownloadCta"
  | "retailDownloadVersion"
  | "retailDownloadPlatform"
  | "retailDownloadLoading"
  | "retailDownloadUnavailable"
  | "retailDownloadFeed"
  | "retailScreensEyebrow"
  | "retailScreensTitle"
  | "retailScreensBody"
  | "retailScreenDashboard"
  | "retailScreenCategories";

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
  tablePinTitle: "Enter table PIN",
  tablePinBody: "Find the PIN on your table card to start ordering. You only need to enter it once per day.",
  tablePinLabel: "Table PIN",
  tablePinSubmit: "Continue",
  tablePinInvalid: "Incorrect PIN. Check the number on your table card.",
  tablePinNotConfiguredTitle: "Ordering not ready",
  tablePinNotConfiguredBody: "This table is not set up for ordering yet. Please ask staff for help.",
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
    "When the dining room is full and the kitchen is moving, MayleSoft keeps every table, order, and payment under control.",
  landingCtaTrial: "Start free trial",
  landingCtaTrialSub: "No credit card required",
  landingCtaDemo: "Book a live demo",
  landingCtaDemoSub: "30 minutes",
  landingStat1Value: "40%",
  landingStat1Label: "Less order mistakes",
  landingStat2Value: "2×",
  landingStat2Label: "Faster table turnover",
  landingStat3Value: "24/7",
  landingStat3Label: "Cloud platform",
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
  tenantEyebrow: "Our locations",
  tenantBody:
    "Visit a location and scan the table or walk-in QR in the restaurant to order.",
  tenantBranches: "Branches",
  tenantNoBranches: "No branches are available yet. Please ask staff for a QR code.",
  tenantScanHint:
    "Ordering links live on printed QR codes only. They expire, and staff can rotate them from Admin.",
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
  hubContact: "Contact",
  hubContactUs: "Contact us",
  hubExploreProducts: "Explore products",
  hubGetStarted: "Get started",
  hubHeroEyebrow: "One platform. Multiple businesses.",
  hubHeroTitleBefore: "Build smarter",
  hubHeroTitleAfter: "with modern software.",
  hubHeroWordRestaurants: "restaurants",
  hubHeroWordSchools: "schools",
  hubHeroWordHealthcare: "clinics",
  hubHeroWordRetail: "stores",
  hubHeroLead:
    "Modern cloud software for restaurants, schools, healthcare, retail, and growing organizations.",
  hubHeroPills: "Restaurant POS · School management · More coming",
  hubWhyTitle: "Why MayleSoft?",
  hubFeatFast: "Fast cloud platform",
  hubFeatSecure: "Secure",
  hubFeatMobile: "Mobile friendly",
  hubFeatLanguage: "Multi-language",
  hubFeatCloud: "Cloud hosted",
  hubFeatAnalytics: "Real-time analytics",
  hubProductsEyebrow: "Our products",
  hubProductsTitle: "Premium platforms, ready today",
  hubProductRestaurant: "Restaurant platform",
  hubProductDugsi: "Dugsi",
  hubProductRetail: "Retail POS",
  hubProductClinic: "ClinicOS",
  hubFeatureQr: "QR ordering",
  hubFeatureKds: "Kitchen display",
  hubFeaturePos: "POS & till",
  hubFeatureWaiter: "Waiter display",
  hubFeatureTables: "Table management",
  hubFeaturePickup: "Pickup TV",
  hubFeatureStudents: "Students",
  hubFeatureTeachers: "Teachers",
  hubFeatureAttendance: "Attendance",
  hubFeatureExams: "Exams",
  hubFeatureFinance: "Finance",
  hubFeatureReports: "Reports",
  hubFeatureRetailPos: "Fast checkout",
  hubFeatureRetailInventory: "Stock & products",
  hubFeatureRetailOffline: "Works offline",
  hubFeatureRetailStaff: "PIN staff access",
  hubFeatureRetailReports: "Sales reports",
  hubFeatureRetailWindows: "Windows desktop",
  hubFeatureClinicFlow: "Patient day flow",
  hubFeatureClinicRecords: "Clinical records",
  hubFeatureClinicBilling: "Billing & cashier",
  hubFeatureClinicLab: "Lab orders",
  hubFeatureClinicPharmacy: "Pharmacy",
  hubFeatureClinicRoles: "Role-based workspaces",
  hubCtaRestaurant: "Open platform",
  hubCtaDugsi: "Open Dugsi",
  hubCtaRetail: "Open Retail",
  hubCtaClinic: "Open ClinicOS",
  hubEcosystemTitle: "The MayleSoft ecosystem",
  hubAvailableToday: "Available today",
  hubComingSoon: "Coming soon",
  hubSoonClinic: "Clinic management",
  hubSoonRetail: "Retail POS",
  hubSoonLogistics: "Logistics",
  hubSoonHr: "HR & payroll",
  hubTrustedEyebrow: "Trusted by growing businesses",
  hubStatBusinesses: "Businesses",
  hubStatUsers: "Users",
  hubStatUptime: "Uptime",
  hubStatSupport: "Support",
  hubScreensTitle: "Built for real operations",
  hubScreensBody:
    "Clean dashboards your team actually uses — from the floor to the classroom, counter, and clinic.",
  hubRestaurantDash: "Restaurant dashboard",
  hubDugsiDash: "Dugsi dashboard",
  hubRetailDash: "Retail dashboard",
  hubClinicDash: "ClinicOS dashboard",
  hubMockToday: "Today",
  hubMockLiveFloor: "Live floor",
  hubMockOpenOrders: "Open orders",
  hubMockTables: "Tables",
  hubMockKitchenWait: "Kitchen wait",
  hubMockRevenue: "Revenue",
  hubMockDashboard: "Dashboard",
  hubMockOrders: "Orders",
  hubMockMenu: "Menu",
  hubMockSpring: "Spring term",
  hubMockStudents: "Students overview",
  hubMockEnrolled: "enrolled",
  hubMockAttendance: "attendance",
  hubMockRetailPos: "POS",
  hubMockRetailProducts: "Products",
  hubMockRetailStock: "Stock",
  hubMockRetailOverview: "Shop overview",
  hubMockRetailSales: "Today sales",
  hubMockRetailTx: "Transactions",
  hubMockRetailProfit: "Gross profit",
  hubMockRetailLowStock: "Low stock",
  hubMockClinicPatients: "Patients",
  hubMockClinicQueue: "Queue",
  hubMockClinicLab: "Lab",
  hubMockClinicBilling: "Billing",
  hubMockClinicOverview: "Clinic overview",
  hubMockClinicVisits: "Visits today",
  hubMockClinicWaiting: "Waiting",
  hubMockClinicLabs: "Lab orders",
  hubMockClinicRevenue: "Collected",
  hubCtaTitle: "Ready to transform your business?",
  hubCtaBody: "Explore our platforms today.",
  hubFooterBlurb:
    "Modern cloud software for restaurants, schools, and growing organizations.",
  hubFooterProducts: "Products",
  hubFooterCompany: "Company",
  hubFooterAbout: "About",
  hubFooterAboutBody:
    "MayleSoft builds modern operational software for restaurants, schools, and growing service businesses.",
  hubFooterPrivacy: "Privacy",
  hubFooterPrivacyBody:
    "We only collect the information needed to deliver our services, support customers, and keep platforms secure.",
  hubFooterTerms: "Terms",
  hubFooterTermsBody:
    "Use of our platforms is subject to service availability, fair use, and each customer's active subscription.",
  hubFooterCredit: "© 2026 MayleSoft · Designed by Eng. Hasan Kamaal",
  retailBrand: "MayleSoft Retail",
  retailContact: "Contact",
  retailEyebrow: "Windows POS",
  retailTitle: "Retail checkout that keeps working offline",
  retailLead:
    "MayleSoft Retail is a Windows desktop POS and inventory manager for small shops — sell, track stock, and review sales without depending on the cloud every second.",
  retailCtaPrimary: "Request a demo",
  retailCtaSecondary: "See features",
  retailPlatformNote: "Native Windows app for store counters and back office.",
  retailFeaturesEyebrow: "Built for the counter",
  retailFeaturesTitle: "Everything a small store needs",
  retailFeatOfflineTitle: "Offline-first",
  retailFeatOfflineBody:
    "Keep selling when the connection drops. Your register stays usable on the shop floor.",
  retailFeatPosTitle: "Fast POS",
  retailFeatPosBody:
    "Quick product lookup, cart checkout, and clear totals designed for busy counters.",
  retailFeatInventoryTitle: "Inventory",
  retailFeatInventoryBody:
    "Track products and stock levels so you know what is running low before customers ask.",
  retailFeatStaffTitle: "Staff PINs",
  retailFeatStaffBody:
    "Role-aware access with PINs so cashiers and managers see the right screens.",
  retailFeatReportsTitle: "Sales reports",
  retailFeatReportsBody:
    "Review daily sales and product performance without exporting a maze of spreadsheets.",
  retailFeatLocalTitle: "Local data",
  retailFeatLocalBody:
    "Store data stays on the device you control — practical for shops that want simple ownership.",
  retailFinalTitle: "Ready for your counter?",
  retailFinalBody:
    "Tell us about your shop and we will help you try MayleSoft Retail on Windows.",
  retailFooterCredit: "Retail POS · Designed by Eng. Hasan Kamaal",
  retailMockSell: "Sell",
  retailMockProducts: "Products",
  retailMockStock: "Stock",
  retailMockStaff: "Staff",
  retailMockReports: "Reports",
  retailMockRegister: "Register",
  retailMockCheckout: "Checkout",
  retailMockItem1: "Bottled water",
  retailMockItem2: "Notebook A5",
  retailMockItem3: "Snack pack",
  retailMockTotal: "Total",
  retailMockPay: "Pay €18.70",
  retailDownloadEyebrow: "Windows installer",
  retailDownloadTitle: "Download MayleSoft Retail",
  retailDownloadBody:
    "Install the offline POS on your Windows PC. The app also checks this site for updates.",
  retailDownloadCta: "Download for Windows",
  retailDownloadVersion: "Version {version}",
  retailDownloadPlatform: "Windows desktop",
  retailDownloadLoading: "Checking latest release…",
  retailDownloadUnavailable:
    "Installer not available yet. Contact us for a build, or try again after the next release.",
  retailDownloadFeed: "Update feed",
  retailScreensEyebrow: "Inside the app",
  retailScreensTitle: "Built for real shop floors",
  retailScreensBody:
    "Dashboard, categories, inventory, and checkout — the same Windows POS your team uses every day.",
  retailScreenDashboard: "Dashboard & sales",
  retailScreenCategories: "Categories & products",
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
  tablePinTitle: "Syötä pöydän PIN",
  tablePinBody: "PIN-koodi on pöytäkortissa. Syötät sen kerran päivässä.",
  tablePinLabel: "Pöydän PIN",
  tablePinSubmit: "Jatka",
  tablePinInvalid: "Väärä PIN. Tarkista numero pöytäkortista.",
  tablePinNotConfiguredTitle: "Tilaaminen ei ole valmis",
  tablePinNotConfiguredBody: "Pöytää ei ole vielä otettu käyttöön. Pyydä apua henkilökunnalta.",
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
    "Kun sali on täynnä ja keittiö liikkuu, MayleSoft pitää pöydät, tilaukset ja maksut hallinnassa.",
  landingCtaTrial: "Aloita ilmainen kokeilu",
  landingCtaTrialSub: "Ei luottokorttia",
  landingCtaDemo: "Varaa live-demo",
  landingCtaDemoSub: "30 minuuttia",
  landingStat1Value: "40%",
  landingStat1Label: "Vähemmän tilausvirheitä",
  landingStat2Value: "2×",
  landingStat2Label: "Nopeampi pöytäkierto",
  landingStat3Value: "24/7",
  landingStat3Label: "Pilvialusta",
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
  tenantEyebrow: "Toimipisteemme",
  tenantBody:
    "Tilaa skannaamalla pöydän tai walk-in-QR ravintolassa.",
  tenantBranches: "Toimipisteet",
  tenantNoBranches:
    "Ei toimipisteitä vielä. Pyydä henkilökunnalta QR-koodi.",
  tenantScanHint:
    "Tilaaminen tapahtuu vain tulostetuista QR-koodeista. Linkit vanhenevat, ja henkilökunta voi vaihtaa ne Adminissa.",
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
  hubContact: "Yhteys",
  hubContactUs: "Ota yhteyttä",
  hubExploreProducts: "Tutustu tuotteisiin",
  hubGetStarted: "Aloita",
  hubHeroEyebrow: "Yksi alusta. Useita liiketoimintoja.",
  hubHeroTitleBefore: "Rakenna fiksumpia",
  hubHeroTitleAfter: "nykyaikaisella ohjelmistolla.",
  hubHeroWordRestaurants: "ravintoloita",
  hubHeroWordSchools: "kouluja",
  hubHeroWordHealthcare: "klinikoita",
  hubHeroWordRetail: "myymälöitä",
  hubHeroLead:
    "Nykyaikainen pilviohjelmisto ravintoloille, kouluille, terveydenhuollolle, vähittäiskaupalle ja kasvaville organisaatioille.",
  hubHeroPills: "Ravintola-POS · Kouluhallinta · Lisää tulossa",
  hubWhyTitle: "Miksi MayleSoft?",
  hubFeatFast: "Nopea pilvialusta",
  hubFeatSecure: "Turvallinen",
  hubFeatMobile: "Mobiiliystävällinen",
  hubFeatLanguage: "Monikielinen",
  hubFeatCloud: "Pilvessä",
  hubFeatAnalytics: "Reaaliaikainen analytiikka",
  hubProductsEyebrow: "Tuotteemme",
  hubProductsTitle: "Ensiluokkaiset alustat, käytössä jo tänään",
  hubProductRestaurant: "Ravintola-alusta",
  hubProductDugsi: "Dugsi",
  hubProductRetail: "Vähittäiskaupan kassa",
  hubProductClinic: "ClinicOS",
  hubFeatureQr: "QR-tilaus",
  hubFeatureKds: "Keittiönäyttö",
  hubFeaturePos: "Kassa",
  hubFeatureWaiter: "Tarjoilijanäyttö",
  hubFeatureTables: "Pöytähallinta",
  hubFeaturePickup: "Nouto-TV",
  hubFeatureStudents: "Oppilaat",
  hubFeatureTeachers: "Opettajat",
  hubFeatureAttendance: "Läsnäolo",
  hubFeatureExams: "Kokeet",
  hubFeatureFinance: "Talous",
  hubFeatureReports: "Raportit",
  hubFeatureRetailPos: "Nopea kassa",
  hubFeatureRetailInventory: "Varasto ja tuotteet",
  hubFeatureRetailOffline: "Toimii offline",
  hubFeatureRetailStaff: "PIN-henkilöstö",
  hubFeatureRetailReports: "Myyntiraportit",
  hubFeatureRetailWindows: "Windows-työpöytä",
  hubFeatureClinicFlow: "Potilaan päiväkulku",
  hubFeatureClinicRecords: "Kliiniset tiedot",
  hubFeatureClinicBilling: "Laskutus ja kassa",
  hubFeatureClinicLab: "Labratilaukset",
  hubFeatureClinicPharmacy: "Apteekki",
  hubFeatureClinicRoles: "Roolipohjaiset näkymät",
  hubCtaRestaurant: "Avaa alusta",
  hubCtaDugsi: "Avaa Dugsi",
  hubCtaRetail: "Avaa Retail",
  hubCtaClinic: "Avaa ClinicOS",
  hubEcosystemTitle: "MayleSoft-ekosysteemi",
  hubAvailableToday: "Saatavilla nyt",
  hubComingSoon: "Tulossa",
  hubSoonClinic: "Klinikkahallinta",
  hubSoonRetail: "Vähittäiskaupan kassa",
  hubSoonLogistics: "Logistiikka",
  hubSoonHr: "HR ja palkanlaskenta",
  hubTrustedEyebrow: "Kasvavien yritysten luottama",
  hubStatBusinesses: "Yritystä",
  hubStatUsers: "Käyttäjää",
  hubStatUptime: "Käyttöaika",
  hubStatSupport: "Tuki",
  hubScreensTitle: "Rakennettu oikeaan arkeen",
  hubScreensBody:
    "Selkeät näkymät, joita tiimi oikeasti käyttää — salista luokkahuoneeseen, kassalle ja klinikalle.",
  hubRestaurantDash: "Ravintolan hallinta",
  hubDugsiDash: "Dugsi-hallinta",
  hubRetailDash: "Vähittäiskaupan hallinta",
  hubClinicDash: "ClinicOS-hallinta",
  hubMockToday: "Tänään",
  hubMockLiveFloor: "Sali live",
  hubMockOpenOrders: "Avoimet tilaukset",
  hubMockTables: "Pöydät",
  hubMockKitchenWait: "Keittiöjono",
  hubMockRevenue: "Myynti",
  hubMockDashboard: "Hallinta",
  hubMockOrders: "Tilaukset",
  hubMockMenu: "Lista",
  hubMockSpring: "Kevätlukukausi",
  hubMockStudents: "Oppilaskatsaus",
  hubMockEnrolled: "ilmoittautunut",
  hubMockAttendance: "läsnäolo",
  hubMockRetailPos: "Kassa",
  hubMockRetailProducts: "Tuotteet",
  hubMockRetailStock: "Varasto",
  hubMockRetailOverview: "Kaupan yleiskuva",
  hubMockRetailSales: "Myynti tänään",
  hubMockRetailTx: "Tapahtumat",
  hubMockRetailProfit: "Kate",
  hubMockRetailLowStock: "Vähäinen varasto",
  hubMockClinicPatients: "Potilaat",
  hubMockClinicQueue: "Jono",
  hubMockClinicLab: "Labra",
  hubMockClinicBilling: "Laskutus",
  hubMockClinicOverview: "Klinikan yleiskuva",
  hubMockClinicVisits: "Käynnit tänään",
  hubMockClinicWaiting: "Odottaa",
  hubMockClinicLabs: "Labratilaukset",
  hubMockClinicRevenue: "Kerätty",
  hubCtaTitle: "Valmis uudistamaan liiketoimintasi?",
  hubCtaBody: "Tutustu alustoihimme jo tänään.",
  hubFooterBlurb:
    "Nykyaikainen pilviohjelmisto ravintoloille, kouluille ja kasvaville organisaatioille.",
  hubFooterProducts: "Tuotteet",
  hubFooterCompany: "Yritys",
  hubFooterAbout: "Tietoa",
  hubFooterAboutBody:
    "MayleSoft rakentaa moderneja toiminnanohjausohjelmistoja ravintoloille, kouluille ja kasvaville palveluyrityksille.",
  hubFooterPrivacy: "Tietosuoja",
  hubFooterPrivacyBody:
    "Keräämme vain palvelun toimittamiseen, asiakastukeen ja tietoturvan ylläpitoon tarvittavat tiedot.",
  hubFooterTerms: "Ehdot",
  hubFooterTermsBody:
    "Alustojemme käyttö edellyttää palvelun saatavuuden, kohtuullisen käytön ja asiakkaan aktiivisen tilauksen ehtojen hyväksymistä.",
  hubFooterCredit: "© 2026 MayleSoft · Suunnittelu: ins. Hasan Kamaal",
  retailBrand: "MayleSoft Retail",
  retailContact: "Yhteystiedot",
  retailEyebrow: "Windows-kassa",
  retailTitle: "Vähittäiskaupan kassa, joka toimii myös offline",
  retailLead:
    "MayleSoft Retail on Windows-työpöytäsovellus pienille kaupoille — myynti, varasto ja raportit ilman jatkuvaa pilviyhteyttä.",
  retailCtaPrimary: "Pyydä demo",
  retailCtaSecondary: "Katso ominaisuudet",
  retailPlatformNote: "Natiivi Windows-sovellus kassalle ja takahuoneeseen.",
  retailFeaturesEyebrow: "Rakennettu tiskille",
  retailFeaturesTitle: "Kaikki mitä pieni kauppa tarvitsee",
  retailFeatOfflineTitle: "Offline ensin",
  retailFeatOfflineBody:
    "Myy myös kun verkko pätkii. Kassa pysyy käyttökelpoisena myymälässä.",
  retailFeatPosTitle: "Nopea kassa",
  retailFeatPosBody:
    "Nopea tuotehaku, ostoskori ja selkeät summat kiireiseen palveluun.",
  retailFeatInventoryTitle: "Varasto",
  retailFeatInventoryBody:
    "Seuraa tuotteita ja saldoja, jotta tiedät mitä loppuu ennen kuin asiakas kysyy.",
  retailFeatStaffTitle: "Henkilöstö-PIN",
  retailFeatStaffBody:
    "Roolipohjainen pääsy PIN-koodilla — kassa ja esimies näkevät oikeat näkymät.",
  retailFeatReportsTitle: "Myyntiraportit",
  retailFeatReportsBody:
    "Tarkastele päivittäistä myyntiä ja tuotteita ilman monimutkaisia taulukoita.",
  retailFeatLocalTitle: "Paikallinen data",
  retailFeatLocalBody:
    "Tiedot pysyvät laitteessa, jota hallitset — käytännöllistä yksinkertaiseen omistajuuteen.",
  retailFinalTitle: "Valmis tiskillesi?",
  retailFinalBody:
    "Kerro kaupastasi, niin autamme kokeilemaan MayleSoft Retailia Windowsissa.",
  retailFooterCredit: "Vähittäiskaupan kassa · Suunnittelu: ins. Hasan Kamaal",
  retailMockSell: "Myynti",
  retailMockProducts: "Tuotteet",
  retailMockStock: "Varasto",
  retailMockStaff: "Henkilöstö",
  retailMockReports: "Raportit",
  retailMockRegister: "Kassa",
  retailMockCheckout: "Kassalle",
  retailMockItem1: "Pullo vettä",
  retailMockItem2: "Viho A5",
  retailMockItem3: "Välipalapakkaus",
  retailMockTotal: "Yhteensä",
  retailMockPay: "Maksa 18,70 €",
  retailDownloadEyebrow: "Windows-asennus",
  retailDownloadTitle: "Lataa MayleSoft Retail",
  retailDownloadBody:
    "Asenna offline-kassa Windows-tietokoneelle. Sovellus tarkistaa päivitykset tältä sivustolta.",
  retailDownloadCta: "Lataa Windowsille",
  retailDownloadVersion: "Versio {version}",
  retailDownloadPlatform: "Windows-työpöytä",
  retailDownloadLoading: "Haetaan uusinta julkaisua…",
  retailDownloadUnavailable:
    "Asennusohjelmaa ei ole vielä saatavilla. Ota yhteyttä tai yritä uudelleen seuraavan julkaisun jälkeen.",
  retailDownloadFeed: "Päivityssyöte",
  retailScreensEyebrow: "Sovelluksen sisällä",
  retailScreensTitle: "Rakennettu oikeille myyntipisteille",
  retailScreensBody:
    "Kojelauta, kategoriat, varasto ja kassa — sama Windows-POS, jota tiimisi käyttää päivittäin.",
  retailScreenDashboard: "Kojelauta ja myynti",
  retailScreenCategories: "Kategoriat ja tuotteet",
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
  tablePinTitle: "أدخل رمز الطاولة",
  tablePinBody: "رمز PIN موجود على بطاقة الطاولة. تحتاج لإدخاله مرة واحدة يوميًا.",
  tablePinLabel: "رمز الطاولة",
  tablePinSubmit: "متابعة",
  tablePinInvalid: "رمز غير صحيح. تحقق من الرقم على بطاقة الطاولة.",
  tablePinNotConfiguredTitle: "الطلب غير جاهز",
  tablePinNotConfiguredBody: "هذه الطاولة غير مهيأة للطلب بعد. اطلب المساعدة من الموظفين.",
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
    "عندما تمتلئ الصالة ويتحرك المطبخ، MayleSoft يبقي كل طاولة وطلب ودفعة تحت السيطرة.",
  landingCtaTrial: "ابدأ تجربة مجانية",
  landingCtaTrialSub: "لا حاجة لبطاقة ائتمان",
  landingCtaDemo: "احجز عرضاً مباشراً",
  landingCtaDemoSub: "30 دقيقة",
  landingStat1Value: "40%",
  landingStat1Label: "أخطاء طلبات أقل",
  landingStat2Value: "2×",
  landingStat2Label: "دوران أسرع للطاولات",
  landingStat3Value: "24/7",
  landingStat3Label: "منصة سحابية",
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
  tenantEyebrow: "فروعنا",
  tenantBody:
    "زر الفرع وامسح رمز الطاولة أو رمز الوقوف في المطعم للطلب.",
  tenantBranches: "الفروع",
  tenantNoBranches: "لا توجد فروع بعد. اطلب رمز QR من الموظفين.",
  tenantScanHint:
    "روابط الطلب موجودة فقط على رموز QR المطبوعة. تنتهي صلاحيتها ويمكن للموظفين تغييرها من لوحة الإدارة.",
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
  hubContact: "تواصل",
  hubContactUs: "تواصل معنا",
  hubExploreProducts: "استكشف المنتجات",
  hubGetStarted: "ابدأ الآن",
  hubHeroEyebrow: "منصة واحدة. أعمال متعددة.",
  hubHeroTitleBefore: "ابنِ",
  hubHeroTitleAfter: "أذكى ببرمجيات حديثة.",
  hubHeroWordRestaurants: "مطاعم",
  hubHeroWordSchools: "مدارس",
  hubHeroWordHealthcare: "عيادات",
  hubHeroWordRetail: "متاجر",
  hubHeroLead:
    "برمجيات سحابية حديثة للمطاعم والمدارس والرعاية الصحية والتجزئة والمنظمات النامية.",
  hubHeroPills: "نقطة بيع للمطاعم · إدارة المدارس · المزيد قادم",
  hubWhyTitle: "لماذا MayleSoft؟",
  hubFeatFast: "منصة سحابية سريعة",
  hubFeatSecure: "آمنة",
  hubFeatMobile: "متوافقة مع الجوال",
  hubFeatLanguage: "متعددة اللغات",
  hubFeatCloud: "مستضافة سحابياً",
  hubFeatAnalytics: "تحليلات فورية",
  hubProductsEyebrow: "منتجاتنا",
  hubProductsTitle: "منصات متميزة، جاهزة اليوم",
  hubProductRestaurant: "منصة المطاعم",
  hubProductDugsi: "دُكسي",
  hubProductRetail: "نقطة بيع للتجزئة",
  hubProductClinic: "ClinicOS",
  hubFeatureQr: "طلب عبر QR",
  hubFeatureKds: "شاشة المطبخ",
  hubFeaturePos: "نقطة البيع",
  hubFeatureWaiter: "شاشة النادل",
  hubFeatureTables: "إدارة الطاولات",
  hubFeaturePickup: "شاشة الاستلام",
  hubFeatureStudents: "الطلاب",
  hubFeatureTeachers: "المعلمون",
  hubFeatureAttendance: "الحضور",
  hubFeatureExams: "الاختبارات",
  hubFeatureFinance: "المالية",
  hubFeatureReports: "التقارير",
  hubFeatureRetailPos: "دفع سريع",
  hubFeatureRetailInventory: "المخزون والمنتجات",
  hubFeatureRetailOffline: "يعمل دون اتصال",
  hubFeatureRetailStaff: "وصول الموظفين برمز PIN",
  hubFeatureRetailReports: "تقارير المبيعات",
  hubFeatureRetailWindows: "تطبيق ويندوز",
  hubFeatureClinicFlow: "مسار يوم المريض",
  hubFeatureClinicRecords: "السجلات السريرية",
  hubFeatureClinicBilling: "الفوترة والكاشير",
  hubFeatureClinicLab: "طلبات المختبر",
  hubFeatureClinicPharmacy: "الصيدلية",
  hubFeatureClinicRoles: "مساحات عمل حسب الدور",
  hubCtaRestaurant: "افتح المنصة",
  hubCtaDugsi: "افتح دُكسي",
  hubCtaRetail: "افتح التجزئة",
  hubCtaClinic: "افتح ClinicOS",
  hubEcosystemTitle: "منظومة MayleSoft",
  hubAvailableToday: "متاح اليوم",
  hubComingSoon: "قريباً",
  hubSoonClinic: "إدارة العيادات",
  hubSoonRetail: "نقطة بيع للتجزئة",
  hubSoonLogistics: "اللوجستيات",
  hubSoonHr: "الموارد البشرية والرواتب",
  hubTrustedEyebrow: "موثوق به من الشركات النامية",
  hubStatBusinesses: "أعمال",
  hubStatUsers: "مستخدمون",
  hubStatUptime: "وقت التشغيل",
  hubStatSupport: "دعم",
  hubScreensTitle: "مصممة للتشغيل الحقيقي",
  hubScreensBody:
    "لوحات واضحة يستخدمها فريقك فعلاً — من صالة المطعم إلى الفصل والكاونتر والعيادة.",
  hubRestaurantDash: "لوحة المطعم",
  hubDugsiDash: "لوحة دُكسي",
  hubRetailDash: "لوحة التجزئة",
  hubClinicDash: "لوحة ClinicOS",
  hubMockToday: "اليوم",
  hubMockLiveFloor: "الصالة مباشرة",
  hubMockOpenOrders: "طلبات مفتوحة",
  hubMockTables: "طاولات",
  hubMockKitchenWait: "انتظار المطبخ",
  hubMockRevenue: "الإيرادات",
  hubMockDashboard: "لوحة التحكم",
  hubMockOrders: "الطلبات",
  hubMockMenu: "القائمة",
  hubMockSpring: "الفصل الربيعي",
  hubMockStudents: "نظرة على الطلاب",
  hubMockEnrolled: "مسجّل",
  hubMockAttendance: "حضور",
  hubMockRetailPos: "نقطة البيع",
  hubMockRetailProducts: "منتجات",
  hubMockRetailStock: "مخزون",
  hubMockRetailOverview: "نظرة على المحل",
  hubMockRetailSales: "مبيعات اليوم",
  hubMockRetailTx: "معاملات",
  hubMockRetailProfit: "إجمالي الربح",
  hubMockRetailLowStock: "مخزون منخفض",
  hubMockClinicPatients: "المرضى",
  hubMockClinicQueue: "الطابور",
  hubMockClinicLab: "المختبر",
  hubMockClinicBilling: "الفوترة",
  hubMockClinicOverview: "نظرة على العيادة",
  hubMockClinicVisits: "زيارات اليوم",
  hubMockClinicWaiting: "في الانتظار",
  hubMockClinicLabs: "طلبات المختبر",
  hubMockClinicRevenue: "المحصّل",
  hubCtaTitle: "هل أنت مستعد لتحويل عملك؟",
  hubCtaBody: "استكشف منصاتنا اليوم.",
  hubFooterBlurb:
    "برمجيات سحابية حديثة للمطاعم والمدارس والمنظمات النامية.",
  hubFooterProducts: "المنتجات",
  hubFooterCompany: "الشركة",
  hubFooterAbout: "حول",
  hubFooterAboutBody:
    "تطوّر MayleSoft برمجيات تشغيل حديثة للمطاعم والمدارس والشركات الخدمية النامية.",
  hubFooterPrivacy: "الخصوصية",
  hubFooterPrivacyBody:
    "نحن نجمع فقط البيانات اللازمة لتقديم خدماتنا ودعم العملاء والحفاظ على أمان المنصات.",
  hubFooterTerms: "الشروط",
  hubFooterTermsBody:
    "يخضع استخدام منصاتنا لتوفر الخدمة والاستخدام العادل واشتراك العميل النشط.",
  hubFooterCredit: "© 2026 MayleSoft · تصميم المهندس حسن كمال",
  retailBrand: "MayleSoft Retail",
  retailContact: "تواصل",
  retailEyebrow: "نقطة بيع لويندوز",
  retailTitle: "كاشير تجزئة يعمل حتى دون اتصال",
  retailLead:
    "MayleSoft Retail تطبيق ويندوز لنقطة البيع والمخزون للمحلات الصغيرة — بيع وتتبع مخزون ومراجعة مبيعات دون الاعتماد على السحابة كل لحظة.",
  retailCtaPrimary: "اطلب عرضاً",
  retailCtaSecondary: "شاهد الميزات",
  retailPlatformNote: "تطبيق ويندوز أصلي لكاونتر المحل والمكتب الخلفي.",
  retailFeaturesEyebrow: "مبني للكاونتر",
  retailFeaturesTitle: "كل ما يحتاجه محل صغير",
  retailFeatOfflineTitle: "يعمل دون اتصال",
  retailFeatOfflineBody:
    "واصل البيع عند انقطاع الشبكة. يبقى الكاشير صالحاً للاستخدام في المحل.",
  retailFeatPosTitle: "نقطة بيع سريعة",
  retailFeatPosBody:
    "بحث سريع عن المنتجات وسلة ودفع واضح لساعات الذروة.",
  retailFeatInventoryTitle: "المخزون",
  retailFeatInventoryBody:
    "تتبع المنتجات والأرصدة لتعرف ما ينفد قبل أن يسأل الزبون.",
  retailFeatStaffTitle: "رموز PIN للموظفين",
  retailFeatStaffBody:
    "صلاحيات حسب الدور برمز PIN حتى يرى الكاشير والمدير الشاشات المناسبة.",
  retailFeatReportsTitle: "تقارير المبيعات",
  retailFeatReportsBody:
    "راجع مبيعات اليوم وأداء المنتجات دون جداول معقدة.",
  retailFeatLocalTitle: "بيانات محلية",
  retailFeatLocalBody:
    "تبقى البيانات على الجهاز الذي تتحكم به — عملي للمحلات التي تريد ملكية بسيطة.",
  retailFinalTitle: "جاهز لكاونترك؟",
  retailFinalBody:
    "أخبرنا عن محلك وسنساعدك على تجربة MayleSoft Retail على ويندوز.",
  retailFooterCredit: "نقطة بيع للتجزئة · تصميم المهندس حسن كمال",
  retailMockSell: "بيع",
  retailMockProducts: "منتجات",
  retailMockStock: "مخزون",
  retailMockStaff: "موظفون",
  retailMockReports: "تقارير",
  retailMockRegister: "الكاشير",
  retailMockCheckout: "الدفع",
  retailMockItem1: "ماء معبأ",
  retailMockItem2: "دفتر A5",
  retailMockItem3: "وجبة خفيفة",
  retailMockTotal: "الإجمالي",
  retailMockPay: "ادفع €18.70",
  retailDownloadEyebrow: "مثبّت ويندوز",
  retailDownloadTitle: "نزّل MayleSoft Retail",
  retailDownloadBody:
    "ثبّت نقطة البيع دون اتصال على جهاز ويندوز. يتحقق التطبيق أيضاً من التحديثات عبر هذا الموقع.",
  retailDownloadCta: "تنزيل لويندوز",
  retailDownloadVersion: "الإصدار {version}",
  retailDownloadPlatform: "سطح مكتب ويندوز",
  retailDownloadLoading: "جارٍ التحقق من أحدث إصدار…",
  retailDownloadUnavailable:
    "المثبّت غير متاح بعد. تواصل معنا للحصول على نسخة، أو حاول مجدداً بعد الإصدار التالي.",
  retailDownloadFeed: "مصدر التحديثات",
  retailScreensEyebrow: "داخل التطبيق",
  retailScreensTitle: "مصمم لبيئة المحل الحقيقية",
  retailScreensBody:
    "لوحة التحكم والفئات والمخزون والدفع — نفس نقطة البيع على ويندوز التي يستخدمها فريقك يومياً.",
  retailScreenDashboard: "لوحة التحكم والمبيعات",
  retailScreenCategories: "الفئات والمنتجات",
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
  tablePinTitle: "Geli PIN-ka miiska",
  tablePinBody: "PIN-ka waxaa ku qoran kaadhka miiska. Hal mar maalintii ayaad gelinaysaa.",
  tablePinLabel: "PIN-ka miiska",
  tablePinSubmit: "Sii wad",
  tablePinInvalid: "PIN khaldan. Hubi lambarka kaadhka miiska.",
  tablePinNotConfiguredTitle: "Dalabka diyaar ma aha",
  tablePinNotConfiguredBody: "Miiskan weli looma diyaarin dalbashada. Fadlan weydii shaqaalaha.",
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
    "Marka dabaqa uu buuxo jikaduna socoto, MayleSoft wuxuu hayaa miis kasta, dalab, iyo lacag-bixin gacanta ku jira.",
  landingCtaTrial: "Bilow tijaabo bilaash ah",
  landingCtaTrialSub: "Kaarka looma baahna",
  landingCtaDemo: "Ballan demo toos ah",
  landingCtaDemoSub: "30 daqiiqo",
  landingStat1Value: "40%",
  landingStat1Label: "Khaladaad dalab oo yar",
  landingStat2Value: "2×",
  landingStat2Label: "Wareeg miis oo degdeg ah",
  landingStat3Value: "24/7",
  landingStat3Label: "Platform daruur",
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
  tenantEyebrow: "Goobahaannu",
  tenantBody:
    "Booqo laanta oo scan-garee QR-ka miiska ama walk-in-ka si aad u dalbato.",
  tenantBranches: "Laamaha",
  tenantNoBranches: "Weli ma jiraan laamo. Weydii shaqaalaha QR.",
  tenantScanHint:
    "Xiriirada dalabku waxay ku yaalaan QR-yada daabacan oo keliya. Way dhacaan, shaqaaluhuna way beddeli karaan Admin-ka.",
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
  hubContact: "Xiriir",
  hubContactUs: "Nala soo xiriir",
  hubExploreProducts: "Sahamin alaabta",
  hubGetStarted: "Bilow",
  hubHeroEyebrow: "Hal platform. Ganacsiyo badan.",
  hubHeroTitleBefore: "Dhis",
  hubHeroTitleAfter: "caqli badan software casri ah.",
  hubHeroWordRestaurants: "makhaayado",
  hubHeroWordSchools: "dugsiyo",
  hubHeroWordHealthcare: "caafimaad",
  hubHeroWordRetail: "dukaan",
  hubHeroLead:
    "Software daruur casri ah oo loogu talagalay makhaayadaha, dugsiyada, caafimaadka, tafaariiqda, iyo ururada koraya.",
  hubHeroPills: "POS-ka makhaayadda · Maamulka dugsiga · Wax kale ayaa imanaya",
  hubWhyTitle: "Maxaa MayleSoft?",
  hubFeatFast: "Platform daruur degdeg ah",
  hubFeatSecure: "Ammaan",
  hubFeatMobile: "Ku habboon mobilka",
  hubFeatLanguage: "Luqado badan",
  hubFeatCloud: "Ku yaal daruurta",
  hubFeatAnalytics: "Falanqayn waqtiga dhabta ah",
  hubProductsEyebrow: "Alaabteenna",
  hubProductsTitle: "Platform-yo heer sare ah, diyaar maanta",
  hubProductRestaurant: "Platform-ka makhaayadda",
  hubProductDugsi: "Dugsi",
  hubProductRetail: "POS-ka tafaariiqda",
  hubProductClinic: "ClinicOS",
  hubFeatureQr: "Dalab QR",
  hubFeatureKds: "Bandhigga jikada",
  hubFeaturePos: "POS & khasnada",
  hubFeatureWaiter: "Bandhigga adeegaha",
  hubFeatureTables: "Maamulka miisaska",
  hubFeaturePickup: "TV-ga qaadista",
  hubFeatureStudents: "Ardayda",
  hubFeatureTeachers: "Macallimiinta",
  hubFeatureAttendance: "Imaanshaha",
  hubFeatureExams: "Imtixaannada",
  hubFeatureFinance: "Maaliyadda",
  hubFeatureReports: "Warbixinno",
  hubFeatureRetailPos: "Checkout degdeg ah",
  hubFeatureRetailInventory: "Alaabta iyo kaydka",
  hubFeatureRetailOffline: "Wuxuu shaqeeyaa offline",
  hubFeatureRetailStaff: "PIN-ka shaqaalaha",
  hubFeatureRetailReports: "Warbixinnada iibka",
  hubFeatureRetailWindows: "Desktop Windows",
  hubFeatureClinicFlow: "Socodka maalinlaha ee bukaanka",
  hubFeatureClinicRecords: "Diiwaanka caafimaadka",
  hubFeatureClinicBilling: "Biilka & khasnada",
  hubFeatureClinicLab: "Dalabka shaybaarka",
  hubFeatureClinicPharmacy: "Farmashiyaha",
  hubFeatureClinicRoles: "Shaashado ku salaysan doorka",
  hubCtaRestaurant: "Fur platform-ka",
  hubCtaDugsi: "Fur Dugsi",
  hubCtaRetail: "Fur Retail",
  hubCtaClinic: "Fur ClinicOS",
  hubEcosystemTitle: "Nidaamka MayleSoft",
  hubAvailableToday: "Diyaar maanta",
  hubComingSoon: "Dhawaan",
  hubSoonClinic: "Maamulka rugta caafimaadka",
  hubSoonRetail: "POS-ka tafaariiqda",
  hubSoonLogistics: "Gaadiidka",
  hubSoonHr: "HR iyo mushaharka",
  hubTrustedEyebrow: "Ganacsiyada koraya ayaa ku kalsoon",
  hubStatBusinesses: "Ganacsi",
  hubStatUsers: "Isticmaalayaal",
  hubStatUptime: "Waqtiga shaqada",
  hubStatSupport: "Taageero",
  hubScreensTitle: "Loo dhisay howlaha dhabta ah",
  hubScreensBody:
    "Dashboard-yo nadiif ah oo kooxdaadu run ahaantii isticmaasho — laga bilaabo dabaqa ilaa fasalka, miiska iibka, iyo rugta caafimaadka.",
  hubRestaurantDash: "Dashboard-ka makhaayadda",
  hubDugsiDash: "Dashboard-ka Dugsi",
  hubRetailDash: "Dashboard-ka tafaariiqda",
  hubClinicDash: "Dashboard-ka ClinicOS",
  hubMockToday: "Maanta",
  hubMockLiveFloor: "Dabaqa tooska ah",
  hubMockOpenOrders: "Dalabyo furan",
  hubMockTables: "Miisas",
  hubMockKitchenWait: "Sugitaanka jikada",
  hubMockRevenue: "Dakhliga",
  hubMockDashboard: "Dashboard",
  hubMockOrders: "Dalabyo",
  hubMockMenu: "Liiska",
  hubMockSpring: "Xilliga gu'ga",
  hubMockStudents: "Ardayda guud ahaan",
  hubMockEnrolled: "diiwaangashan",
  hubMockAttendance: "imaansho",
  hubMockRetailPos: "POS",
  hubMockRetailProducts: "Alaabta",
  hubMockRetailStock: "Kayd",
  hubMockRetailOverview: "Dukaanka guud ahaan",
  hubMockRetailSales: "Iibka maanta",
  hubMockRetailTx: "Macaamilo",
  hubMockRetailProfit: "Faa'iidada",
  hubMockRetailLowStock: "Kayd hooseeya",
  hubMockClinicPatients: "Bukaannada",
  hubMockClinicQueue: "Safka",
  hubMockClinicLab: "Shaybaar",
  hubMockClinicBilling: "Biilka",
  hubMockClinicOverview: "Rugta guud ahaan",
  hubMockClinicVisits: "Booqashooyinka maanta",
  hubMockClinicWaiting: "Sugaya",
  hubMockClinicLabs: "Dalabyada shaybaarka",
  hubMockClinicRevenue: "La ururiyay",
  hubCtaTitle: "Diyaar ma u tahay inaad beddesho ganacsigaaga?",
  hubCtaBody: "Sahamin platform-yadeenna maanta.",
  hubFooterBlurb:
    "Software daruur casri ah oo loogu talagalay makhaayadaha, dugsiyada, iyo ururada koraya.",
  hubFooterProducts: "Alaabta",
  hubFooterCompany: "Shirkadda",
  hubFooterAbout: "Ku saabsan",
  hubFooterAboutBody:
    "MayleSoft waxay dhistaa software hawlgal casri ah oo loogu talagalay makhaayadaha, dugsiyada, iyo ganacsiyada adeegga ee koraya.",
  hubFooterPrivacy: "Asturnaanta",
  hubFooterPrivacyBody:
    "Waxaan ururinnaa oo keliya xogta loo baahan yahay si aan u bixino adeegyada, u taageerno macaamiisha, una ilaalino amniga.",
  hubFooterTerms: "Shuruudaha",
  hubFooterTermsBody:
    "Isticmaalka platform-yadeenna wuxuu ku xiran yahay helitaanka adeegga, isticmaal cadaalad ah, iyo rukhsad firfircoon oo macaamilka ah.",
  hubFooterCredit: "© 2026 MayleSoft · Naqshadeeyaha: Eng. Hasan Kamaal",
  retailBrand: "MayleSoft Retail",
  retailContact: "Xiriir",
  retailEyebrow: "POS Windows",
  retailTitle: "Khasnada tafaariiqda ee offline u shaqaysa",
  retailLead:
    "MayleSoft Retail waa barnaamij Windows ah oo POS iyo kayd loogu talagalay dukaamada yaryar — iib, kayd, iyo warbixinno iyada oo aan ku tiirsanayn daruurta mar kasta.",
  retailCtaPrimary: "Codso demo",
  retailCtaSecondary: "Arag astaamaha",
  retailPlatformNote: "App Windows ah oo loogu talagalay miiska iibka iyo xafiiska dambe.",
  retailFeaturesEyebrow: "Loogu talagalay miiska",
  retailFeaturesTitle: "Wax kasta oo dukaan yar u baahan yahay",
  retailFeatOfflineTitle: "Offline marka hore",
  retailFeatOfflineBody:
    "Sii wad iibinta marka shabakadu dhacdo. Khasnaddu weli waa la isticmaali karaa dukaanka.",
  retailFeatPosTitle: "POS degdeg ah",
  retailFeatPosBody:
    "Raadinta alaabta, cart-ka, iyo wadarta cad ee loogu talagalay miiska mashquulka badan.",
  retailFeatInventoryTitle: "Kaydka",
  retailFeatInventoryBody:
    "La soco alaabta iyo heerarka kaydka si aad u ogaato waxa dhammaanaya ka hor inta macmiilku weydiin.",
  retailFeatStaffTitle: "PIN-ka shaqaalaha",
  retailFeatStaffBody:
    "Helitaan doorka ku salaysan PIN si khasnadaha iyo maareeyayaashu u arkaan shaashadaha saxda ah.",
  retailFeatReportsTitle: "Warbixinnada iibka",
  retailFeatReportsBody:
    "Eeg iibka maalinlaha ah iyo waxqabadka alaabta iyada oo aan la isticmaalin excel-yo badan.",
  retailFeatLocalTitle: "Xog maxalli ah",
  retailFeatLocalBody:
    "Xogtu waxay ku jirtaa qalabka aad maamusho — wax ku ool ah dukaamada doonaya lahaansho fudud.",
  retailFinalTitle: "Diyaar miiskaaga?",
  retailFinalBody:
    "Noo sheeg dukaankaaga, waxaan kaa caawinaynaa inaad tijaabiso MayleSoft Retail Windows-ka.",
  retailFooterCredit: "POS tafaariiq · Naqshadeeyaha: Eng. Hasan Kamaal",
  retailMockSell: "Iib",
  retailMockProducts: "Alaabta",
  retailMockStock: "Kayd",
  retailMockStaff: "Shaqaale",
  retailMockReports: "Warbixinno",
  retailMockRegister: "Khasnada",
  retailMockCheckout: "Bixinta",
  retailMockItem1: "Biyo dhalada",
  retailMockItem2: "Buug A5",
  retailMockItem3: "Cunto fudud",
  retailMockTotal: "Wadarta",
  retailMockPay: "Bixi €18.70",
  retailDownloadEyebrow: "Rakibaha Windows",
  retailDownloadTitle: "Soo deg MayleSoft Retail",
  retailDownloadBody:
    "Ku rakib POS-ka offline komputerka Windows. App-ku wuxuu kaloo ka eegayaa cusboonaysiinta goobtan.",
  retailDownloadCta: "Soo deg Windows",
  retailDownloadVersion: "Nooca {version}",
  retailDownloadPlatform: "Desktop Windows",
  retailDownloadLoading: "Waa la hubinayaa nooca ugu dambeeyay…",
  retailDownloadUnavailable:
    "Rakibuhu weli ma diyaar. Nala soo xiriir, ama isku day markale ka dib daabacaadda xigta.",
  retailDownloadFeed: "Isku-xirka cusboonaysiinta",
  retailScreensEyebrow: "Gudaha app-ka",
  retailScreensTitle: "Loogu talagalay dukaamada dhabta ah",
  retailScreensBody:
    "Dashboard, qaybaha, kaydka, iyo bixinta — isla POS-ka Windows ee kooxdu maalin walba isticmaasho.",
  retailScreenDashboard: "Dashboard & iibka",
  retailScreenCategories: "Qaybaha & alaabta",
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
