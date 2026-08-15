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
