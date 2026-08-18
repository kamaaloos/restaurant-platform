import type { Locale } from "./locales";

export type MessageKey =
  | "language"
  | "cancel"
  | "edit"
  | "delete"
  | "save"
  | "saving"
  | "creating"
  | "copied"
  | "active"
  | "inactive"
  | "actions"
  | "status"
  | "name"
  | "email"
  | "phone"
  | "restaurant"
  | "branch"
  | "noRestaurants"
  | "noBranches"
  | "selectBranchFirst"
  | "selectRestaurantFirst"
  | "uploadImage"
  | "uploading"
  | "uploadFailed"
  | "signOut"
  | "checkingSession"
  | "opsConsole"
  | "adminFallback"
  | "navOverview"
  | "navRestaurants"
  | "navBranches"
  | "navTables"
  | "navDevices"
  | "navMenu"
  | "navUsers"
  | "rolePlatformAdmin"
  | "roleRestaurantOwner"
  | "roleBranchManager"
  | "roleWaiter"
  | "roleChef"
  | "roleCashier"
  | "loginKicker"
  | "loginHeadline"
  | "loginBody"
  | "loginEmail"
  | "loginPassword"
  | "loginShowPassword"
  | "loginHidePassword"
  | "loginSubmit"
  | "loginSigningIn"
  | "loginFailed"
  | "loginCashierHint"
  | "loginRoleDenied"
  | "loginHeroKicker"
  | "loginHeroBody"
  | "loginHeroAlt"
  | "footerCopy"
  | "overviewTitle"
  | "overviewSignedIn"
  | "overviewLinkRestaurantsBody"
  | "overviewLinkBranchesBody"
  | "overviewLinkTablesBody"
  | "overviewLinkDevicesBody"
  | "overviewLinkMenuBody"
  | "kitchenService"
  | "kitchenServiceBody"
  | "selectABranch"
  | "kitchenNew"
  | "kitchenPreparing"
  | "kitchenReady"
  | "kitchenAvgPrep"
  | "kitchenOldestTicket"
  | "kitchenOpenSummary"
  | "latencySlos"
  | "latencySlosBody"
  | "prepP95"
  | "prepSlo"
  | "paySettleP95"
  | "paySlo"
  | "sloThresholds"
  | "sloAvgSettle"
  | "quickOps"
  | "quickOps1"
  | "quickOps2"
  | "quickOps3"
  | "sloOk"
  | "sloBreach"
  | "sloNoData"
  | "secondsUnit"
  | "minutesUnit"
  | "minutesSeconds"
  | "tablesTitle"
  | "tablesSubtitle"
  | "tableNumberPlaceholder"
  | "addTable"
  | "saveTable"
  | "colTable"
  | "colSeats"
  | "colQrToken"
  | "colManage"
  | "colQr"
  | "copyQrLink"
  | "printQr"
  | "rotateQr"
  | "deleteTable"
  | "occupiedCannotDelete"
  | "confirmDeleteTable"
  | "confirmRotateQr"
  | "loadingTables"
  | "loadingBranches"
  | "printScanToOrder"
  | "printButton"
  | "printPopupBlocked"
  | "qrPrintTitle"
  | "qrScanMe"
  | "qrStyleTitle"
  | "qrStyleBody"
  | "qrFrameColor"
  | "qrModuleColor"
  | "qrLogoHint"
  | "saveQrStyle"
  | "qrStyleSaved"
  | "statusAvailable"
  | "statusOccupied"
  | "statusReserved"
  | "devicesTitle"
  | "devicesSubtitle"
  | "deviceNamePlaceholder"
  | "createDevice"
  | "loadingDevices"
  | "lastSeen"
  | "noExpirySet"
  | "expiresOn"
  | "expiredOn"
  | "rotateSoon"
  | "refreshCode"
  | "issuePairingCode"
  | "rotateNow"
  | "rotateToken"
  | "confirmRevokeDevice"
  | "revoke"
  | "tokenPreview"
  | "copyToken"
  | "fullTokenHint"
  | "pairingCode"
  | "expiresAt"
  | "copyCode"
  | "noActivePairingCode"
  | "scanTabletHint"
  | "pairingQrAlt"
  | "deviceTypeKitchen"
  | "deviceTypeWaiter"
  | "deviceTypeCashier"
  | "deviceTypeCustomerDisplay"
  | "deviceTypeManager"
  | "restaurantsTitle"
  | "restaurantsSubtitle"
  | "branchesTitle"
  | "branchesSubtitle"
  | "branchesSubtitleNamed"
  | "editRestaurant"
  | "newRestaurant"
  | "cancelEdit"
  | "restaurantNamePlaceholder"
  | "slugPlaceholder"
  | "slugTitle"
  | "guestSite"
  | "slugHintNoDomain"
  | "contactEmail"
  | "phonePlaceholder"
  | "addressOptional"
  | "logo"
  | "uploadLogo"
  | "pasteLogoUrl"
  | "accent"
  | "buttonColor"
  | "paper"
  | "saveChanges"
  | "createRestaurant"
  | "restaurantUpdated"
  | "restaurantCreated"
  | "restaurantDeactivated"
  | "restaurantReactivated"
  | "confirmDeactivateRestaurant"
  | "noRestaurantAssigned"
  | "customerBrand"
  | "customerBrandBody"
  | "saveBrand"
  | "customerBrandSaved"
  | "newBranch"
  | "restaurantColon"
  | "noRestaurantsYet"
  | "inactiveSuffix"
  | "branchNamePlaceholder"
  | "createBranch"
  | "branchCreated"
  | "walkInRotated"
  | "branchCreateRestricted"
  | "loadingRestaurants"
  | "colBranches"
  | "deactivate"
  | "reactivate"
  | "noBranchesYet"
  | "walkInGuestLinks"
  | "walkInGuestLinksBody"
  | "copyWalkInUrl"
  | "rotateWalkInToken"
  | "colBranch"
  | "usersTitle"
  | "usersNoPermission"
  | "usersNoRestaurant"
  | "usersSubtitleAdmin"
  | "usersSubtitleOwner"
  | "yourRestaurant"
  | "filterByBranch"
  | "allBranches"
  | "editUser"
  | "newUser"
  | "passwordRequired"
  | "userUpdated"
  | "userCreated"
  | "userDeactivated"
  | "userReactivated"
  | "confirmDeactivateUser"
  | "passwordOptional"
  | "passwordMin"
  | "firstName"
  | "lastName"
  | "noBranchOwner"
  | "selectBranchRecommended"
  | "createUser"
  | "selectRestaurantToViewUsers"
  | "loadingUsers"
  | "noUsersYet"
  | "colName"
  | "menuTitle"
  | "menuSubtitle"
  | "categoryNameRequired"
  | "itemNameRequired"
  | "selectCategory"
  | "enterValidPrice"
  | "confirmDeleteCategory"
  | "confirmDeactivateItem"
  | "editCategory"
  | "newCategory"
  | "categoryNamePlaceholder"
  | "updateCategory"
  | "addCategory"
  | "editItem"
  | "newItem"
  | "itemNamePlaceholder"
  | "descriptionOptional"
  | "noImage"
  | "customUrl"
  | "uploadMenuPhoto"
  | "menuPhotoLibrary"
  | "menuPhotoLibraryBody"
  | "menuPhotoEmpty"
  | "samplePhotos"
  | "pricePlaceholder"
  | "activeOnCustomerMenu"
  | "updateItem"
  | "addItem"
  | "categories"
  | "allItems"
  | "loadingRestaurant"
  | "loadingItems"
  | "noItemsYet"
  | "noImg"
  | "onMenu"
  | "hidden"
  | "available"
  | "soldOut"
  | "markSoldOut"
  | "markAvailable"
  | "hideFromMenu"
  | "showOnMenu"
  | "menuBackgroundReel"
  | "menuBackgroundReelBody"
  | "remove"
  | "noCustomBackgrounds"
  | "uploadBackground"
  | "pasteImageUrl"
  | "addUrl";

type Messages = Record<MessageKey, string>;

const en: Messages = {
  language: "Language",
  cancel: "Cancel",
  edit: "Edit",
  delete: "Delete",
  save: "Save",
  saving: "Saving…",
  creating: "Creating…",
  copied: "Copied",
  active: "Active",
  inactive: "Inactive",
  actions: "Actions",
  status: "Status",
  name: "Name",
  email: "Email",
  phone: "Phone",
  restaurant: "Restaurant",
  branch: "Branch",
  noRestaurants: "No restaurants available",
  noBranches: "No branches for this restaurant",
  selectBranchFirst: "Select a branch first.",
  selectRestaurantFirst: "Select a restaurant first.",
  uploadImage: "Upload image",
  uploading: "Uploading…",
  uploadFailed: "Upload failed",
  signOut: "Sign out",
  checkingSession: "Checking session…",
  opsConsole: "Ops console",
  adminFallback: "Admin",
  navOverview: "Overview",
  navRestaurants: "Restaurants",
  navBranches: "Branches",
  navTables: "Tables",
  navDevices: "Devices",
  navMenu: "Menu",
  navUsers: "Users",
  rolePlatformAdmin: "Platform admin",
  roleRestaurantOwner: "Restaurant owner",
  roleBranchManager: "Branch manager",
  roleWaiter: "Waiter",
  roleChef: "Chef",
  roleCashier: "Cashier",
  loginKicker: "Restaurant platform",
  loginHeadline: "Admin",
  loginBody: "Sign in to manage tables, devices, and the menu.",
  loginEmail: "Email",
  loginPassword: "Password",
  loginShowPassword: "Show password",
  loginHidePassword: "Hide password",
  loginSubmit: "Sign in",
  loginSigningIn: "Signing in…",
  loginFailed: "Login failed",
  loginCashierHint:
    "Cashiers use the Cashier till — not the Admin console.",
  loginRoleDenied: "Role {role} cannot access the Admin console.",
  loginHeroKicker: "Floor to kitchen",
  loginHeroBody: "Tables, devices, and menu — one calm console.",
  loginHeroAlt: "Restaurant dining room",
  footerCopy:
    "© 2026 MayleSoft Restaurant Platform · Designed by Eng. Hasan Kamaal",
  overviewTitle: "Overview",
  overviewSignedIn: "Signed in as {email} ({role})",
  overviewLinkRestaurantsBody: "Create restaurants and branches.",
  overviewLinkBranchesBody: "Add and manage branches for your restaurant.",
  overviewLinkTablesBody: "Create tables and copy customer QR links.",
  overviewLinkDevicesBody:
    "Create kitchen/waiter devices; pair with short-lived QR codes.",
  overviewLinkMenuBody: "Add categories and items for the QR menu.",
  kitchenService: "Kitchen service",
  kitchenServiceBody: "Live ticket pressure for the selected branch",
  selectABranch: "Select a branch",
  kitchenNew: "New",
  kitchenPreparing: "Preparing",
  kitchenReady: "Ready",
  kitchenAvgPrep: "Avg prep",
  kitchenOldestTicket: "Oldest ticket",
  kitchenOpenSummary:
    "{open} open · avg wait {wait}m · {accepted} accepted",
  latencySlos: "Latency SLOs",
  latencySlosBody:
    "4h lookback · prep PREPARING→READY · pay created→paid · scrape /api/metrics",
  prepP95: "Prep p95",
  prepSlo: "Prep SLO",
  paySettleP95: "Pay settle p95",
  paySlo: "Pay SLO",
  sloThresholds: "Thresholds · prep {prep} · pay {pay}",
  sloAvgSettle: " · avg settle {settle}",
  quickOps: "Quick ops loop",
  quickOps1: "Create a table and copy its QR ordering link.",
  quickOps2: "Create KITCHEN and WAITER devices; pair tokens on those apps.",
  quickOps3: "Keep the menu current so customers can order.",
  sloOk: "OK",
  sloBreach: "Breach",
  sloNoData: "No data",
  secondsUnit: "{n}s",
  minutesUnit: "{m}m",
  minutesSeconds: "{m}m {s}s",
  tablesTitle: "Tables",
  tablesSubtitle:
    "Add, edit, or remove floor tables and copy customer QR ordering links.",
  tableNumberPlaceholder: "Table number (e.g. A3)",
  addTable: "Add table",
  saveTable: "Save table",
  colTable: "Table",
  colSeats: "Seats",
  colQrToken: "QR token",
  colManage: "Manage",
  colQr: "QR",
  copyQrLink: "Copy QR link",
  printQr: "Print QR",
  rotateQr: "Rotate QR",
  deleteTable: "Delete table",
  occupiedCannotDelete: "Occupied tables cannot be deleted",
  confirmDeleteTable:
    "Delete table {number}? Occupied tables cannot be deleted.",
  confirmRotateQr:
    "Rotate QR for table {number}? Old links will stop working.",
  loadingTables: "Loading tables…",
  loadingBranches: "Loading branches…",
  printScanToOrder: "Scan to order",
  printButton: "Print",
  printPopupBlocked: "Allow pop-ups for this site to print the QR code.",
  qrPrintTitle: "Table {number} QR",
  qrScanMe: "Scan Me",
  qrStyleTitle: "QR card style",
  qrStyleBody:
    "Colors and logo for printed table QR cards (Scan Me + tray).",
  qrFrameColor: "Frame & heading",
  qrModuleColor: "QR color",
  qrLogoHint: "Shown in the center of the code. Use a square logo.",
  saveQrStyle: "Save QR style",
  qrStyleSaved: "QR print style saved.",
  statusAvailable: "Available",
  statusOccupied: "Occupied",
  statusReserved: "Reserved",
  devicesTitle: "Devices",
  devicesSubtitle:
    "Pair displays with a short-lived QR code. Long-lived tokens are shown only when created or rotated.",
  deviceNamePlaceholder: "Device name (e.g. Kitchen TV 1)",
  createDevice: "Create device",
  loadingDevices: "Loading devices…",
  lastSeen: "last seen {when}",
  noExpirySet: "No expiry set",
  expiresOn: "Expires {date}",
  expiredOn: "Expired {date}",
  rotateSoon: " — rotate soon",
  refreshCode: "Refresh code",
  issuePairingCode: "Issue pairing code",
  rotateNow: "Rotate now",
  rotateToken: "Rotate token",
  confirmRevokeDevice:
    "Revoke {name}? The tablet must be re-paired after rotate.",
  revoke: "Revoke",
  tokenPreview: "Token preview",
  copyToken: "Copy token",
  fullTokenHint: "(full token shown only after create/rotate)",
  pairingCode: "Pairing code",
  expiresAt: "expires {time}",
  copyCode: "Copy code",
  noActivePairingCode: "No active pairing code — issue one to show a QR.",
  scanTabletHint:
    "Scan with the tablet camera, or open {url} and paste the pairing code (one-time, ~10 minutes).",
  pairingQrAlt: "{name} pairing",
  deviceTypeKitchen: "Kitchen",
  deviceTypeWaiter: "Waiter",
  deviceTypeCashier: "Cashier",
  deviceTypeCustomerDisplay: "Customer display",
  deviceTypeManager: "Manager",
  restaurantsTitle: "Restaurants",
  restaurantsSubtitle:
    "Create, edit, and deactivate restaurants. Add branches after creating a restaurant.",
  branchesTitle: "Branches",
  branchesSubtitle: "Add and manage branches.",
  branchesSubtitleNamed: "Add and manage branches for {name}.",
  editRestaurant: "Edit restaurant",
  newRestaurant: "New restaurant",
  cancelEdit: "Cancel edit",
  restaurantNamePlaceholder: "Restaurant name",
  slugPlaceholder: "Subdomain slug (e.g. alhuda)",
  slugTitle: "Lowercase letters, numbers, and hyphens",
  guestSite: "Guest site: {url}",
  slugHintNoDomain:
    "Used for guest subdomain (set NEXT_PUBLIC_ROOT_DOMAIN on admin + customer).",
  contactEmail: "Contact email",
  phonePlaceholder: "Phone",
  addressOptional: "Address (optional)",
  logo: "Logo",
  uploadLogo: "Upload logo",
  pasteLogoUrl: "Or paste logo URL",
  accent: "Accent",
  buttonColor: "Button",
  paper: "Paper",
  saveChanges: "Save changes",
  createRestaurant: "Create restaurant",
  restaurantUpdated: "Updated “{name}”.",
  restaurantCreated: "Created “{name}”. Add a branch next.",
  restaurantDeactivated: "Deactivated “{name}”.",
  restaurantReactivated: "Reactivated “{name}”.",
  confirmDeactivateRestaurant:
    "Deactivate “{name}”? You can reactivate it later by editing.",
  noRestaurantAssigned: "No restaurant assigned",
  customerBrand: "Customer brand",
  customerBrandBody:
    "Logo, colors, and cinematic background reel for the guest menu.",
  saveBrand: "Save brand",
  customerBrandSaved: "Customer brand saved.",
  newBranch: "New branch",
  restaurantColon: "Restaurant:",
  noRestaurantsYet: "No restaurants yet",
  inactiveSuffix: " (inactive)",
  branchNamePlaceholder: "Branch name (e.g. Helsinki Downtown)",
  createBranch: "Create branch",
  branchCreated: "Branch “{name}” created. Walk-in: {url}",
  walkInRotated: "Rotated walk-in link for “{name}”: {url}",
  branchCreateRestricted:
    "Branch creation is limited to restaurant owners and platform admins.",
  loadingRestaurants: "Loading restaurants…",
  colBranches: "Branches",
  deactivate: "Deactivate",
  reactivate: "Reactivate",
  noBranchesYet: "No branches yet. Create one above.",
  walkInGuestLinks: "Walk-in guest links",
  walkInGuestLinksBody:
    "Share these opaque URLs with guests. Rotating invalidates the old link. Pickup TV pairing uses the same token in the path.",
  copyWalkInUrl: "Copy walk-in URL",
  rotateWalkInToken: "Rotate walk-in token",
  colBranch: "Branch",
  usersTitle: "Users",
  usersNoPermission: "You do not have permission to manage staff accounts.",
  usersNoRestaurant:
    "Your account is not assigned to a restaurant. Ask a platform admin to fix this.",
  usersSubtitleAdmin:
    "View and manage staff for a selected restaurant. Filter by branch to classify who works where.",
  usersSubtitleOwner: "View and manage staff for your restaurant branches.",
  yourRestaurant: "Your restaurant",
  filterByBranch: "Filter by branch",
  allBranches: "All branches",
  editUser: "Edit user",
  newUser: "New user",
  passwordRequired: "Password is required for new users.",
  userUpdated: "Updated {email}.",
  userCreated: "Created {email}.",
  userDeactivated: "Deactivated {email}.",
  userReactivated: "Reactivated {email}.",
  confirmDeactivateUser: "Deactivate {email}?",
  passwordOptional: "New password (optional)",
  passwordMin: "Password (min 8)",
  firstName: "First name",
  lastName: "Last name",
  noBranchOwner: "No branch (owner)",
  selectBranchRecommended: "Select branch (recommended)",
  createUser: "Create user",
  selectRestaurantToViewUsers: "Select a restaurant to view its users.",
  loadingUsers: "Loading users…",
  noUsersYet: "No users for this scope yet.",
  colName: "Name",
  menuTitle: "Menu",
  menuSubtitle:
    "Manage catalog items. Mark sold out when finished; activate again when available.",
  categoryNameRequired: "Category name is required",
  itemNameRequired: "Item name is required",
  selectCategory: "Select category",
  enterValidPrice: "Enter a valid price.",
  confirmDeleteCategory:
    "Delete category “{name}”? It must have no menu items.",
  confirmDeactivateItem:
    "Deactivate “{name}”? It will be hidden from the customer menu.",
  editCategory: "Edit category",
  newCategory: "New category",
  categoryNamePlaceholder: "Category name",
  updateCategory: "Update category",
  addCategory: "Add category",
  editItem: "Edit item",
  newItem: "New item",
  itemNamePlaceholder: "Item name",
  descriptionOptional: "Description (optional)",
  noImage: "No image",
  customUrl: "Custom URL…",
  uploadMenuPhoto: "Upload menu photo",
  menuPhotoLibrary: "This restaurant’s photos",
  menuPhotoLibraryBody:
    "Upload once, then tap a photo to assign it to the dish. Each restaurant has its own library.",
  menuPhotoEmpty: "No uploads yet. Add a photo for this restaurant.",
  samplePhotos: "Sample photos",
  pricePlaceholder: "Price",
  activeOnCustomerMenu: "Active on customer menu",
  updateItem: "Update item",
  addItem: "Add item",
  categories: "Categories",
  allItems: "All items",
  loadingRestaurant: "Loading restaurant…",
  loadingItems: "Loading items…",
  noItemsYet: "No items yet.",
  noImg: "No img",
  onMenu: "On menu",
  hidden: "Hidden",
  available: "Available",
  soldOut: "Sold out",
  markSoldOut: "Mark sold out",
  markAvailable: "Mark available",
  hideFromMenu: "Hide from menu",
  showOnMenu: "Show on menu",
  menuBackgroundReel: "Menu background reel",
  menuBackgroundReelBody:
    "Add up to 12 images. Order = cinematic crossfade order. Empty = default scenes.",
  remove: "Remove",
  noCustomBackgrounds: "No custom backgrounds yet.",
  uploadBackground: "Upload background",
  pasteImageUrl: "Or paste image URL",
  addUrl: "Add URL",
};

const fi: Messages = {
  language: "Kieli",
  cancel: "Peruuta",
  edit: "Muokkaa",
  delete: "Poista",
  save: "Tallenna",
  saving: "Tallennetaan…",
  creating: "Luodaan…",
  copied: "Kopioitu",
  active: "Aktiivinen",
  inactive: "Ei aktiivinen",
  actions: "Toiminnot",
  status: "Tila",
  name: "Nimi",
  email: "Sähköposti",
  phone: "Puhelin",
  restaurant: "Ravintola",
  branch: "Toimipiste",
  noRestaurants: "Ei ravintoloita",
  noBranches: "Ei toimipisteitä tälle ravintolalle",
  selectBranchFirst: "Valitse ensin toimipiste.",
  selectRestaurantFirst: "Valitse ensin ravintola.",
  uploadImage: "Lataa kuva",
  uploading: "Ladataan…",
  uploadFailed: "Lataus epäonnistui",
  signOut: "Kirjaudu ulos",
  checkingSession: "Tarkistetaan istuntoa…",
  opsConsole: "Hallinta",
  adminFallback: "Hallinta",
  navOverview: "Yleiskatsaus",
  navRestaurants: "Ravintolat",
  navBranches: "Toimipisteet",
  navTables: "Pöydät",
  navDevices: "Laitteet",
  navMenu: "Menu",
  navUsers: "Käyttäjät",
  rolePlatformAdmin: "Alustan ylläpitäjä",
  roleRestaurantOwner: "Ravintolan omistaja",
  roleBranchManager: "Toimipisteen esimies",
  roleWaiter: "Tarjoilija",
  roleChef: "Kokki",
  roleCashier: "Kassahenkilö",
  loginKicker: "Ravintola-alusta",
  loginHeadline: "Hallinta",
  loginBody: "Kirjaudu hallitsemaan pöytiä, laitteita ja menuua.",
  loginEmail: "Sähköposti",
  loginPassword: "Salasana",
  loginShowPassword: "Näytä salasana",
  loginHidePassword: "Piilota salasana",
  loginSubmit: "Kirjaudu sisään",
  loginSigningIn: "Kirjaudutaan…",
  loginFailed: "Kirjautuminen epäonnistui",
  loginCashierHint: "Kassahenkilöt käyttävät kassaa — ei hallintakonsolia.",
  loginRoleDenied: "Rooli {role} ei voi käyttää hallintakonsolia.",
  loginHeroKicker: "Salista keittiöön",
  loginHeroBody: "Pöydät, laitteet ja menu — yksi rauhallinen konsoli.",
  loginHeroAlt: "Ravintolasali",
  footerCopy:
    "© 2026 MayleSoft Restaurant Platform · Suunnittelu: ins. Hasan Kamaal",
  overviewTitle: "Yleiskatsaus",
  overviewSignedIn: "Kirjautunut: {email} ({role})",
  overviewLinkRestaurantsBody: "Luo ravintoloita ja toimipisteitä.",
  overviewLinkBranchesBody: "Lisää ja hallitse ravintolasi toimipisteitä.",
  overviewLinkTablesBody: "Luo pöytiä ja kopioi asiakkaiden QR-linkit.",
  overviewLinkDevicesBody:
    "Luo keittiö- ja tarjoilijalaitteita; parita lyhytkestoisilla QR-koodeilla.",
  overviewLinkMenuBody: "Lisää kategorioita ja annoksia QR-menuun.",
  kitchenService: "Keittiöpalvelu",
  kitchenServiceBody: "Valitun toimipisteen live-jonetilanne",
  selectABranch: "Valitse toimipiste",
  kitchenNew: "Uusi",
  kitchenPreparing: "Valmistuu",
  kitchenReady: "Valmis",
  kitchenAvgPrep: "Keskim. valmistus",
  kitchenOldestTicket: "Vanhin lipuke",
  kitchenOpenSummary:
    "{open} auki · keskim. odotus {wait} min · {accepted} hyväksytty",
  latencySlos: "Viive-SLOt",
  latencySlosBody:
    "4 h ikkuna · valmistus VALMISTUU→VALMIS · maksu luotu→maksettu · /api/metrics",
  prepP95: "Valmistus p95",
  prepSlo: "Valmistus-SLO",
  paySettleP95: "Maksun p95",
  paySlo: "Maksu-SLO",
  sloThresholds: "Kynnykset · valmistus {prep} · maksu {pay}",
  sloAvgSettle: " · keskim. selvitys {settle}",
  quickOps: "Nopea toimintakierto",
  quickOps1: "Luo pöytä ja kopioi sen QR-tilauslinkki.",
  quickOps2: "Luo KEITTIÖ- ja TARJOILIJA-laitteet; parita tokenit sovelluksissa.",
  quickOps3: "Pidä menu ajan tasalla, jotta asiakkaat voivat tilata.",
  sloOk: "OK",
  sloBreach: "Rikki",
  sloNoData: "Ei dataa",
  secondsUnit: "{n} s",
  minutesUnit: "{m} min",
  minutesSeconds: "{m} min {s} s",
  tablesTitle: "Pöydät",
  tablesSubtitle:
    "Lisää, muokkaa tai poista pöytiä ja kopioi asiakkaiden QR-tilauslinkit.",
  tableNumberPlaceholder: "Pöydän numero (esim. A3)",
  addTable: "Lisää pöytä",
  saveTable: "Tallenna pöytä",
  colTable: "Pöytä",
  colSeats: "Paikat",
  colQrToken: "QR-tunnus",
  colManage: "Hallinta",
  colQr: "QR",
  copyQrLink: "Kopioi QR-linkki",
  printQr: "Tulosta QR",
  rotateQr: "Vaihda QR",
  deleteTable: "Poista pöytä",
  occupiedCannotDelete: "Varattua pöytää ei voi poistaa",
  confirmDeleteTable:
    "Poistetaanko pöytä {number}? Varattuja pöytiä ei voi poistaa.",
  confirmRotateQr:
    "Vaihdetaanko QR pöydälle {number}? Vanhat linkit lakkaavat toimimasta.",
  loadingTables: "Ladataan pöytiä…",
  loadingBranches: "Ladataan toimipisteitä…",
  printScanToOrder: "Skannaa tilataksesi",
  printButton: "Tulosta",
  printPopupBlocked: "Salli ponnahdusikkunat tälle sivustolle QR-koodin tulostamiseksi.",
  qrPrintTitle: "Pöytä {number} QR",
  qrScanMe: "Skannaa",
  qrStyleTitle: "QR-kortin tyyli",
  qrStyleBody:
    "Värit ja logo tulostettaville pöytä-QR-korteille (Skannaa + tarjotin).",
  qrFrameColor: "Kehys ja otsikko",
  qrModuleColor: "QR-väri",
  qrLogoHint: "Näkyy koodin keskellä. Käytä neliölogoa.",
  saveQrStyle: "Tallenna QR-tyyli",
  qrStyleSaved: "QR-tulostustyyli tallennettu.",
  statusAvailable: "Vapaa",
  statusOccupied: "Varattu",
  statusReserved: "Varattu etukäteen",
  devicesTitle: "Laitteet",
  devicesSubtitle:
    "Parita näytöt lyhytkestoisella QR-koodilla. Pitkäkestoiset tokenit näytetään vain luonnin tai vaihdon yhteydessä.",
  deviceNamePlaceholder: "Laitteen nimi (esim. Keittiö-TV 1)",
  createDevice: "Luo laite",
  loadingDevices: "Ladataan laitteita…",
  lastSeen: "nähty viimeksi {when}",
  noExpirySet: "Ei vanhenemista",
  expiresOn: "Vanhenee {date}",
  expiredOn: "Vanhentunut {date}",
  rotateSoon: " — vaihda pian",
  refreshCode: "Päivitä koodi",
  issuePairingCode: "Luo parituskoodi",
  rotateNow: "Vaihda nyt",
  rotateToken: "Vaihda token",
  confirmRevokeDevice:
    "Perutaanko {name}? Tabletti on paritettava uudelleen vaihdon jälkeen.",
  revoke: "Peruuta laite",
  tokenPreview: "Tokenin esikatselu",
  copyToken: "Kopioi token",
  fullTokenHint: "(koko token näkyy vain luonnin/vaihdon jälkeen)",
  pairingCode: "Parituskoodi",
  expiresAt: "vanhenee {time}",
  copyCode: "Kopioi koodi",
  noActivePairingCode: "Ei aktiivista parituskoodia — luo koodi QR:ää varten.",
  scanTabletHint:
    "Skannaa tabletin kameralla tai avaa {url} ja liitä parituskoodi (kertakäyttö, ~10 min).",
  pairingQrAlt: "{name} paritus",
  deviceTypeKitchen: "Keittiö",
  deviceTypeWaiter: "Tarjoilija",
  deviceTypeCashier: "Kassa",
  deviceTypeCustomerDisplay: "Asiakasnäyttö",
  deviceTypeManager: "Esimies",
  restaurantsTitle: "Ravintolat",
  restaurantsSubtitle:
    "Luo, muokkaa ja deaktivoi ravintoloita. Lisää toimipisteet ravintolan jälkeen.",
  branchesTitle: "Toimipisteet",
  branchesSubtitle: "Lisää ja hallitse toimipisteitä.",
  branchesSubtitleNamed: "Lisää ja hallitse toimipisteitä ravintolalle {name}.",
  editRestaurant: "Muokkaa ravintolaa",
  newRestaurant: "Uusi ravintola",
  cancelEdit: "Peruuta muokkaus",
  restaurantNamePlaceholder: "Ravintolan nimi",
  slugPlaceholder: "Aliverkkotunnus (esim. alhuda)",
  slugTitle: "Pienet kirjaimet, numerot ja yhdysmerkit",
  guestSite: "Asiakassivusto: {url}",
  slugHintNoDomain:
    "Käytetään asiakkaan aliverkkotunnukseen (aseta NEXT_PUBLIC_ROOT_DOMAIN).",
  contactEmail: "Yhteyssähköposti",
  phonePlaceholder: "Puhelin",
  addressOptional: "Osoite (valinnainen)",
  logo: "Logo",
  uploadLogo: "Lataa logo",
  pasteLogoUrl: "Tai liitä logon URL",
  accent: "Korostus",
  buttonColor: "Painike",
  paper: "Paperi",
  saveChanges: "Tallenna muutokset",
  createRestaurant: "Luo ravintola",
  restaurantUpdated: "Päivitetty “{name}”.",
  restaurantCreated: "Luotu “{name}”. Lisää seuraavaksi toimipiste.",
  restaurantDeactivated: "Deaktivoitu “{name}”.",
  restaurantReactivated: "Aktivoitu uudelleen “{name}”.",
  confirmDeactivateRestaurant:
    "Deaktivoidaanko “{name}”? Voit aktivoida sen myöhemmin muokkaamalla.",
  noRestaurantAssigned: "Ravintolaa ei ole liitetty",
  customerBrand: "Asiakasbrändi",
  customerBrandBody:
    "Logo, värit ja taustakuvakaruselli asiakasmenuun.",
  saveBrand: "Tallenna brändi",
  customerBrandSaved: "Asiakasbrändi tallennettu.",
  newBranch: "Uusi toimipiste",
  restaurantColon: "Ravintola:",
  noRestaurantsYet: "Ei vielä ravintoloita",
  inactiveSuffix: " (ei aktiivinen)",
  branchNamePlaceholder: "Toimipisteen nimi (esim. Helsinki keskusta)",
  createBranch: "Luo toimipiste",
  branchCreated: "Toimipiste “{name}” luotu. Walk-in: {url}",
  walkInRotated: "Walk-in-linkki vaihdettu toimipisteelle “{name}”: {url}",
  branchCreateRestricted:
    "Toimipisteitä voivat luoda vain ravintolan omistajat ja alustan ylläpitäjät.",
  loadingRestaurants: "Ladataan ravintoloita…",
  colBranches: "Toimipisteet",
  deactivate: "Deaktivoi",
  reactivate: "Aktivoi",
  noBranchesYet: "Ei vielä toimipisteitä. Luo yksi yllä.",
  walkInGuestLinks: "Walk-in-asiakaslinkit",
  walkInGuestLinksBody:
    "Jaa nämä URL-osoitteet vieraille. Vaihto mitätöi vanhan linkin. Noutotelevisio käyttää samaa tunnusta polussa.",
  copyWalkInUrl: "Kopioi walk-in-URL",
  rotateWalkInToken: "Vaihda walk-in-tunnus",
  colBranch: "Toimipiste",
  usersTitle: "Käyttäjät",
  usersNoPermission: "Sinulla ei ole oikeutta hallita henkilöstötilejä.",
  usersNoRestaurant:
    "Tiliäsi ei ole liitetty ravintolaan. Pyydä alustan ylläpitäjää korjaamaan tämä.",
  usersSubtitleAdmin:
    "Tarkastele ja hallitse valitun ravintolan henkilöstöä. Suodata toimipisteen mukaan.",
  usersSubtitleOwner: "Tarkastele ja hallitse ravintolasi toimipisteiden henkilöstöä.",
  yourRestaurant: "Ravintolasi",
  filterByBranch: "Suodata toimipisteen mukaan",
  allBranches: "Kaikki toimipisteet",
  editUser: "Muokkaa käyttäjää",
  newUser: "Uusi käyttäjä",
  passwordRequired: "Uudelle käyttäjälle tarvitaan salasana.",
  userUpdated: "Päivitetty {email}.",
  userCreated: "Luotu {email}.",
  userDeactivated: "Deaktivoitu {email}.",
  userReactivated: "Aktivoitu uudelleen {email}.",
  confirmDeactivateUser: "Deaktivoidaanko {email}?",
  passwordOptional: "Uusi salasana (valinnainen)",
  passwordMin: "Salasana (väh. 8)",
  firstName: "Etunimi",
  lastName: "Sukunimi",
  noBranchOwner: "Ei toimipistettä (omistaja)",
  selectBranchRecommended: "Valitse toimipiste (suositus)",
  createUser: "Luo käyttäjä",
  selectRestaurantToViewUsers: "Valitse ravintola nähdäksesi käyttäjät.",
  loadingUsers: "Ladataan käyttäjiä…",
  noUsersYet: "Ei vielä käyttäjiä tälle rajaukselle.",
  colName: "Nimi",
  menuTitle: "Menu",
  menuSubtitle:
    "Hallitse annoksia. Merkitse loppuunmyydyksi; aktivoi uudelleen kun saatavilla.",
  categoryNameRequired: "Kategorian nimi on pakollinen",
  itemNameRequired: "Annoksen nimi on pakollinen",
  selectCategory: "Valitse kategoria",
  enterValidPrice: "Anna kelvollinen hinta.",
  confirmDeleteCategory:
    "Poistetaanko kategoria “{name}”? Siinä ei saa olla annoksia.",
  confirmDeactivateItem:
    "Deaktivoidaanko “{name}”? Se piilotetaan asiakasmenusta.",
  editCategory: "Muokkaa kategoriaa",
  newCategory: "Uusi kategoria",
  categoryNamePlaceholder: "Kategorian nimi",
  updateCategory: "Päivitä kategoria",
  addCategory: "Lisää kategoria",
  editItem: "Muokkaa annosta",
  newItem: "Uusi annos",
  itemNamePlaceholder: "Annoksen nimi",
  descriptionOptional: "Kuvaus (valinnainen)",
  noImage: "Ei kuvaa",
  customUrl: "Oma URL…",
  uploadMenuPhoto: "Lataa menukuva",
  menuPhotoLibrary: "Tämän ravintolan kuvat",
  menuPhotoLibraryBody:
    "Lataa kerran ja valitse kuva napauttamalla. Jokaisella ravintolalla on oma kuvakirjasto.",
  menuPhotoEmpty: "Ei latauksia vielä. Lisää kuva tälle ravintolalle.",
  samplePhotos: "Esimerkkikuvat",
  pricePlaceholder: "Hinta",
  activeOnCustomerMenu: "Näkyy asiakasmenussa",
  updateItem: "Päivitä annos",
  addItem: "Lisää annos",
  categories: "Kategoriat",
  allItems: "Kaikki annokset",
  loadingRestaurant: "Ladataan ravintolaa…",
  loadingItems: "Ladataan annoksia…",
  noItemsYet: "Ei vielä annoksia.",
  noImg: "Ei kuvaa",
  onMenu: "Menussa",
  hidden: "Piilotettu",
  available: "Saatavilla",
  soldOut: "Loppu",
  markSoldOut: "Merkitse loppuun",
  markAvailable: "Merkitse saataville",
  hideFromMenu: "Piilota menusta",
  showOnMenu: "Näytä menussa",
  menuBackgroundReel: "Menun taustakaruselli",
  menuBackgroundReelBody:
    "Lisää enintään 12 kuvaa. Järjestys = ristiinhäivytysjärjestys. Tyhjä = oletusnäkymät.",
  remove: "Poista",
  noCustomBackgrounds: "Ei omia taustoja vielä.",
  uploadBackground: "Lataa tausta",
  pasteImageUrl: "Tai liitä kuvan URL",
  addUrl: "Lisää URL",
};

const ar: Messages = {
  language: "اللغة",
  cancel: "إلغاء",
  edit: "تعديل",
  delete: "حذف",
  save: "حفظ",
  saving: "جارٍ الحفظ…",
  creating: "جارٍ الإنشاء…",
  copied: "تم النسخ",
  active: "نشط",
  inactive: "غير نشط",
  actions: "إجراءات",
  status: "الحالة",
  name: "الاسم",
  email: "البريد",
  phone: "الهاتف",
  restaurant: "المطعم",
  branch: "الفرع",
  noRestaurants: "لا توجد مطاعم",
  noBranches: "لا توجد فروع لهذا المطعم",
  selectBranchFirst: "اختر فرعاً أولاً.",
  selectRestaurantFirst: "اختر مطعماً أولاً.",
  uploadImage: "رفع صورة",
  uploading: "جارٍ الرفع…",
  uploadFailed: "فشل الرفع",
  signOut: "تسجيل الخروج",
  checkingSession: "جارٍ التحقق من الجلسة…",
  opsConsole: "لوحة التشغيل",
  adminFallback: "الإدارة",
  navOverview: "نظرة عامة",
  navRestaurants: "المطاعم",
  navBranches: "الفروع",
  navTables: "الطاولات",
  navDevices: "الأجهزة",
  navMenu: "القائمة",
  navUsers: "المستخدمون",
  rolePlatformAdmin: "مسؤول المنصة",
  roleRestaurantOwner: "صاحب المطعم",
  roleBranchManager: "مدير الفرع",
  roleWaiter: "نادل",
  roleChef: "طاهٍ",
  roleCashier: "أمين صندوق",
  loginKicker: "منصة المطاعم",
  loginHeadline: "الإدارة",
  loginBody: "سجّل الدخول لإدارة الطاولات والأجهزة والقائمة.",
  loginEmail: "البريد الإلكتروني",
  loginPassword: "كلمة المرور",
  loginShowPassword: "إظهار كلمة المرور",
  loginHidePassword: "إخفاء كلمة المرور",
  loginSubmit: "تسجيل الدخول",
  loginSigningIn: "جارٍ الدخول…",
  loginFailed: "فشل تسجيل الدخول",
  loginCashierHint: "أمين الصندوق يستخدم نقطة البيع — وليس لوحة الإدارة.",
  loginRoleDenied: "الدور {role} لا يمكنه الوصول إلى لوحة الإدارة.",
  loginHeroKicker: "من الصالة إلى المطبخ",
  loginHeroBody: "طاولات وأجهزة وقائمة — لوحة واحدة هادئة.",
  loginHeroAlt: "قاعة المطعم",
  footerCopy:
    "© 2026 MayleSoft Restaurant Platform · التصميم: م. حسن كمال",
  overviewTitle: "نظرة عامة",
  overviewSignedIn: "مسجّل الدخول كـ {email} ({role})",
  overviewLinkRestaurantsBody: "أنشئ المطاعم والفروع.",
  overviewLinkBranchesBody: "أضف أدِر فروع مطعمك.",
  overviewLinkTablesBody: "أنشئ الطاولات وانسخ روابط QR للعملاء.",
  overviewLinkDevicesBody:
    "أنشئ أجهزة المطبخ والنادل؛ اربطها برموز QR قصيرة العمر.",
  overviewLinkMenuBody: "أضف التصنيفات والأصناف لقائمة QR.",
  kitchenService: "خدمة المطبخ",
  kitchenServiceBody: "ضغط الطلبات الحي للفرع المحدد",
  selectABranch: "اختر فرعاً",
  kitchenNew: "جديد",
  kitchenPreparing: "قيد التحضير",
  kitchenReady: "جاهز",
  kitchenAvgPrep: "متوسط التحضير",
  kitchenOldestTicket: "أقدم تذكرة",
  kitchenOpenSummary:
    "{open} مفتوح · متوسط الانتظار {wait} د · {accepted} مقبول",
  latencySlos: "أهداف زمن الاستجابة",
  latencySlosBody:
    "آخر 4 ساعات · التحضير قيد التحضير→جاهز · الدفع أُنشئ→دُفع · /api/metrics",
  prepP95: "تحضير p95",
  prepSlo: "هدف التحضير",
  paySettleP95: "تسوية الدفع p95",
  paySlo: "هدف الدفع",
  sloThresholds: "العتبات · تحضير {prep} · دفع {pay}",
  sloAvgSettle: " · متوسط التسوية {settle}",
  quickOps: "حلقة التشغيل السريعة",
  quickOps1: "أنشئ طاولة وانسخ رابط الطلب عبر QR.",
  quickOps2: "أنشئ أجهزة المطبخ والنادل؛ اربط الرموز في تلك التطبيقات.",
  quickOps3: "أبقِ القائمة محدّثة ليتمكن العملاء من الطلب.",
  sloOk: "جيد",
  sloBreach: "تجاوز",
  sloNoData: "لا بيانات",
  secondsUnit: "{n}ث",
  minutesUnit: "{m}د",
  minutesSeconds: "{m}د {s}ث",
  tablesTitle: "الطاولات",
  tablesSubtitle:
    "أضف أو عدّل أو احذف طاولات الصالة وانسخ روابط طلب QR للعملاء.",
  tableNumberPlaceholder: "رقم الطاولة (مثل A3)",
  addTable: "إضافة طاولة",
  saveTable: "حفظ الطاولة",
  colTable: "الطاولة",
  colSeats: "المقاعد",
  colQrToken: "رمز QR",
  colManage: "إدارة",
  colQr: "QR",
  copyQrLink: "نسخ رابط QR",
  printQr: "طباعة QR",
  rotateQr: "تغيير QR",
  deleteTable: "حذف الطاولة",
  occupiedCannotDelete: "لا يمكن حذف طاولة مشغولة",
  confirmDeleteTable:
    "حذف الطاولة {number}؟ لا يمكن حذف الطاولات المشغولة.",
  confirmRotateQr:
    "تغيير QR للطاولة {number}؟ الروابط القديمة ستتوقف.",
  loadingTables: "جارٍ تحميل الطاولات…",
  loadingBranches: "جارٍ تحميل الفروع…",
  printScanToOrder: "امسح للطلب",
  printButton: "طباعة",
  printPopupBlocked: "اسمح بالنوافذ المنبثقة لهذا الموقع لطباعة رمز QR.",
  qrPrintTitle: "QR الطاولة {number}",
  qrScanMe: "امسحني",
  qrStyleTitle: "أسلوب بطاقة QR",
  qrStyleBody: "الألوان والشعار لبطاقات QR المطبوعة على الطاولات.",
  qrFrameColor: "الإطار والعنوان",
  qrModuleColor: "لون QR",
  qrLogoHint: "يظهر في وسط الرمز. استخدم شعاراً مربعاً.",
  saveQrStyle: "حفظ أسلوب QR",
  qrStyleSaved: "تم حفظ أسلوب طباعة QR.",
  statusAvailable: "متاحة",
  statusOccupied: "مشغولة",
  statusReserved: "محجوزة",
  devicesTitle: "الأجهزة",
  devicesSubtitle:
    "اربط الشاشات برمز QR قصير العمر. الرموز طويلة العمر تظهر فقط عند الإنشاء أو التغيير.",
  deviceNamePlaceholder: "اسم الجهاز (مثل تلفزيون المطبخ 1)",
  createDevice: "إنشاء جهاز",
  loadingDevices: "جارٍ تحميل الأجهزة…",
  lastSeen: "آخر ظهور {when}",
  noExpirySet: "بدون انتهاء",
  expiresOn: "ينتهي {date}",
  expiredOn: "انتهى {date}",
  rotateSoon: " — غيّر قريباً",
  refreshCode: "تحديث الرمز",
  issuePairingCode: "إصدار رمز الربط",
  rotateNow: "غيّر الآن",
  rotateToken: "تغيير الرمز",
  confirmRevokeDevice:
    "إلغاء {name}؟ يجب إعادة ربط الجهاز اللوحي بعد التغيير.",
  revoke: "إلغاء",
  tokenPreview: "معاينة الرمز",
  copyToken: "نسخ الرمز",
  fullTokenHint: "(الرمز الكامل يظهر فقط بعد الإنشاء/التغيير)",
  pairingCode: "رمز الربط",
  expiresAt: "ينتهي {time}",
  copyCode: "نسخ الرمز",
  noActivePairingCode: "لا يوجد رمز ربط نشط — أصدر واحداً لإظهار QR.",
  scanTabletHint:
    "امسح بكاميرا الجهاز، أو افتح {url} وألصق رمز الربط (مرة واحدة، ~10 دقائق).",
  pairingQrAlt: "ربط {name}",
  deviceTypeKitchen: "مطبخ",
  deviceTypeWaiter: "نادل",
  deviceTypeCashier: "صندوق",
  deviceTypeCustomerDisplay: "شاشة العميل",
  deviceTypeManager: "مدير",
  restaurantsTitle: "المطاعم",
  restaurantsSubtitle:
    "أنشئ وعدّل وأوقف المطاعم. أضف الفروع بعد إنشاء المطعم.",
  branchesTitle: "الفروع",
  branchesSubtitle: "أضف وأدر الفروع.",
  branchesSubtitleNamed: "أضف وأدر فروع {name}.",
  editRestaurant: "تعديل المطعم",
  newRestaurant: "مطعم جديد",
  cancelEdit: "إلغاء التعديل",
  restaurantNamePlaceholder: "اسم المطعم",
  slugPlaceholder: "الاسم الفرعي (مثل alhuda)",
  slugTitle: "أحرف صغيرة وأرقام وشرطات",
  guestSite: "موقع الضيوف: {url}",
  slugHintNoDomain:
    "يُستخدم لنطاق الضيوف الفرعي (عيّن NEXT_PUBLIC_ROOT_DOMAIN).",
  contactEmail: "بريد التواصل",
  phonePlaceholder: "الهاتف",
  addressOptional: "العنوان (اختياري)",
  logo: "الشعار",
  uploadLogo: "رفع الشعار",
  pasteLogoUrl: "أو الصق رابط الشعار",
  accent: "لون التمييز",
  buttonColor: "الزر",
  paper: "الورق",
  saveChanges: "حفظ التغييرات",
  createRestaurant: "إنشاء مطعم",
  restaurantUpdated: "تم تحديث “{name}”.",
  restaurantCreated: "تم إنشاء “{name}”. أضف فرعاً بعد ذلك.",
  restaurantDeactivated: "تم إيقاف “{name}”.",
  restaurantReactivated: "أُعيد تفعيل “{name}”.",
  confirmDeactivateRestaurant:
    "إيقاف “{name}”؟ يمكنك إعادة تفعيله لاحقاً بالتعديل.",
  noRestaurantAssigned: "لا يوجد مطعم مرتبط",
  customerBrand: "هوية العميل",
  customerBrandBody: "الشعار والألوان وشريط الخلفيات لقائمة الضيوف.",
  saveBrand: "حفظ الهوية",
  customerBrandSaved: "تم حفظ هوية العميل.",
  newBranch: "فرع جديد",
  restaurantColon: "المطعم:",
  noRestaurantsYet: "لا توجد مطاعم بعد",
  inactiveSuffix: " (غير نشط)",
  branchNamePlaceholder: "اسم الفرع (مثل وسط هلسنكي)",
  createBranch: "إنشاء فرع",
  branchCreated: "تم إنشاء الفرع “{name}”. الدخول المباشر: {url}",
  walkInRotated: "تم تغيير رابط الدخول لـ “{name}”: {url}",
  branchCreateRestricted:
    "إنشاء الفروع مقتصر على أصحاب المطاعم ومسؤولي المنصة.",
  loadingRestaurants: "جارٍ تحميل المطاعم…",
  colBranches: "الفروع",
  deactivate: "إيقاف",
  reactivate: "إعادة تفعيل",
  noBranchesYet: "لا توجد فروع بعد. أنشئ واحداً أعلاه.",
  walkInGuestLinks: "روابط دخول الضيوف",
  walkInGuestLinksBody:
    "شارك هذه الروابط مع الضيوف. التغيير يُلغي الرابط القديم. تلفزيون الاستلام يستخدم نفس الرمز في المسار.",
  copyWalkInUrl: "نسخ رابط الدخول",
  rotateWalkInToken: "تغيير رمز الدخول",
  colBranch: "الفرع",
  usersTitle: "المستخدمون",
  usersNoPermission: "ليست لديك صلاحية إدارة حسابات الموظفين.",
  usersNoRestaurant:
    "حسابك غير مرتبط بمطعم. اطلب من مسؤول المنصة إصلاح ذلك.",
  usersSubtitleAdmin:
    "اعرض وأدر موظفي المطعم المحدد. صفِّ حسب الفرع لمعرفة من يعمل أين.",
  usersSubtitleOwner: "اعرض وأدر موظفي فروع مطعمك.",
  yourRestaurant: "مطعمك",
  filterByBranch: "تصفية حسب الفرع",
  allBranches: "كل الفروع",
  editUser: "تعديل المستخدم",
  newUser: "مستخدم جديد",
  passwordRequired: "كلمة المرور مطلوبة للمستخدمين الجدد.",
  userUpdated: "تم تحديث {email}.",
  userCreated: "تم إنشاء {email}.",
  userDeactivated: "تم إيقاف {email}.",
  userReactivated: "أُعيد تفعيل {email}.",
  confirmDeactivateUser: "إيقاف {email}؟",
  passwordOptional: "كلمة مرور جديدة (اختياري)",
  passwordMin: "كلمة المرور (8 أحرف على الأقل)",
  firstName: "الاسم الأول",
  lastName: "اسم العائلة",
  noBranchOwner: "بدون فرع (صاحب المطعم)",
  selectBranchRecommended: "اختر فرعاً (مستحسن)",
  createUser: "إنشاء مستخدم",
  selectRestaurantToViewUsers: "اختر مطعماً لعرض مستخدميه.",
  loadingUsers: "جارٍ تحميل المستخدمين…",
  noUsersYet: "لا يوجد مستخدمون لهذا النطاق بعد.",
  colName: "الاسم",
  menuTitle: "القائمة",
  menuSubtitle:
    "أدر أصناف الكتالوج. علّم نفاد الكمية عند الانتهاء؛ أعد التفعيل عند التوفر.",
  categoryNameRequired: "اسم التصنيف مطلوب",
  itemNameRequired: "اسم الصنف مطلوب",
  selectCategory: "اختر تصنيفاً",
  enterValidPrice: "أدخل سعراً صالحاً.",
  confirmDeleteCategory:
    "حذف التصنيف “{name}”؟ يجب ألا يحتوي على أصناف.",
  confirmDeactivateItem:
    "إيقاف “{name}”؟ سيُخفى من قائمة العملاء.",
  editCategory: "تعديل التصنيف",
  newCategory: "تصنيف جديد",
  categoryNamePlaceholder: "اسم التصنيف",
  updateCategory: "تحديث التصنيف",
  addCategory: "إضافة تصنيف",
  editItem: "تعديل الصنف",
  newItem: "صنف جديد",
  itemNamePlaceholder: "اسم الصنف",
  descriptionOptional: "الوصف (اختياري)",
  noImage: "بدون صورة",
  customUrl: "رابط مخصص…",
  uploadMenuPhoto: "رفع صورة القائمة",
  menuPhotoLibrary: "صور هذا المطعم",
  menuPhotoLibraryBody:
    "ارفع الصورة مرة ثم اضغط عليها لتعيينها للصنف. لكل مطعم مكتبته الخاصة.",
  menuPhotoEmpty: "لا توجد صور بعد. أضف صورة لهذا المطعم.",
  samplePhotos: "صور جاهزة",
  pricePlaceholder: "السعر",
  activeOnCustomerMenu: "ظاهر في قائمة العملاء",
  updateItem: "تحديث الصنف",
  addItem: "إضافة صنف",
  categories: "التصنيفات",
  allItems: "كل الأصناف",
  loadingRestaurant: "جارٍ تحميل المطعم…",
  loadingItems: "جارٍ تحميل الأصناف…",
  noItemsYet: "لا توجد أصناف بعد.",
  noImg: "بدون صورة",
  onMenu: "في القائمة",
  hidden: "مخفي",
  available: "متاح",
  soldOut: "نفد",
  markSoldOut: "تعليم نفاد",
  markAvailable: "تعليم متاح",
  hideFromMenu: "إخفاء من القائمة",
  showOnMenu: "إظهار في القائمة",
  menuBackgroundReel: "شريط خلفية القائمة",
  menuBackgroundReelBody:
    "أضف حتى 12 صورة. الترتيب = ترتيب التلاشي السينمائي. فارغ = المشاهد الافتراضية.",
  remove: "إزالة",
  noCustomBackgrounds: "لا توجد خلفيات مخصصة بعد.",
  uploadBackground: "رفع خلفية",
  pasteImageUrl: "أو الصق رابط الصورة",
  addUrl: "إضافة رابط",
};

const so: Messages = {
  language: "Luqadda",
  cancel: "Jooji",
  edit: "Wax ka beddel",
  delete: "Tirtir",
  save: "Kaydi",
  saving: "Waa la kaydinayaa…",
  creating: "Waa la abuurayaa…",
  copied: "Waa la koobiyey",
  active: "Shaqaynaya",
  inactive: "Ma shaqeeyo",
  actions: "Ficillada",
  status: "Xaaladda",
  name: "Magaca",
  email: "Iimayl",
  phone: "Telefoon",
  restaurant: "Makhaayadda",
  branch: "Laanta",
  noRestaurants: "Makhaayad lama heli karo",
  noBranches: "Laamo kuma jiraan makhaayaddan",
  selectBranchFirst: "Marka hore dooro laan.",
  selectRestaurantFirst: "Marka hore dooro makhaayad.",
  uploadImage: "Soo rar sawir",
  uploading: "Waa la soo rarayaa…",
  uploadFailed: "Soo rariddu way fashilantay",
  signOut: "Ka bax",
  checkingSession: "Fadhiga ayaa la hubinayaa…",
  opsConsole: "Konsolka shaqada",
  adminFallback: "Maamul",
  navOverview: "Guudmar",
  navRestaurants: "Makhaayadaha",
  navBranches: "Laamaha",
  navTables: "Miisaska",
  navDevices: "Qalabka",
  navMenu: "Liiska",
  navUsers: "Isticmaalayaasha",
  rolePlatformAdmin: "Maamulaha madasha",
  roleRestaurantOwner: "Milkiilaha makhaayadda",
  roleBranchManager: "Maareeyaha laanta",
  roleWaiter: "Adeegaha",
  roleChef: "Kariyaha",
  roleCashier: "Khasnajiga",
  loginKicker: "Madasha makhaayadaha",
  loginHeadline: "Maamul",
  loginBody: "Soo gal si aad u maamusho miisaska, qalabka, iyo liiska.",
  loginEmail: "Iimayl",
  loginPassword: "Furaha",
  loginShowPassword: "Muuji furaha",
  loginHidePassword: "Qari furaha",
  loginSubmit: "Soo gal",
  loginSigningIn: "Waa la soo galayaa…",
  loginFailed: "Soo galitaanku wuu fashilmay",
  loginCashierHint:
    "Khasnajigu wuxuu isticmaalaa till-ka — ma aha konsolka maamulka.",
  loginRoleDenied: "Doorka {role} kama geli karo konsolka maamulka.",
  loginHeroKicker: "Salka ilaa jikada",
  loginHeroBody: "Miisas, qalab, iyo liis — hal konsol deggan.",
  loginHeroAlt: "Qolka cuntada ee makhaayadda",
  footerCopy:
    "© 2026 MayleSoft Restaurant Platform · Naqshadeeyaha: Inj. Hasan Kamaal",
  overviewTitle: "Guudmar",
  overviewSignedIn: "Soo galay {email} ({role})",
  overviewLinkRestaurantsBody: "Abuur makhaayado iyo laamo.",
  overviewLinkBranchesBody: "Kudar oo maamul laamaha makhaayaddaada.",
  overviewLinkTablesBody: "Abuur miisas oo koobi xiriirada QR ee macaamiisha.",
  overviewLinkDevicesBody:
    "Abuur qalabka jikada/adeegaha; isku xidh QR gaaban.",
  overviewLinkMenuBody: "Kudar qaybo iyo cuntooyin liiska QR.",
  kitchenService: "Adeegga jikada",
  kitchenServiceBody: "Cadaadiska tikidhada tooska ah ee laanta la doortay",
  selectABranch: "Dooro laan",
  kitchenNew: "Cusub",
  kitchenPreparing: "Waa la diyaarinayaa",
  kitchenReady: "Diyaar",
  kitchenAvgPrep: "Celcelis diyaarinta",
  kitchenOldestTicket: "Tikidda ugu da’da weyn",
  kitchenOpenSummary:
    "{open} furan · celcelis sugitaan {wait}d · {accepted} la aqbalay",
  latencySlos: "Heerarka daahitaanka",
  latencySlosBody:
    "4 saacood · diyaarin DIYAARIN→DIYAAR · lacag la sameeyay→la bixiyay · /api/metrics",
  prepP95: "Diyaarin p95",
  prepSlo: "Heerka diyaarinta",
  paySettleP95: "Lacag p95",
  paySlo: "Heerka lacagta",
  sloThresholds: "Xadadka · diyaarin {prep} · lacag {pay}",
  sloAvgSettle: " · celcelis xalinta {settle}",
  quickOps: "Wareegga shaqada degdegga ah",
  quickOps1: "Abuur miis oo koobi xiriirka dalabka QR.",
  quickOps2: "Abuur qalabka JIKADA iyo ADEEGAHA; isku xidh tokannada.",
  quickOps3: "Liiska ha noqdo mid cusub si ay macaamiishu u dalbadaan.",
  sloOk: "OK",
  sloBreach: "Jebiyay",
  sloNoData: "Xog malaha",
  secondsUnit: "{n}ilb",
  minutesUnit: "{m}d",
  minutesSeconds: "{m}d {s}ilb",
  tablesTitle: "Miisaska",
  tablesSubtitle:
    "Kudar, wax ka beddel, ama tirtir miisaska dabaqa oo koobi xiriirada QR.",
  tableNumberPlaceholder: "Lambarka miiska (tusaale A3)",
  addTable: "Kudar miis",
  saveTable: "Kaydi miiska",
  colTable: "Miis",
  colSeats: "Kuraasta",
  colQrToken: "Calaamada QR",
  colManage: "Maamul",
  colQr: "QR",
  copyQrLink: "Koobi xiriirka QR",
  printQr: "Daabac QR",
  rotateQr: "Beddel QR",
  deleteTable: "Tirtir miiska",
  occupiedCannotDelete: "Miis la isticmaalayo lama tirtiri karo",
  confirmDeleteTable:
    "Tirtir miiska {number}? Miisaska la isticmaalayo lama tirtiri karo.",
  confirmRotateQr:
    "Beddel QR miiska {number}? Xiriiradii hore way joojinayaan.",
  loadingTables: "Miisaska ayaa la soo rarayaa…",
  loadingBranches: "Laamaha ayaa la soo rarayaa…",
  printScanToOrder: "Iskaanka si aad u dalbato",
  printButton: "Daabac",
  printPopupBlocked: "Oggolow daaqadaha soo baxa si aad u daabacdo QR.",
  qrPrintTitle: "QR miiska {number}",
  qrScanMe: "Iskaanka",
  qrStyleTitle: "Qaabka kaadhka QR",
  qrStyleBody: "Midabada iyo calaamadda kaadhadhka QR ee miiska.",
  qrFrameColor: "Birinta iyo cinwaanka",
  qrModuleColor: "Midabka QR",
  qrLogoHint: "Waxaa lagu dhex muujiyaa koodhka. Isticmaal calaamad laba jibbaaran.",
  saveQrStyle: "Kaydi qaabka QR",
  qrStyleSaved: "Qaabka daabacaadda QR waa la kaydiyay.",
  statusAvailable: "Banaan",
  statusOccupied: "La isticmaalayo",
  statusReserved: "La sii qabsaday",
  devicesTitle: "Qalabka",
  devicesSubtitle:
    "Isku xidh shaashadaha QR gaaban. Tokannada dheer waxaa la muujiyaa kaliya marka la abuuro ama la beddelo.",
  deviceNamePlaceholder: "Magaca qalabka (tusaale TV-ga jikada 1)",
  createDevice: "Abuur qalab",
  loadingDevices: "Qalabka ayaa la soo rarayaa…",
  lastSeen: "markii ugu dambeysay {when}",
  noExpirySet: "Dhicitaan lama dejin",
  expiresOn: "Wuu dhamaadaa {date}",
  expiredOn: "Wuu dhacay {date}",
  rotateSoon: " — dhawaan beddel",
  refreshCode: "Cusbooneysii koodhka",
  issuePairingCode: "Soo saar koodhka isku xirka",
  rotateNow: "Hadda beddel",
  rotateToken: "Beddel tokenka",
  confirmRevokeDevice:
    "Ka noqo {name}? Tablet-ka waa in mar kale la isku xiraa.",
  revoke: "Ka noqo",
  tokenPreview: "Horudhac token",
  copyToken: "Koobi tokenka",
  fullTokenHint: "(tokenka buuxa wuxuu muuqdaa kaliya abuurid/beddel kadib)",
  pairingCode: "Koodhka isku xirka",
  expiresAt: "wuu dhamaadaa {time}",
  copyCode: "Koobi koodhka",
  noActivePairingCode:
    "Koodh isku xir shaqaynaya malaha — soo saar mid si QR loo muujiyo.",
  scanTabletHint:
    "Iskaanka kamaradda tablet-ka, ama fur {url} oo ku dheji koodhka (~10 daqiiqo).",
  pairingQrAlt: "Isku xirka {name}",
  deviceTypeKitchen: "Jikada",
  deviceTypeWaiter: "Adeegaha",
  deviceTypeCashier: "Khasnaji",
  deviceTypeCustomerDisplay: "Shaashadda macmiilka",
  deviceTypeManager: "Maareeye",
  restaurantsTitle: "Makhaayadaha",
  restaurantsSubtitle:
    "Abuur, wax ka beddel, oo jooji makhaayadaha. Kudar laamo kadib abuurista.",
  branchesTitle: "Laamaha",
  branchesSubtitle: "Kudar oo maamul laamaha.",
  branchesSubtitleNamed: "Kudar oo maamul laamaha {name}.",
  editRestaurant: "Wax ka beddel makhaayadda",
  newRestaurant: "Makhaayad cusub",
  cancelEdit: "Jooji wax ka beddelka",
  restaurantNamePlaceholder: "Magaca makhaayadda",
  slugPlaceholder: "Slug-ga (tusaale alhuda)",
  slugTitle: "Xarfaha yaryar, lambarro, iyo xariiqyo",
  guestSite: "Bogga martida: {url}",
  slugHintNoDomain:
    "Waxaa loo isticmaalaa subdomain-ka martida (dejiso NEXT_PUBLIC_ROOT_DOMAIN).",
  contactEmail: "Iimaylka xiriirka",
  phonePlaceholder: "Telefoon",
  addressOptional: "Cinwaanka (ikhtiyaari)",
  logo: "Astaanta",
  uploadLogo: "Soo rar astaanta",
  pasteLogoUrl: "Ama ku dheji URL-ka astaanta",
  accent: "Midabka muuqda",
  buttonColor: "Badhanka",
  paper: "Waraaqda",
  saveChanges: "Kaydi isbeddellada",
  createRestaurant: "Abuur makhaayad",
  restaurantUpdated: "Waa la cusbooneysiiyay “{name}”.",
  restaurantCreated: "Waa la abuuray “{name}”. Haddana kudar laan.",
  restaurantDeactivated: "Waa la joojiyay “{name}”.",
  restaurantReactivated: "Dib ayaa loo shaqaysiiyay “{name}”.",
  confirmDeactivateRestaurant:
    "Jooji “{name}”? Waxaad dib u shaqaysiin kartaa adoo wax ka beddelaya.",
  noRestaurantAssigned: "Makhaayad lama xidhin",
  customerBrand: "Astaanta macmiilka",
  customerBrandBody:
    "Astaanta, midabada, iyo muuqaalka asalka ee liiska martida.",
  saveBrand: "Kaydi astaanta",
  customerBrandSaved: "Astaanta macmiilka waa la kaydiyay.",
  newBranch: "Laan cusub",
  restaurantColon: "Makhaayadda:",
  noRestaurantsYet: "Weli makhaayado malaha",
  inactiveSuffix: " (ma shaqeeyo)",
  branchNamePlaceholder: "Magaca laanta (tusaale Helsinki Downtown)",
  createBranch: "Abuur laan",
  branchCreated: "Laanta “{name}” waa la abuuray. Socod-gal: {url}",
  walkInRotated: "Xiriirka socod-gal ee “{name}” waa la beddelay: {url}",
  branchCreateRestricted:
    "Abuurista laamaha waxaa u gaar ah milkiilayaasha iyo maamulaha madasha.",
  loadingRestaurants: "Makhaayadaha ayaa la soo rarayaa…",
  colBranches: "Laamaha",
  deactivate: "Jooji",
  reactivate: "Dib u shaqaysii",
  noBranchesYet: "Weli laamo malaha. Koren ku abuur mid.",
  walkInGuestLinks: "Xiriirada martida socod-gal",
  walkInGuestLinksBody:
    "La wadaag URL-yadan martida. Beddeliddu waxay burisaa xiriirkii hore. TV-ga qaadashada wuxuu isticmaalaa isla calaamadda.",
  copyWalkInUrl: "Koobi URL-ka socod-gal",
  rotateWalkInToken: "Beddel calaamadda socod-gal",
  colBranch: "Laanta",
  usersTitle: "Isticmaalayaasha",
  usersNoPermission: "Ma lihid oggolaansho inaad maamusho akoonnada shaqaalaha.",
  usersNoRestaurant:
    "Akoonkaaga kuma xirna makhaayad. Weydii maamulaha madasha inuu saxo.",
  usersSubtitleAdmin:
    "Eeg oo maamul shaqaalaha makhaayadda la doortay. Kala saar laanta.",
  usersSubtitleOwner: "Eeg oo maamul shaqaalaha laamaha makhaayaddaada.",
  yourRestaurant: "Makhaayaddaada",
  filterByBranch: "Kala saar laanta",
  allBranches: "Dhammaan laamaha",
  editUser: "Wax ka beddel isticmaalaha",
  newUser: "Isticmaale cusub",
  passwordRequired: "Furaha waa loo baahan yahay isticmaalayaasha cusub.",
  userUpdated: "Waa la cusbooneysiiyay {email}.",
  userCreated: "Waa la abuuray {email}.",
  userDeactivated: "Waa la joojiyay {email}.",
  userReactivated: "Dib ayaa loo shaqaysiiyay {email}.",
  confirmDeactivateUser: "Jooji {email}?",
  passwordOptional: "Furaha cusub (ikhtiyaari)",
  passwordMin: "Furaha (ugu yaraan 8)",
  firstName: "Magaca koowaad",
  lastName: "Magaca dambe",
  noBranchOwner: "Laan malaha (milkiile)",
  selectBranchRecommended: "Dooro laan (lagu talinayaa)",
  createUser: "Abuur isticmaale",
  selectRestaurantToViewUsers: "Dooro makhaayad si aad u aragto isticmaalayaasha.",
  loadingUsers: "Isticmaalayaasha ayaa la soo rarayaa…",
  noUsersYet: "Weli isticmaalayaal malaha baaxaddan.",
  colName: "Magaca",
  menuTitle: "Liiska",
  menuSubtitle:
    "Maamul cuntooyinka. Calaamadee dhammaaday; dib u shaqaysii marka la heli karo.",
  categoryNameRequired: "Magaca qaybta waa loo baahan yahay",
  itemNameRequired: "Magaca cuntada waa loo baahan yahay",
  selectCategory: "Dooro qayb",
  enterValidPrice: "Geli qiimo sax ah.",
  confirmDeleteCategory:
    "Tirtir qaybta “{name}”? Waa in aysan lahayn cuntooyin.",
  confirmDeactivateItem:
    "Jooji “{name}”? Waxaa laga qarinayaa liiska macaamiisha.",
  editCategory: "Wax ka beddel qaybta",
  newCategory: "Qayb cusub",
  categoryNamePlaceholder: "Magaca qaybta",
  updateCategory: "Cusbooneysii qaybta",
  addCategory: "Kudar qayb",
  editItem: "Wax ka beddel cuntada",
  newItem: "Cunto cusub",
  itemNamePlaceholder: "Magaca cuntada",
  descriptionOptional: "Sharaxaad (ikhtiyaari)",
  noImage: "Sawir malaha",
  customUrl: "URL gaar ah…",
  uploadMenuPhoto: "Soo rar sawirka liiska",
  menuPhotoLibrary: "Sawirada makhaayaddan",
  menuPhotoLibraryBody:
    "Soo rar mar, ka dib taabo si aad ugu xirto cuntada. Makhaayad walba waxay leedahay maktabadeeda.",
  menuPhotoEmpty: "Weli lama soo rarin. Ku dar sawir makhaayaddan.",
  samplePhotos: "Sawirada tusaalaha",
  pricePlaceholder: "Qiimaha",
  activeOnCustomerMenu: "Ka muuqda liiska macaamiisha",
  updateItem: "Cusbooneysii cuntada",
  addItem: "Kudar cunto",
  categories: "Qaybaha",
  allItems: "Dhammaan cuntooyinka",
  loadingRestaurant: "Makhaayadda ayaa la soo rarayaa…",
  loadingItems: "Cuntooyinka ayaa la soo rarayaa…",
  noItemsYet: "Weli cuntooyin malaha.",
  noImg: "Sawir malaha",
  onMenu: "Liiska ku jira",
  hidden: "Qarsoon",
  available: "La heli karo",
  soldOut: "Dhammaaday",
  markSoldOut: "Calaamadee dhammaaday",
  markAvailable: "Calaamadee la heli karo",
  hideFromMenu: "Ka qari liiska",
  showOnMenu: "Ku muuji liiska",
  menuBackgroundReel: "Asalka liiska",
  menuBackgroundReelBody:
    "Kudar ilaa 12 sawir. Amarka = isdhaafsiga muuqaalka. Madhan = muuqaallada caadiga ah.",
  remove: "Ka saar",
  noCustomBackgrounds: "Weli asal gaar ah malaha.",
  uploadBackground: "Soo rar asal",
  pasteImageUrl: "Ama ku dheji URL-ka sawirka",
  addUrl: "Kudar URL",
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
