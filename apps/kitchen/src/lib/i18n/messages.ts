import type { Locale } from "./locales";

export type MessageKey =
  | "language"
  | "stationDisplay"
  | "kitchenDisplay"
  | "homeBody"
  | "loading"
  | "loadingDisplay"
  | "pairingLabel"
  | "pairingPlaceholder"
  | "pairingSubmit"
  | "pairingPending"
  | "enterPairing"
  | "qrPairingFailed"
  | "pairingFailed"
  | "deviceOffline"
  | "apiUnreachable"
  | "repairDevice"
  | "kitchenFallback"
  | "openCount"
  | "dashNew"
  | "dashPrep"
  | "dashReady"
  | "dashAvgWait"
  | "dashOldest"
  | "live"
  | "reconnecting"
  | "unpair"
  | "colNew"
  | "colNewHint"
  | "colAccepted"
  | "colAcceptedHint"
  | "colPreparing"
  | "colPreparingHint"
  | "colReady"
  | "colReadyHint"
  | "noTickets"
  | "loadTicketsFailed"
  | "actionAccept"
  | "actionStart"
  | "actionReady"
  | "updating"
  | "waitingPickup"
  | "walkIn"
  | "guest"
  | "rush"
  | "vip"
  | "note"
  | "courseAppetizer"
  | "courseDrink"
  | "courseMain"
  | "courseDessert"
  | "courseOther"
  | "footer";

type Messages = Record<MessageKey, string>;

const en: Messages = {
  language: "Language",
  stationDisplay: "Station display",
  kitchenDisplay: "Kitchen Display",
  homeBody:
    "Pair this screen with a kitchen device token to show live tickets and advance orders from the line.",
  loading: "Loading…",
  loadingDisplay: "Loading display…",
  pairingLabel: "Pairing code or device token",
  pairingPlaceholder: "Paste Admin pairing code or device token",
  pairingSubmit: "Open kitchen display",
  pairingPending: "Pairing…",
  enterPairing: "Enter a pairing code or device token",
  qrPairingFailed: "QR pairing failed",
  pairingFailed: "Pairing failed",
  deviceOffline: "Device offline",
  apiUnreachable: "Could not reach the kitchen API",
  repairDevice: "Re-pair device",
  kitchenFallback: "Kitchen",
  openCount: "{count} open",
  dashNew: "New",
  dashPrep: "Prep",
  dashReady: "Ready",
  dashAvgWait: "Avg wait",
  dashOldest: "Oldest",
  live: "Live",
  reconnecting: "Reconnecting",
  unpair: "Unpair",
  colNew: "New",
  colNewHint: "Incoming",
  colAccepted: "Accepted",
  colAcceptedHint: "Queued",
  colPreparing: "Preparing",
  colPreparingHint: "On the line",
  colReady: "Ready",
  colReadyHint: "Pass",
  noTickets: "No tickets",
  loadTicketsFailed: "Failed to load tickets",
  actionAccept: "Accept",
  actionStart: "Start",
  actionReady: "Ready",
  updating: "Updating…",
  waitingPickup: "Waiting for pickup",
  walkIn: "Walk-in",
  guest: "Guest",
  rush: "RUSH",
  vip: "VIP",
  note: "Note:",
  courseAppetizer: "Appetizer",
  courseDrink: "Drink",
  courseMain: "Main",
  courseDessert: "Dessert",
  courseOther: "Other",
  footer: "© 2026 MayleSoft Restaurant Platform · Designed by Eng. Hasan Kamaal",
};

const fi: Messages = {
  language: "Kieli",
  stationDisplay: "Asemanäyttö",
  kitchenDisplay: "Keittiönäyttö",
  homeBody:
    "Yhdistä tämä näyttö keittiölaitteen tunnukseen nähdäksesi liput ja edistäksesi tilauksia linjalta.",
  loading: "Ladataan…",
  loadingDisplay: "Ladataan näyttöä…",
  pairingLabel: "Parituskoodi tai laitetunnus",
  pairingPlaceholder: "Liitä Admin-parituskoodi tai laitetunnus",
  pairingSubmit: "Avaa keittiönäyttö",
  pairingPending: "Paritetaan…",
  enterPairing: "Anna parituskoodi tai laitetunnus",
  qrPairingFailed: "QR-paritus epäonnistui",
  pairingFailed: "Paritus epäonnistui",
  deviceOffline: "Laite offline",
  apiUnreachable: "Keittiö-API:in ei saada yhteyttä",
  repairDevice: "Parita uudelleen",
  kitchenFallback: "Keittiö",
  openCount: "{count} auki",
  dashNew: "Uusi",
  dashPrep: "Valmistus",
  dashReady: "Valmis",
  dashAvgWait: "Keskim. odotus",
  dashOldest: "Vanhin",
  live: "Live",
  reconnecting: "Yhdistetään",
  unpair: "Poista paritus",
  colNew: "Uusi",
  colNewHint: "Saapuvat",
  colAccepted: "Hyväksytty",
  colAcceptedHint: "Jonossa",
  colPreparing: "Valmistuu",
  colPreparingHint: "Linjalla",
  colReady: "Valmis",
  colReadyHint: "Passi",
  noTickets: "Ei lippuja",
  loadTicketsFailed: "Lippujen lataus epäonnistui",
  actionAccept: "Hyväksy",
  actionStart: "Aloita",
  actionReady: "Valmis",
  updating: "Päivitetään…",
  waitingPickup: "Odottaa noutoa",
  walkIn: "Walk-in",
  guest: "Vieras",
  rush: "KIIRE",
  vip: "VIP",
  note: "Huom:",
  courseAppetizer: "Alkuruoka",
  courseDrink: "Juoma",
  courseMain: "Pääruoka",
  courseDessert: "Jälkiruoka",
  courseOther: "Muu",
  footer: "© 2026 MayleSoft Restaurant Platform · Suunnittelu: Eng. Hasan Kamaal",
};

const ar: Messages = {
  language: "اللغة",
  stationDisplay: "شاشة المحطة",
  kitchenDisplay: "شاشة المطبخ",
  homeBody:
    "اربط هذه الشاشة برمز جهاز المطبخ لعرض التذاكر المباشرة وتقدّم الطلبات من الخط.",
  loading: "جارٍ التحميل…",
  loadingDisplay: "جارٍ تحميل الشاشة…",
  pairingLabel: "رمز الربط أو رمز الجهاز",
  pairingPlaceholder: "الصق رمز الربط من الإدارة أو رمز الجهاز",
  pairingSubmit: "افتح شاشة المطبخ",
  pairingPending: "جارٍ الربط…",
  enterPairing: "أدخل رمز الربط أو رمز الجهاز",
  qrPairingFailed: "فشل ربط رمز QR",
  pairingFailed: "فشل الربط",
  deviceOffline: "الجهاز غير متصل",
  apiUnreachable: "تعذر الوصول إلى واجهة المطبخ",
  repairDevice: "أعد الربط",
  kitchenFallback: "المطبخ",
  openCount: "{count} مفتوح",
  dashNew: "جديد",
  dashPrep: "تحضير",
  dashReady: "جاهز",
  dashAvgWait: "متوسط الانتظار",
  dashOldest: "الأقدم",
  live: "مباشر",
  reconnecting: "إعادة الاتصال",
  unpair: "إلغاء الربط",
  colNew: "جديد",
  colNewHint: "وارد",
  colAccepted: "مقبول",
  colAcceptedHint: "في الطابور",
  colPreparing: "قيد التحضير",
  colPreparingHint: "على الخط",
  colReady: "جاهز",
  colReadyHint: "تمرير",
  noTickets: "لا تذاكر",
  loadTicketsFailed: "فشل تحميل التذاكر",
  actionAccept: "قبول",
  actionStart: "بدء",
  actionReady: "جاهز",
  updating: "جارٍ التحديث…",
  waitingPickup: "بانتظار الاستلام",
  walkIn: "حضور مباشر",
  guest: "ضيف",
  rush: "عاجل",
  vip: "VIP",
  note: "ملاحظة:",
  courseAppetizer: "مقبلات",
  courseDrink: "مشروب",
  courseMain: "رئيسي",
  courseDessert: "حلوى",
  courseOther: "أخرى",
  footer: "© 2026 MayleSoft Restaurant Platform · تصميم م. حسن كمال",
};

const so: Messages = {
  language: "Luqadda",
  stationDisplay: "Shaashadda saldhigga",
  kitchenDisplay: "Shaashadda jikada",
  homeBody:
    "Isku xidh shaashadan iyo token-ka aaladda jikada si aad u aragto tickets-ka tooska ah oo aad u hormariso amarrada.",
  loading: "Waa la soo rarayaa…",
  loadingDisplay: "Shaashadda waa la soo rarayaa…",
  pairingLabel: "Koodka isku xidhka ama token-ka aaladda",
  pairingPlaceholder: "Ku dheji koodka Admin ama token-ka aaladda",
  pairingSubmit: "Fur shaashadda jikada",
  pairingPending: "Waa la isku xidhayaa…",
  enterPairing: "Geli koodka isku xidhka ama token-ka",
  qrPairingFailed: "Isku xidhka QR wuu fashilmay",
  pairingFailed: "Isku xidhku wuu fashilmay",
  deviceOffline: "Aaladdu offline bay tahay",
  apiUnreachable: "Lama gaadhi karo API-ga jikada",
  repairDevice: "Dib u isku xidh",
  kitchenFallback: "Jikada",
  openCount: "{count} furan",
  dashNew: "Cusub",
  dashPrep: "Diyaarin",
  dashReady: "Diyaar",
  dashAvgWait: "Celcelis sugid",
  dashOldest: "Ugu da’da weyn",
  live: "Toos",
  reconnecting: "Dib u xiriirin",
  unpair: "Ka xir",
  colNew: "Cusub",
  colNewHint: "Soo galaya",
  colAccepted: "La aqbalay",
  colAcceptedHint: "Safka",
  colPreparing: "Waa la diyaarinayaa",
  colPreparingHint: "Khadka",
  colReady: "Diyaar",
  colReadyHint: "Gudbi",
  noTickets: "Tickets ma jiraan",
  loadTicketsFailed: "Soo rarista tickets-ka way fashilantay",
  actionAccept: "Aqbal",
  actionStart: "Bilow",
  actionReady: "Diyaar",
  updating: "Waa la cusbooneysiinayaa…",
  waitingPickup: "Sugaya qaadista",
  walkIn: "Walk-in",
  guest: "Marti",
  rush: "DEGDEG",
  vip: "VIP",
  note: "Fiiro:",
  courseAppetizer: "Cunto fudud",
  courseDrink: "Cabitaan",
  courseMain: "Cunto weyn",
  courseDessert: "Macmacaan",
  courseOther: "Kale",
  footer: "© 2026 MayleSoft Restaurant Platform · Naqshadeeye Eng. Hasan Kamaal",
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
