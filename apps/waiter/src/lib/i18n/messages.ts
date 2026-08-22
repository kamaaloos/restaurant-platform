import type { Locale } from "./locales";

export type MessageKey =
  | "language"
  | "floorTablet"
  | "waiterDisplay"
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
  | "waiterFallback"
  | "readyCalls"
  | "live"
  | "reconnecting"
  | "unpair"
  | "tableCalls"
  | "openCount"
  | "requestBill"
  | "callWaiter"
  | "onMyWay"
  | "done"
  | "colKitchen"
  | "colKitchenHint"
  | "colReady"
  | "colReadyHint"
  | "colServed"
  | "colServedHint"
  | "nothingHere"
  | "walkIn"
  | "guest"
  | "rush"
  | "vip"
  | "seat"
  | "held"
  | "updating"
  | "fireNext"
  | "pickedUp"
  | "markServed"
  | "closeCheck"
  | "closeCheckTitle"
  | "footer";

type Messages = Record<MessageKey, string>;

const en: Messages = {
  language: "Language",
  floorTablet: "Floor tablet",
  waiterDisplay: "Waiter Display",
  homeBody:
    "Pair this tablet with a waiter device token to pick up ready tickets, clear table calls, and complete service.",
  loading: "Loading…",
  loadingDisplay: "Loading display…",
  pairingLabel: "Pairing code or device token",
  pairingPlaceholder: "Paste Admin pairing code or device token",
  pairingSubmit: "Open waiter display",
  pairingPending: "Pairing…",
  enterPairing: "Enter a pairing code or device token",
  qrPairingFailed: "QR pairing failed",
  pairingFailed: "Pairing failed",
  deviceOffline: "Device offline",
  apiUnreachable: "Could not reach the waiter API",
  repairDevice: "Re-pair device",
  waiterFallback: "Waiter",
  readyCalls: "{ready} ready · {calls} calls",
  live: "Live",
  reconnecting: "Reconnecting",
  unpair: "Unpair",
  tableCalls: "Table calls",
  openCount: "{count} open",
  requestBill: "Request bill",
  callWaiter: "Call waiter",
  onMyWay: "On my way",
  done: "Done",
  colKitchen: "In kitchen",
  colKitchenHint: "Cooking",
  colReady: "Ready",
  colReadyHint: "Pick up",
  colServed: "Served",
  colServedHint: "At table",
  nothingHere: "Nothing here",
  walkIn: "Walk-in",
  guest: "Guest",
  rush: "RUSH",
  vip: "VIP",
  seat: "seat {n}",
  held: "(held)",
  updating: "Updating…",
  fireNext: "Fire next course",
  pickedUp: "Picked up",
  markServed: "Mark served",
  closeCheck: "Close check",
  closeCheckTitle: "Requires full payment at cashier first",
  footer: "© 2026 MayleSoft Restaurant Platform · Designed by Eng. Hasan Kamaal",
};

const fi: Messages = {
  language: "Kieli",
  floorTablet: "Salitabletti",
  waiterDisplay: "Tarjoilijanäyttö",
  homeBody:
    "Yhdistä tämä tabletti tarjoilijalaitteen tunnukseen noutaaksesi valmiit liput, käsitelläksesi pöytäpyynnöt ja viimeistelläksesi palvelun.",
  loading: "Ladataan…",
  loadingDisplay: "Ladataan näyttöä…",
  pairingLabel: "Parituskoodi tai laitetunnus",
  pairingPlaceholder: "Liitä Admin-parituskoodi tai laitetunnus",
  pairingSubmit: "Avaa tarjoilijanäyttö",
  pairingPending: "Paritetaan…",
  enterPairing: "Anna parituskoodi tai laitetunnus",
  qrPairingFailed: "QR-paritus epäonnistui",
  pairingFailed: "Paritus epäonnistui",
  deviceOffline: "Laite offline",
  apiUnreachable: "Tarjoilija-API:in ei saada yhteyttä",
  repairDevice: "Parita uudelleen",
  waiterFallback: "Tarjoilija",
  readyCalls: "{ready} valmista · {calls} kutsua",
  live: "Live",
  reconnecting: "Yhdistetään",
  unpair: "Poista paritus",
  tableCalls: "Pöytäpyynnöt",
  openCount: "{count} auki",
  requestBill: "Pyydä lasku",
  callWaiter: "Kutsu tarjoilija",
  onMyWay: "Tulossa",
  done: "Valmis",
  colKitchen: "Keittiössä",
  colKitchenHint: "Valmistuu",
  colReady: "Valmis",
  colReadyHint: "Nouto",
  colServed: "Tarjottu",
  colServedHint: "Pöydässä",
  nothingHere: "Ei mitään",
  walkIn: "Walk-in",
  guest: "Vieras",
  rush: "KIIRE",
  vip: "VIP",
  seat: "paikka {n}",
  held: "(pidossa)",
  updating: "Päivitetään…",
  fireNext: "Lähetä seuraava annos",
  pickedUp: "Noudettu",
  markServed: "Merkitse tarjotuksi",
  closeCheck: "Sulje lasku",
  closeCheckTitle: "Edellyttää täyttä maksua kassalla ensin",
  footer: "© 2026 MayleSoft Restaurant Platform · Suunnittelu: Eng. Hasan Kamaal",
};

const ar: Messages = {
  language: "اللغة",
  floorTablet: "جهاز الصالة",
  waiterDisplay: "شاشة النادل",
  homeBody:
    "اربط هذا الجهاز برمز جهاز النادل لاستلام التذاكر الجاهزة ومعالجة طلبات الطاولة وإتمام الخدمة.",
  loading: "جارٍ التحميل…",
  loadingDisplay: "جارٍ تحميل الشاشة…",
  pairingLabel: "رمز الربط أو رمز الجهاز",
  pairingPlaceholder: "الصق رمز الربط من الإدارة أو رمز الجهاز",
  pairingSubmit: "افتح شاشة النادل",
  pairingPending: "جارٍ الربط…",
  enterPairing: "أدخل رمز الربط أو رمز الجهاز",
  qrPairingFailed: "فشل ربط رمز QR",
  pairingFailed: "فشل الربط",
  deviceOffline: "الجهاز غير متصل",
  apiUnreachable: "تعذر الوصول إلى واجهة النادل",
  repairDevice: "أعد الربط",
  waiterFallback: "النادل",
  readyCalls: "{ready} جاهز · {calls} نداء",
  live: "مباشر",
  reconnecting: "إعادة الاتصال",
  unpair: "إلغاء الربط",
  tableCalls: "نداءات الطاولة",
  openCount: "{count} مفتوح",
  requestBill: "طلب الفاتورة",
  callWaiter: "استدعاء النادل",
  onMyWay: "في الطريق",
  done: "تم",
  colKitchen: "في المطبخ",
  colKitchenHint: "يُحضَّر",
  colReady: "جاهز",
  colReadyHint: "استلام",
  colServed: "قُدِّم",
  colServedHint: "على الطاولة",
  nothingHere: "لا شيء هنا",
  walkIn: "حضور مباشر",
  guest: "ضيف",
  rush: "عاجل",
  vip: "VIP",
  seat: "مقعد {n}",
  held: "(موقوف)",
  updating: "جارٍ التحديث…",
  fireNext: "أرسل الطبق التالي",
  pickedUp: "تم الاستلام",
  markServed: "تعليم كمُقدَّم",
  closeCheck: "إغلاق الحساب",
  closeCheckTitle: "يتطلب الدفع الكامل في الصندوق أولاً",
  footer: "© 2026 MayleSoft Restaurant Platform · تصميم م. حسن كمال",
};

const so: Messages = {
  language: "Luqadda",
  floorTablet: "Tablet-ka dabaqa",
  waiterDisplay: "Shaashadda adeegaha",
  homeBody:
    "Isku xidh tablet-kan iyo token-ka aaladda adeegaha si aad u qaadato tickets diyaar ah, u xallisato wicitaannada miiska, oo aad u dhammaystirto adeegga.",
  loading: "Waa la soo rarayaa…",
  loadingDisplay: "Shaashadda waa la soo rarayaa…",
  pairingLabel: "Koodka isku xidhka ama token-ka aaladda",
  pairingPlaceholder: "Ku dheji koodka Admin ama token-ka aaladda",
  pairingSubmit: "Fur shaashadda adeegaha",
  pairingPending: "Waa la isku xidhayaa…",
  enterPairing: "Geli koodka isku xidhka ama token-ka",
  qrPairingFailed: "Isku xidhka QR wuu fashilmay",
  pairingFailed: "Isku xidhku wuu fashilmay",
  deviceOffline: "Aaladdu offline bay tahay",
  apiUnreachable: "Lama gaadhi karo API-ga adeegaha",
  repairDevice: "Dib u isku xidh",
  waiterFallback: "Adeegaha",
  readyCalls: "{ready} diyaar · {calls} wicitaan",
  live: "Toos",
  reconnecting: "Dib u xiriirin",
  unpair: "Ka xir",
  tableCalls: "Wicitaannada miiska",
  openCount: "{count} furan",
  requestBill: "Codso biilka",
  callWaiter: "Wac adeegaha",
  onMyWay: "Waan imanayaa",
  done: "Dhameystiran",
  colKitchen: "Jikada ku jira",
  colKitchenHint: "Waa la kariyaa",
  colReady: "Diyaar",
  colReadyHint: "Qaado",
  colServed: "La adeegay",
  colServedHint: "Miiska",
  nothingHere: "Waxba ma jiraan",
  walkIn: "Walk-in",
  guest: "Marti",
  rush: "DEGDEG",
  vip: "VIP",
  seat: "kursi {n}",
  held: "(la hayo)",
  updating: "Waa la cusbooneysiinayaa…",
  fireNext: "Riday course-ka xiga",
  pickedUp: "La qaatay",
  markServed: "Calaamadee la adeegay",
  closeCheck: "Xir biilka",
  closeCheckTitle: "U baahan lacag-bixin buuxda kassierka marka hore",
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
