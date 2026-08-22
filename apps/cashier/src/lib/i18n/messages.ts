import type { Locale } from "./locales";

export type MessageKey =
  | "language"
  | "footer"
  | "close"
  | "print"
  | "guest"
  | "walkIn"
  | "restaurant"
  | "item"
  | "all"
  | "other"
  | "total"
  | "tip"
  | "order"
  | "loading"
  // Login
  | "loginKicker"
  | "loginHeadline"
  | "loginBody"
  | "loginEmail"
  | "loginPassword"
  | "loginSubmit"
  | "loginSigningIn"
  | "loginFailed"
  | "loginRoleDenied"
  // Auth shell
  | "checkingSession"
  | "till"
  | "cashier"
  | "signOut"
  // Payments board
  | "paymentsTitle"
  | "paymentsSubtitle"
  | "paymentsSubtitleTerminal"
  | "liveFeed"
  | "connected"
  | "polling"
  | "openUnpaid"
  | "paidOnFloor"
  | "todaysPaid"
  | "tillTotal"
  | "ordersCount"
  | "closedCount"
  | "activeTickets"
  | "loadingBranches"
  | "loadingOrders"
  | "needsPayment"
  | "noOpenUnpaid"
  | "settled"
  | "noSettled"
  | "todaysPaidSection"
  | "loadingTodaysPaid"
  | "noClosedPaidToday"
  | "tableLabel"
  | "paymentsCount"
  | "paymentsCountOne"
  | "noPayment"
  | "dueOf"
  | "selected"
  | "balanceDue"
  | "tipOptional"
  | "tipOnSplit"
  | "splitHint"
  | "payCash"
  | "paySelectedCash"
  | "payCardTerminal"
  | "paySelectedTerminal"
  | "cardManual"
  | "paySelectedManual"
  | "payOnline"
  | "recordPending"
  | "markPaid"
  | "checkStripe"
  | "printTicket"
  | "printReceipt"
  | "refund"
  | "cancelOrder"
  | "seat"
  | "cancelConfirm"
  | "cancelConfirmSure"
  | "refundConfirm"
  | "statusSimulatedReader"
  | "statusWaitingTerminal"
  | "statusWaitingWebhook"
  | "statusCardSucceeded"
  | "statusOrderCancelled"
  | "statusCheckingStripe"
  // Receipt
  | "receipt"
  | "paid"
  | "receivedBy"
  | "netExclVat"
  | "vatPercent"
  | "totalInclVat"
  | "thankYou"
  | "partialRefund"
  | "walkInTitle"
  // Pickup ticket
  | "pickupTicket"
  | "yourNumber"
  | "payAtCounter"
  | "guestWalkIn"
  // Walk-in panel
  | "newWalkIn"
  | "walkInCreated"
  | "printPickupTicket"
  | "done"
  | "anotherWalkIn"
  | "walkInHint"
  | "guestNameOptional"
  | "guestPlaceholder"
  | "loadingMenu"
  | "noActiveMenuItems"
  | "cart"
  | "itemsCount"
  | "creating"
  | "createAssignNumber"
  | "addAtLeastOneItem"
  | "decreaseAria"
  | "increaseAria"
  // Menu availability
  | "menuAvailability"
  | "menuAvailabilityHint"
  | "available"
  | "soldOut"
  // Branch
  | "branch"
  | "noBranchesAvailable"
  // Terminal
  | "stripeTerminalReader"
  | "terminalHelp"
  | "location"
  | "notConfigured"
  | "noLocationWarning"
  | "simulated"
  | "physical"
  | "connecting"
  | "connectTest"
  | "preferredReader"
  | "firstDiscovered"
  | "registrationCode"
  | "label"
  | "registering"
  | "registerReader"
  | "refreshList"
  | "usingSimulated"
  | "physicalModeHint"
  | "registerFailed"
  | "connectFailed"
  | "registeredReader"
  | "connectedPhysical"
  | "connectedSimulated";

type Messages = Record<MessageKey, string>;

const en: Messages = {
  language: "Language",
  footer:
    "© 2026 MayleSoft Restaurant Platform · Designed by Eng. Hasan Kamaal",
  close: "Close",
  print: "Print",
  guest: "Guest",
  walkIn: "Walk-in",
  restaurant: "Restaurant",
  item: "Item",
  all: "All",
  other: "Other",
  total: "Total",
  tip: "Tip",
  order: "Order",
  loading: "Loading…",
  loginKicker: "Restaurant platform",
  loginHeadline: "Cashier",
  loginBody: "Sign in to take payments for floor orders.",
  loginEmail: "Email",
  loginPassword: "Password",
  loginSubmit: "Sign in",
  loginSigningIn: "Signing in…",
  loginFailed: "Login failed",
  loginRoleDenied:
    "Role {role} cannot access the Cashier till. Use the Admin console instead.",
  checkingSession: "Checking session…",
  till: "Till",
  cashier: "Cashier",
  signOut: "Sign out",
  paymentsTitle: "Payments",
  paymentsSubtitle:
    "Split by item · tips · refunds · ONLINE via {provider}{terminal}",
  paymentsSubtitleTerminal: " · CARD via Terminal",
  liveFeed: "Live feed:",
  connected: "connected",
  polling: "polling",
  openUnpaid: "Open unpaid",
  paidOnFloor: "Paid on floor",
  todaysPaid: "Today's paid",
  tillTotal: "Till total",
  ordersCount: "{count} orders",
  closedCount: "{count} closed",
  activeTickets: "Active tickets",
  loadingBranches: "Loading branches…",
  loadingOrders: "Loading orders…",
  needsPayment: "Needs payment ({count})",
  noOpenUnpaid: "No open unpaid orders.",
  settled: "Settled ({count})",
  noSettled: "No settled active orders.",
  todaysPaidSection: "Today's paid ({count})",
  loadingTodaysPaid: "Loading today's paid…",
  noClosedPaidToday: "No closed paid orders yet today.",
  tableLabel: "Table {number}",
  paymentsCount: "{count} payments",
  paymentsCountOne: "1 payment",
  noPayment: "no payment",
  dueOf: "Due {due} of {total}",
  selected: "Selected",
  balanceDue: "Balance due",
  tipOptional: "Tip (optional)",
  tipOnSplit: " · on this split",
  splitHint: "Split is by whole line items (not per unit of quantity).",
  payCash: "Pay cash",
  paySelectedCash: "Pay selected cash",
  payCardTerminal: "Pay card (Terminal)",
  paySelectedTerminal: "Pay selected (Terminal)",
  cardManual: "Card manual",
  paySelectedManual: "Pay selected (manual card)",
  payOnline: "Pay online",
  recordPending: "Record pending",
  markPaid: "Mark paid",
  checkStripe: "Check Stripe",
  printTicket: "Print ticket",
  printReceipt: "Print receipt",
  refund: "Refund",
  cancelOrder: "Cancel order",
  seat: "seat {number}",
  cancelConfirm:
    "Cancel order {label}?\n\nThis cannot be undone. Pending payments will be voided.",
  cancelConfirmSure: "Confirm cancel {label}?",
  refundConfirm: "Refund remaining balance for {id}?",
  statusSimulatedReader:
    "Simulated reader: presenting test card 4242… (no tap UI)",
  statusWaitingTerminal: "Waiting for card on Terminal reader…",
  statusWaitingWebhook: "Waiting for Stripe webhook confirmation…",
  statusCardSucceeded: "Card payment succeeded.",
  statusOrderCancelled: "Order cancelled.",
  statusCheckingStripe: "Checking Stripe PaymentIntent status…",
  receipt: "Receipt",
  paid: "Paid",
  receivedBy: "Received by",
  netExclVat: "Net (excl. VAT)",
  vatPercent: "VAT {percent}%",
  totalInclVat: "Total (incl. VAT)",
  thankYou: "Thank you — please keep this receipt.",
  partialRefund: " (partial refund)",
  walkInTitle: "{queue} · Walk-in",
  pickupTicket: "Pickup ticket",
  yourNumber: "Your number",
  payAtCounter: "Pay at the counter · Order {id}",
  guestWalkIn: "{name} · Walk-in",
  newWalkIn: "New walk-in",
  walkInCreated: "Walk-in created · pay at till",
  printPickupTicket: "Print pickup ticket",
  done: "Done",
  anotherWalkIn: "Another walk-in",
  walkInHint: "Assign pickup number, print ticket, then take payment.",
  guestNameOptional: "Guest name (optional)",
  guestPlaceholder: "Guest",
  loadingMenu: "Loading menu…",
  noActiveMenuItems: "No active menu items.",
  cart: "Cart ·",
  itemsCount: "{count} items",
  creating: "Creating…",
  createAssignNumber: "Create & assign number",
  addAtLeastOneItem: "Add at least one item",
  decreaseAria: "Decrease {name}",
  increaseAria: "Increase {name}",
  menuAvailability: "Menu availability",
  menuAvailabilityHint:
    "Mark finished items sold out. Guests still see them as unavailable.",
  available: "Available",
  soldOut: "Sold out",
  branch: "Branch",
  noBranchesAvailable: "No branches available",
  stripeTerminalReader: "Stripe Terminal reader",
  terminalHelp:
    "All Terminal traffic goes through /api/payments/terminal/* (connection token, reader list, register). Simulated needs no hardware. Physical: set PAYMENT_PROVIDER=stripe, STRIPE_TERMINAL=1, and STRIPE_TERMINAL_LOCATION_ID on the API, then register the device pairing code here.",
  location: "Location:",
  notConfigured: "not configured",
  noLocationWarning:
    "No location configured — register/connect will fail until Location ID is set.",
  simulated: "Simulated",
  physical: "Physical",
  connecting: "Connecting…",
  connectTest: "Connect / test",
  preferredReader: "Preferred reader",
  firstDiscovered: "First discovered at location",
  registrationCode: "Registration code",
  label: "Label",
  registering: "Registering…",
  registerReader: "Register reader",
  refreshList: "Refresh list",
  usingSimulated: "Using simulated reader (local/CI).",
  physicalModeHint:
    "Physical mode — register/select a reader, then Connect.",
  registerFailed: "Register failed",
  connectFailed: "Connect failed",
  registeredReader: "Registered {label}",
  connectedPhysical: "Connected to {label}.",
  connectedSimulated: "Connected simulated reader {label}.",
};

const fi: Messages = {
  language: "Kieli",
  footer:
    "© 2026 MayleSoft Restaurant Platform · Suunnittelu: Eng. Hasan Kamaal",
  close: "Sulje",
  print: "Tulosta",
  guest: "Vieras",
  walkIn: "Walk-in",
  restaurant: "Ravintola",
  item: "Tuote",
  all: "Kaikki",
  other: "Muu",
  total: "Yhteensä",
  tip: "Tippi",
  order: "Tilaus",
  loading: "Ladataan…",
  loginKicker: "Ravintola-alusta",
  loginHeadline: "Kassa",
  loginBody: "Kirjaudu vastaanottamaan maksuja salin tilauksista.",
  loginEmail: "Sähköposti",
  loginPassword: "Salasana",
  loginSubmit: "Kirjaudu sisään",
  loginSigningIn: "Kirjaudutaan…",
  loginFailed: "Kirjautuminen epäonnistui",
  loginRoleDenied:
    "Rooli {role} ei voi käyttää kassaa. Käytä hallintakonsolia sen sijaan.",
  checkingSession: "Tarkistetaan istuntoa…",
  till: "Kassa",
  cashier: "Kassa",
  signOut: "Kirjaudu ulos",
  paymentsTitle: "Maksut",
  paymentsSubtitle:
    "Jaa rivillä · tipit · palautukset · ONLINE kautta {provider}{terminal}",
  paymentsSubtitleTerminal: " · KORTTI Terminalilla",
  liveFeed: "Live-syöte:",
  connected: "yhdistetty",
  polling: "kysely",
  openUnpaid: "Avoimet maksamattomat",
  paidOnFloor: "Maksettu salissa",
  todaysPaid: "Tänään maksetut",
  tillTotal: "Kassan summa",
  ordersCount: "{count} tilausta",
  closedCount: "{count} suljettua",
  activeTickets: "Aktiiviset liput",
  loadingBranches: "Ladataan toimipisteitä…",
  loadingOrders: "Ladataan tilauksia…",
  needsPayment: "Odottaa maksua ({count})",
  noOpenUnpaid: "Ei avoimia maksamattomia tilauksia.",
  settled: "Selvitetty ({count})",
  noSettled: "Ei selvitettyjä aktiivisia tilauksia.",
  todaysPaidSection: "Tänään maksetut ({count})",
  loadingTodaysPaid: "Ladataan tämän päivän maksuja…",
  noClosedPaidToday: "Ei vielä suljettuja maksettuja tilauksia tänään.",
  tableLabel: "Pöytä {number}",
  paymentsCount: "{count} maksua",
  paymentsCountOne: "1 maksu",
  noPayment: "ei maksua",
  dueOf: "Jäljellä {due} / {total}",
  selected: "Valittu",
  balanceDue: "Maksettavaa",
  tipOptional: "Tippi (valinnainen)",
  tipOnSplit: " · tälle jaolle",
  splitHint: "Jako on kokonaisilla riveillä (ei kappaleittain).",
  payCash: "Maksa käteisellä",
  paySelectedCash: "Maksa valitut käteisellä",
  payCardTerminal: "Maksa kortilla (Terminal)",
  paySelectedTerminal: "Maksa valitut (Terminal)",
  cardManual: "Kortti manuaalisesti",
  paySelectedManual: "Maksa valitut (manuaalinen kortti)",
  payOnline: "Maksa verkossa",
  recordPending: "Kirjaa odottavaksi",
  markPaid: "Merkitse maksetuksi",
  checkStripe: "Tarkista Stripe",
  printTicket: "Tulosta lippu",
  printReceipt: "Tulosta kuitti",
  refund: "Palauta",
  cancelOrder: "Peruuta tilaus",
  seat: "paikka {number}",
  cancelConfirm:
    "Peruuta tilaus {label}?\n\nTätä ei voi peruuttaa. Odottavat maksut mitätöidään.",
  cancelConfirmSure: "Vahvista peruutus {label}?",
  refundConfirm: "Palauta jäljellä oleva saldo tilaukselle {id}?",
  statusSimulatedReader:
    "Simuloitu lukija: testikortti 4242… (ei napautus-UI:ta)",
  statusWaitingTerminal: "Odotetaan korttia Terminal-lukijalla…",
  statusWaitingWebhook: "Odotetaan Stripe-webhook-vahvistusta…",
  statusCardSucceeded: "Korttimaksu onnistui.",
  statusOrderCancelled: "Tilaus peruutettu.",
  statusCheckingStripe: "Tarkistetaan Stripe PaymentIntent -tilaa…",
  receipt: "Kuitti",
  paid: "Maksettu",
  receivedBy: "Vastaanottaja",
  netExclVat: "Netto (ilman ALV)",
  vatPercent: "ALV {percent} %",
  totalInclVat: "Yhteensä (sis. ALV)",
  thankYou: "Kiitos — säilytä tämä kuitti.",
  partialRefund: " (osittainen palautus)",
  walkInTitle: "{queue} · Walk-in",
  pickupTicket: "Noutolippu",
  yourNumber: "Numerosi",
  payAtCounter: "Maksa tiskillä · Tilaus {id}",
  guestWalkIn: "{name} · Walk-in",
  newWalkIn: "Uusi walk-in",
  walkInCreated: "Walk-in luotu · maksa kassalla",
  printPickupTicket: "Tulosta noutolippu",
  done: "Valmis",
  anotherWalkIn: "Toinen walk-in",
  walkInHint: "Anna noutonumero, tulosta lippu ja ota maksu.",
  guestNameOptional: "Vieraan nimi (valinnainen)",
  guestPlaceholder: "Vieras",
  loadingMenu: "Ladataan menuua…",
  noActiveMenuItems: "Ei aktiivisia menu-tuotteita.",
  cart: "Kori ·",
  itemsCount: "{count} tuotetta",
  creating: "Luodaan…",
  createAssignNumber: "Luo ja anna numero",
  addAtLeastOneItem: "Lisää vähintään yksi tuote",
  decreaseAria: "Vähennä {name}",
  increaseAria: "Lisää {name}",
  menuAvailability: "Menun saatavuus",
  menuAvailabilityHint:
    "Merkitse loppuneet tuotteet loppuunmyydyiksi. Asiakkaat näkevät ne edelleen ei-saatavilla.",
  available: "Saatavilla",
  soldOut: "Loppu",
  branch: "Toimipiste",
  noBranchesAvailable: "Ei toimipisteitä",
  stripeTerminalReader: "Stripe Terminal -lukija",
  terminalHelp:
    "Kaikki Terminal-liikenne kulkee /api/payments/terminal/* kautta (yhteystoken, lukijalista, rekisteröinti). Simuloitu ei tarvitse laitteistoa. Fyysinen: aseta API:lle PAYMENT_PROVIDER=stripe, STRIPE_TERMINAL=1 ja STRIPE_TERMINAL_LOCATION_ID, ja rekisteröi laitteen parituskoodi tässä.",
  location: "Sijainti:",
  notConfigured: "ei määritetty",
  noLocationWarning:
    "Sijaintia ei ole määritetty — rekisteröinti/yhteys epäonnistuu kunnes Location ID on asetettu.",
  simulated: "Simuloitu",
  physical: "Fyysinen",
  connecting: "Yhdistetään…",
  connectTest: "Yhdistä / testaa",
  preferredReader: "Ensisijainen lukija",
  firstDiscovered: "Ensimmäinen löydetty sijainnista",
  registrationCode: "Rekisteröintikoodi",
  label: "Nimi",
  registering: "Rekisteröidään…",
  registerReader: "Rekisteröi lukija",
  refreshList: "Päivitä lista",
  usingSimulated: "Käytetään simuloitua lukijaa (paikallinen/CI).",
  physicalModeHint:
    "Fyysinen tila — rekisteröi/valitse lukija ja yhdistä.",
  registerFailed: "Rekisteröinti epäonnistui",
  connectFailed: "Yhteys epäonnistui",
  registeredReader: "Rekisteröity {label}",
  connectedPhysical: "Yhdistetty lukijaan {label}.",
  connectedSimulated: "Yhdistetty simuloituun lukijaan {label}.",
};

const ar: Messages = {
  language: "اللغة",
  footer: "© 2026 MayleSoft Restaurant Platform · تصميم م. حسن كمال",
  close: "إغلاق",
  print: "طباعة",
  guest: "ضيف",
  walkIn: "حضور مباشر",
  restaurant: "المطعم",
  item: "صنف",
  all: "الكل",
  other: "أخرى",
  total: "الإجمالي",
  tip: "إكرامية",
  order: "الطلب",
  loading: "جارٍ التحميل…",
  loginKicker: "منصة المطاعم",
  loginHeadline: "أمين الصندوق",
  loginBody: "سجّل الدخول لاستلام مدفوعات طلبات الصالة.",
  loginEmail: "البريد الإلكتروني",
  loginPassword: "كلمة المرور",
  loginSubmit: "تسجيل الدخول",
  loginSigningIn: "جارٍ الدخول…",
  loginFailed: "فشل تسجيل الدخول",
  loginRoleDenied:
    "الدور {role} لا يمكنه الوصول إلى نقطة البيع. استخدم لوحة الإدارة بدلاً من ذلك.",
  checkingSession: "جارٍ التحقق من الجلسة…",
  till: "نقطة البيع",
  cashier: "أمين الصندوق",
  signOut: "تسجيل الخروج",
  paymentsTitle: "المدفوعات",
  paymentsSubtitle:
    "تقسيم حسب الصنف · إكراميات · استرداد · ONLINE عبر {provider}{terminal}",
  paymentsSubtitleTerminal: " · بطاقة عبر Terminal",
  liveFeed: "البث المباشر:",
  connected: "متصل",
  polling: "استطلاع",
  openUnpaid: "غير مدفوع مفتوح",
  paidOnFloor: "مدفوع في الصالة",
  todaysPaid: "مدفوع اليوم",
  tillTotal: "إجمالي الصندوق",
  ordersCount: "{count} طلبات",
  closedCount: "{count} مغلقة",
  activeTickets: "تذاكر نشطة",
  loadingBranches: "جارٍ تحميل الفروع…",
  loadingOrders: "جارٍ تحميل الطلبات…",
  needsPayment: "بانتظار الدفع ({count})",
  noOpenUnpaid: "لا توجد طلبات مفتوحة غير مدفوعة.",
  settled: "مسوّى ({count})",
  noSettled: "لا توجد طلبات نشطة مسوّاة.",
  todaysPaidSection: "مدفوع اليوم ({count})",
  loadingTodaysPaid: "جارٍ تحميل مدفوعات اليوم…",
  noClosedPaidToday: "لا توجد طلبات مدفوعة مغلقة اليوم بعد.",
  tableLabel: "طاولة {number}",
  paymentsCount: "{count} مدفوعات",
  paymentsCountOne: "دفعة واحدة",
  noPayment: "لا دفعة",
  dueOf: "المستحق {due} من {total}",
  selected: "المحدد",
  balanceDue: "الرصيد المستحق",
  tipOptional: "إكرامية (اختياري)",
  tipOnSplit: " · على هذا التقسيم",
  splitHint: "التقسيم حسب بنود السطر كاملة (وليس لكل وحدة كمية).",
  payCash: "دفع نقداً",
  paySelectedCash: "دفع المحدد نقداً",
  payCardTerminal: "دفع بالبطاقة (Terminal)",
  paySelectedTerminal: "دفع المحدد (Terminal)",
  cardManual: "بطاقة يدوياً",
  paySelectedManual: "دفع المحدد (بطاقة يدوية)",
  payOnline: "دفع عبر الإنترنت",
  recordPending: "تسجيل كمعلّق",
  markPaid: "تعيين كمدفوع",
  checkStripe: "تحقق من Stripe",
  printTicket: "طباعة التذكرة",
  printReceipt: "طباعة الإيصال",
  refund: "استرداد",
  cancelOrder: "إلغاء الطلب",
  seat: "مقعد {number}",
  cancelConfirm:
    "إلغاء الطلب {label}؟\n\nلا يمكن التراجع. ستُلغى المدفوعات المعلّقة.",
  cancelConfirmSure: "تأكيد إلغاء {label}؟",
  refundConfirm: "استرداد الرصيد المتبقي لـ {id}؟",
  statusSimulatedReader:
    "قارئ محاكى: تقديم بطاقة الاختبار 4242… (بدون واجهة لمس)",
  statusWaitingTerminal: "بانتظار البطاقة على قارئ Terminal…",
  statusWaitingWebhook: "بانتظار تأكيد webhook من Stripe…",
  statusCardSucceeded: "نجح الدفع بالبطاقة.",
  statusOrderCancelled: "تم إلغاء الطلب.",
  statusCheckingStripe: "جارٍ التحقق من حالة Stripe PaymentIntent…",
  receipt: "إيصال",
  paid: "مدفوع",
  receivedBy: "استُلم بواسطة",
  netExclVat: "الصافي (بدون ضريبة)",
  vatPercent: "ضريبة القيمة المضافة {percent}%",
  totalInclVat: "الإجمالي (شامل الضريبة)",
  thankYou: "شكراً — يرجى الاحتفاظ بهذا الإيصال.",
  partialRefund: " (استرداد جزئي)",
  walkInTitle: "{queue} · حضور مباشر",
  pickupTicket: "تذكرة الاستلام",
  yourNumber: "رقمك",
  payAtCounter: "ادفع عند الكاونتر · طلب {id}",
  guestWalkIn: "{name} · حضور مباشر",
  newWalkIn: "حضور مباشر جديد",
  walkInCreated: "تم إنشاء الحضور المباشر · ادفع عند الصندوق",
  printPickupTicket: "طباعة تذكرة الاستلام",
  done: "تم",
  anotherWalkIn: "حضور مباشر آخر",
  walkInHint: "عيّن رقم الاستلام، اطبع التذكرة، ثم استلم الدفع.",
  guestNameOptional: "اسم الضيف (اختياري)",
  guestPlaceholder: "ضيف",
  loadingMenu: "جارٍ تحميل القائمة…",
  noActiveMenuItems: "لا توجد أصناف قائمة نشطة.",
  cart: "السلة ·",
  itemsCount: "{count} أصناف",
  creating: "جارٍ الإنشاء…",
  createAssignNumber: "إنشاء وتعيين رقم",
  addAtLeastOneItem: "أضف صنفاً واحداً على الأقل",
  decreaseAria: "إنقاص {name}",
  increaseAria: "زيادة {name}",
  menuAvailability: "توفر القائمة",
  menuAvailabilityHint:
    "علّم الأصناف النافدة كمباعة بالكامل. لا يزال الضيوف يرونها غير متاحة.",
  available: "متاح",
  soldOut: "نفد",
  branch: "الفرع",
  noBranchesAvailable: "لا توجد فروع متاحة",
  stripeTerminalReader: "قارئ Stripe Terminal",
  terminalHelp:
    "كل حركة Terminal تمر عبر /api/payments/terminal/* (رمز الاتصال، قائمة القراء، التسجيل). المحاكاة لا تحتاج أجهزة. الفعلي: عيّن PAYMENT_PROVIDER=stripe و STRIPE_TERMINAL=1 و STRIPE_TERMINAL_LOCATION_ID على الواجهة، ثم سجّل رمز اقتران الجهاز هنا.",
  location: "الموقع:",
  notConfigured: "غير مُعدّ",
  noLocationWarning:
    "لا موقع مُعدّ — سيفشل التسجيل/الاتصال حتى يُعيَّن معرّف الموقع.",
  simulated: "محاكى",
  physical: "فعلي",
  connecting: "جارٍ الاتصال…",
  connectTest: "اتصال / اختبار",
  preferredReader: "القارئ المفضّل",
  firstDiscovered: "أول مكتشف في الموقع",
  registrationCode: "رمز التسجيل",
  label: "التسمية",
  registering: "جارٍ التسجيل…",
  registerReader: "تسجيل القارئ",
  refreshList: "تحديث القائمة",
  usingSimulated: "استخدام قارئ محاكى (محلي/CI).",
  physicalModeHint: "الوضع الفعلي — سجّل/اختر قارئاً ثم اتصل.",
  registerFailed: "فشل التسجيل",
  connectFailed: "فشل الاتصال",
  registeredReader: "تم تسجيل {label}",
  connectedPhysical: "تم الاتصال بـ {label}.",
  connectedSimulated: "تم الاتصال بالقارئ المحاكى {label}.",
};

const so: Messages = {
  language: "Luqadda",
  footer:
    "© 2026 MayleSoft Restaurant Platform · Naqshadeeye Eng. Hasan Kamaal",
  close: "Xir",
  print: "Daabac",
  guest: "Marti",
  walkIn: "Walk-in",
  restaurant: "Makhaayad",
  item: "Shey",
  all: "Dhammaan",
  other: "Kale",
  total: "Wadarta",
  tip: "Tips",
  order: "Amarka",
  loading: "Waa la soo rarayaa…",
  loginKicker: "Madasha makhaayadaha",
  loginHeadline: "Khasnaji",
  loginBody: "Soo gal si aad u qaadato lacagaha amarrada salka.",
  loginEmail: "Iimayl",
  loginPassword: "Furaha",
  loginSubmit: "Soo gal",
  loginSigningIn: "Waa la soo galayaa…",
  loginFailed: "Soo galitaanku wuu fashilmay",
  loginRoleDenied:
    "Doorka {role} kama geli karo till-ka Khasnajiga. Isticmaal konsolka Maamulka.",
  checkingSession: "Waa la hubinayaa fadhiga…",
  till: "Till",
  cashier: "Khasnaji",
  signOut: "Ka bax",
  paymentsTitle: "Lacagaha",
  paymentsSubtitle:
    "U kala qaybi shey · tips · soo celin · ONLINE iyada oo loo maro {provider}{terminal}",
  paymentsSubtitleTerminal: " · KAARKA Terminal",
  liveFeed: "Quudka tooska ah:",
  connected: "isku xiran",
  polling: "polling",
  openUnpaid: "Furanyaal aan la bixin",
  paidOnFloor: "Lagu bixiyay salka",
  todaysPaid: "Maanta la bixiyay",
  tillTotal: "Wadarta till-ka",
  ordersCount: "{count} amar",
  closedCount: "{count} xiran",
  activeTickets: "Tickets firfircoon",
  loadingBranches: "Laamaha waa la soo rarayaa…",
  loadingOrders: "Amarrada waa la soo rarayaa…",
  needsPayment: "U baahan lacag ({count})",
  noOpenUnpaid: "Ma jiraan amar furan oo aan la bixin.",
  settled: "La xaliyay ({count})",
  noSettled: "Ma jiraan amar firfircoon oo la xaliyay.",
  todaysPaidSection: "Maanta la bixiyay ({count})",
  loadingTodaysPaid: "Lacagaha maanta waa la soo rarayaa…",
  noClosedPaidToday: "Weli ma jiraan amar xiran oo la bixiyay maanta.",
  tableLabel: "Miiska {number}",
  paymentsCount: "{count} lacagood",
  paymentsCountOne: "1 lacag",
  noPayment: "lacag ma jirto",
  dueOf: "Lagu leeyahay {due} ee {total}",
  selected: "La doortay",
  balanceDue: "Hadhaaga la leeyahay",
  tipOptional: "Tips (ikhtiyaari)",
  tipOnSplit: " · qaybtan",
  splitHint: "Qaybintu waa safafka oo dhan (ma aha unug kasta).",
  payCash: "Lacag caddaan ah",
  paySelectedCash: "Bixi kuwa la doortay caddaan",
  payCardTerminal: "Kaarka (Terminal)",
  paySelectedTerminal: "Bixi kuwa la doortay (Terminal)",
  cardManual: "Kaarka gacanta",
  paySelectedManual: "Bixi kuwa la doortay (kaarka gacanta)",
  payOnline: "Bixi online",
  recordPending: "Diiwaangeli sugitaan",
  markPaid: "Calaamadee la bixiyay",
  checkStripe: "Hubi Stripe",
  printTicket: "Daabac ticket",
  printReceipt: "Daabac rasiidhka",
  refund: "Soo celi",
  cancelOrder: "Jooji amarka",
  seat: "kursi {number}",
  cancelConfirm:
    "Jooji amarka {label}?\n\nTan dib looma celin karo. Lacagaha sugaya waa la burinayaa.",
  cancelConfirmSure: "Xaqiiji joojinta {label}?",
  refundConfirm: "Soo celi hadhaaga amarka {id}?",
  statusSimulatedReader:
    "Akhriyaha simulated: kaarka tijaabada 4242… (UI taabasho ma jirto)",
  statusWaitingTerminal: "Sugaya kaarka akhrinaha Terminal…",
  statusWaitingWebhook: "Sugaya xaqiijinta Stripe webhook…",
  statusCardSucceeded: "Lacag-bixinta kaarka way guulaysatay.",
  statusOrderCancelled: "Amarka waa la joojiyay.",
  statusCheckingStripe: "Waa la hubinayaa xaaladda Stripe PaymentIntent…",
  receipt: "Rasiidh",
  paid: "La bixiyay",
  receivedBy: "Qaate",
  netExclVat: "Safi (VAT la'aan)",
  vatPercent: "VAT {percent}%",
  totalInclVat: "Wadarta (VAT ku jira)",
  thankYou: "Mahadsanid — hayso rasiidhan.",
  partialRefund: " (soo celin qayb)",
  walkInTitle: "{queue} · Walk-in",
  pickupTicket: "Ticket-ka qaadista",
  yourNumber: "Lambarkaaga",
  payAtCounter: "Ka bixi counter-ka · Amar {id}",
  guestWalkIn: "{name} · Walk-in",
  newWalkIn: "Walk-in cusub",
  walkInCreated: "Walk-in la abuuray · ka bixi till-ka",
  printPickupTicket: "Daabac ticket-ka qaadista",
  done: "Dhameystiran",
  anotherWalkIn: "Walk-in kale",
  walkInHint: "U qoondee lambar qaadis, daabac ticket, ka dib qaado lacagta.",
  guestNameOptional: "Magaca martida (ikhtiyaari)",
  guestPlaceholder: "Marti",
  loadingMenu: "Liiska waa la soo rarayaa…",
  noActiveMenuItems: "Ma jiraan sheyo liis firfircoon.",
  cart: "Gaadhiga ·",
  itemsCount: "{count} shey",
  creating: "Waa la abuurayaa…",
  createAssignNumber: "Abuur oo u qoondee lambar",
  addAtLeastOneItem: "Ku dar ugu yaraan hal shey",
  decreaseAria: "Yarree {name}",
  increaseAria: "Kordhi {name}",
  menuAvailability: "Helitaanka liiska",
  menuAvailabilityHint:
    "Calaamadee sheyada dhamaaday inay iibteen. Martidu weli way arkaan inaysan diyaar ahayn.",
  available: "Diyaar",
  soldOut: "Dhamaaday",
  branch: "Laan",
  noBranchesAvailable: "Laamo ma jiraan",
  stripeTerminalReader: "Akhriyaha Stripe Terminal",
  terminalHelp:
    "Dhammaan Terminal-ku wuxuu maraa /api/payments/terminal/* (token xiriir, liiska akhrinayaasha, diiwaangelin). Simulated uma baahna qalab. Physical: deji PAYMENT_PROVIDER=stripe, STRIPE_TERMINAL=1, iyo STRIPE_TERMINAL_LOCATION_ID API-ga, ka dib halkan ku diiwaangeli koodka isku xidhka.",
  location: "Goobta:",
  notConfigured: "lama dejin",
  noLocationWarning:
    "Goob lama dejin — diiwaangelinta/xiriirku wuu fashilmi doonaa ilaa Location ID la dejiyo.",
  simulated: "Simulated",
  physical: "Physical",
  connecting: "Waa la xiriirinayaa…",
  connectTest: "Xiriiri / tijaabi",
  preferredReader: "Akhriyaha doorbidan",
  firstDiscovered: "Kii ugu horreeyay ee laga helay goobta",
  registrationCode: "Koodka diiwaangelinta",
  label: "Summad",
  registering: "Waa la diiwaangelinayaa…",
  registerReader: "Diiwaangeli akhriyaha",
  refreshList: "Cusbooneysii liiska",
  usingSimulated: "Isticmaalaya akhriyaha simulated (local/CI).",
  physicalModeHint:
    "Habka physical — diiwaangeli/dooro akhriye, ka dib Xiriiri.",
  registerFailed: "Diiwaangelintu way fashilantay",
  connectFailed: "Xiriirku wuu fashilmay",
  registeredReader: "La diiwaangeliyay {label}",
  connectedPhysical: "Lagu xiriiray {label}.",
  connectedSimulated: "Lagu xiriiray akhriyaha simulated {label}.",
};

export const MESSAGES: Record<Locale, Messages> = { en, fi, ar, so };

export function translate(
  locale: Locale,
  key: MessageKey,
  vars?: Record<string, string | number>,
) {
  let text = MESSAGES[locale][key] ?? MESSAGES.en[key] ?? key;
  if (vars) {
    for (const [name, value] of Object.entries(vars)) {
      text = text.replaceAll(`{${name}}`, String(value));
    }
  }
  return text;
}
