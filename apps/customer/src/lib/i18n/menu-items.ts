import { localizeDigits } from "./helpers";
import type { Locale } from "./locales";

type LocalizedName = Record<Locale, string>;

function normalizeName(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ")
    .replace(/[–—]/g, "-");
}

function normalizeImageKey(imageUrl: string | null | undefined): string | null {
  if (!imageUrl?.trim()) return null;
  const raw = imageUrl.trim().replace(/^\//, "");
  if (raw.startsWith("images/menu/")) {
    return `menu/${raw.slice("images/menu/".length)}`;
  }
  if (raw.startsWith("menu/")) return raw;
  if (raw.includes("/")) return null;
  return `menu/${raw}`;
}

/** Canonical dish labels keyed by admin English name (normalized). */
const BY_NAME: Record<string, LocalizedName> = {
  "avocado salad": {
    en: "Avocado salad",
    fi: "Avokadosalaatti",
    ar: "سلطة أفوكادو",
    so: "Salad avocado",
  },
  "black tea": {
    en: "Black tea",
    fi: "Musta tee",
    ar: "شاي أسود",
    so: "Shaah madow",
  },
  bur: {
    en: "Bur",
    fi: "Bur",
    ar: "بور",
    so: "Bur",
  },
  "caeser salad": {
    en: "Caesar salad",
    fi: "Caesar-salaatti",
    ar: "سلطة قيصر",
    so: "Salad Caesar",
  },
  "caesar salad": {
    en: "Caesar salad",
    fi: "Caesar-salaatti",
    ar: "سلطة قيصر",
    so: "Salad Caesar",
  },
  cappuccino: {
    en: "Cappuccino",
    fi: "Cappuccino",
    ar: "كابتشينو",
    so: "Cappuccino",
  },
  "chicken salad": {
    en: "Chicken salad",
    fi: "Kanansalaatti",
    ar: "سلطة دجاج",
    so: "Salad digaag",
  },
  "chocolate shake": {
    en: "Chocolate shake",
    fi: "Suklaapirtelö",
    ar: "ميلك شيك شوكولاتة",
    so: "Shake shukulaato",
  },
  cola: {
    en: "Cola",
    fi: "Cola",
    ar: "كولا",
    so: "Cola",
  },
  espresso: {
    en: "Espresso",
    fi: "Espresso",
    ar: "إسبريسو",
    so: "Espresso",
  },
  "fish soup": {
    en: "Fish soup",
    fi: "Kalakeitto",
    ar: "شوربة سمك",
    so: "Maraq kalluun",
  },
  "garden salad": {
    en: "Garden salad",
    fi: "Puutarhasalaatti",
    ar: "سلطة خضار",
    so: "Salad cagaar",
  },
  "hot drinks ->tea": {
    en: "Somali tea",
    fi: "Somalialainen tee",
    ar: "شاي صومالي",
    so: "Shaah Soomaali",
  },
  lasagna: {
    en: "Lasagna",
    fi: "Lasagne",
    ar: "لازانيا",
    so: "Lasagna",
  },
  latte: {
    en: "Latte",
    fi: "Latte",
    ar: "لاتيه",
    so: "Latte",
  },
  lemonade: {
    en: "Lemonade",
    fi: "Limonaadi",
    ar: "ليموناضة",
    so: "Liimoonayd",
  },
  "mango lasi": {
    en: "Mango lassi",
    fi: "Mango lassi",
    ar: "مانجو لاسي",
    so: "Mango lassi",
  },
  "margherita pizza": {
    en: "Margherita pizza",
    fi: "Margherita-pizza",
    ar: "بيتزا مارغريتا",
    so: "Pizza Margherita",
  },
  "orange juice": {
    en: "Orange juice",
    fi: "Appelsiinimehu",
    ar: "عصير برتقال",
    so: "Liis liin dhanaan",
  },
  "orange with ice": {
    en: "Orange with ice",
    fi: "Appelsiini jäällä",
    ar: "برتقال مثلج",
    so: "Liin dhanaan baraf leh",
  },
  pasta: {
    en: "Pasta",
    fi: "Pasta",
    ar: "باستا",
    so: "Baasto",
  },
  "pasta bolognese": {
    en: "Pasta bolognese",
    fi: "Pasta bolognese",
    ar: "باستا بولونيز",
    so: "Baasto bolognese",
  },
  "pasta with salmon": {
    en: "Pasta with salmon",
    fi: "Lohipasta",
    ar: "باستا بالسلمون",
    so: "Baasto salmon",
  },
  "rice with meat": {
    en: "Rice with meat",
    fi: "Riisiä ja lihaa",
    ar: "أرز باللحم",
    so: "Bariis hilib leh",
  },
  sambusa: {
    en: "Sambusa",
    fi: "Sambusa",
    ar: "سمبوسة",
    so: "Sambuusa",
  },
  sanbuse: {
    en: "Sambusa",
    fi: "Sambusa",
    ar: "سمبوسة",
    so: "Sambuusa",
  },
  "sea food salad": {
    en: "Seafood salad",
    fi: "Äyriäissalaatti",
    ar: "سلطة بحرية",
    so: "Salad badda",
  },
  "seafood salad": {
    en: "Seafood salad",
    fi: "Äyriäissalaatti",
    ar: "سلطة بحرية",
    so: "Salad badda",
  },
  "soft drink -> fanta": {
    en: "Fanta",
    fi: "Fanta",
    ar: "فانتا",
    so: "Fanta",
  },
  "somali-soup": {
    en: "Somali soup",
    fi: "Somalialainen keitto",
    ar: "شوربة صومالية",
    so: "Maraq Soomaali",
  },
  "somali soup": {
    en: "Somali soup",
    fi: "Somalialainen keitto",
    ar: "شوربة صومالية",
    so: "Maraq Soomaali",
  },
  "somali tea": {
    en: "Somali tea",
    fi: "Somalialainen tee",
    ar: "شاي صومالي",
    so: "Shaah Soomaali",
  },
  "soor with meat": {
    en: "Soor with meat",
    fi: "Soor lihalla",
    ar: "سور باللحم",
    so: "Soor hilib leh",
  },
  "soor with salmon": {
    en: "Soor with salmon",
    fi: "Soor lohella",
    ar: "سور بالسلمون",
    so: "Soor salmon leh",
  },
  "strawberry skake": {
    en: "Strawberry shake",
    fi: "Mansikkapirtelö",
    ar: "ميلك شيك فراولة",
    so: "Shake strawberry",
  },
  "strawberry shake": {
    en: "Strawberry shake",
    fi: "Mansikkapirtelö",
    ar: "ميلك شيك فراولة",
    so: "Shake strawberry",
  },
  suqaar: {
    en: "Suqaar",
    fi: "Suqaar",
    ar: "سقار",
    so: "Suqaar",
  },
  tiramisu: {
    en: "Tiramisu",
    fi: "Tiramisu",
    ar: "تيراميسو",
    so: "Tiramisu",
  },
  "tuna salad": {
    en: "Tuna salad",
    fi: "Tonnikalasalaatti",
    ar: "سلطة تونة",
    so: "Salad tuna",
  },
  "vanila shake": {
    en: "Vanilla shake",
    fi: "Vaniljapirtelö",
    ar: "ميلك شيك فانيليا",
    so: "Shake vanilje",
  },
  "vanilla shake": {
    en: "Vanilla shake",
    fi: "Vaniljapirtelö",
    ar: "ميلك شيك فانيليا",
    so: "Shake vanilje",
  },
  "hot chocolate": {
    en: "Hot chocolate",
    fi: "Kaakao",
    ar: "شوكولاتة ساخنة",
    so: "Shukulaato kulul",
  },
  "greek salad": {
    en: "Greek salad",
    fi: "Kreikkalainen salaatti",
    ar: "سلطة يونانية",
    so: "Salad Greek",
  },
  "caprese salad": {
    en: "Caprese salad",
    fi: "Caprese-salaatti",
    ar: "سلطة كابريزي",
    so: "Salad Caprese",
  },
  bariis: {
    en: "Bariis",
    fi: "Bariis",
    ar: "باريس",
    so: "Bariis",
  },
  soor: {
    en: "Soor",
    fi: "Soor",
    ar: "سور",
    so: "Soor",
  },
  "grilled fish": {
    en: "Grilled fish",
    fi: "Grillattu kala",
    ar: "سمك مشوي",
    so: "Kalluun laabbas",
  },
  "cream pasta": {
    en: "Cream pasta",
    fi: "Kermapasta",
    ar: "باستا بالكريمة",
    so: "Baasto kareem",
  },
};

/** Dish descriptions keyed by admin English name (normalized). */
const DESC_BY_NAME: Record<string, LocalizedName> = {
  "avocado salad": {
    en: "Fresh avocado with mixed greens",
    fi: "Tuoretta avokadoa ja salaattia",
    ar: "أفوكادو طازج مع خضار مشكلة",
    so: "Avocado cusub iyo cagaar isku dhafan",
  },
  "black tea": {
    en: "Black tea without sugar and milk",
    fi: "Musta tee ilman sokeria ja maitoa",
    ar: "شاي أسود بدون سكر وحليب",
    so: "Shaah madow oo aan sonkor iyo caano lahayn",
  },
  bur: {
    en: "Somali-style deep-fried fritters",
    fi: "Somalialaiset uppopaistetut burit",
    ar: "فطائر صومالية مقلية",
    so: "Bur Soomaali oo la shiilay",
  },
  "caeser salad": {
    en: "Classic Caesar salad",
    fi: "Klassinen Caesar-salaatti",
    ar: "سلطة قيصر كلاسيكية",
    so: "Salad Caesar caadi ah",
  },
  "caesar salad": {
    en: "Classic Caesar salad",
    fi: "Klassinen Caesar-salaatti",
    ar: "سلطة قيصر كلاسيكية",
    so: "Salad Caesar caadi ah",
  },
  cappuccino: {
    en: "Italian-style cappuccino",
    fi: "Italialaistyylinen cappuccino",
    ar: "كابتشينو على الطريقة الإيطالية",
    so: "Cappuccino qaab Talyaani",
  },
  "chicken salad": {
    en: "Salad with chicken",
    fi: "Salaatti kanafileellä",
    ar: "سلطة مع الدجاج",
    so: "Salad digaag leh",
  },
  "chocolate shake": {
    en: "Creamy chocolate milkshake",
    fi: "Kermaisen suklaapirtelö",
    ar: "ميلك شيك شوكولاتة كريمي",
    so: "Shake shukulaato jilicsan",
  },
  cola: {
    en: "Coca-Cola with ice",
    fi: "Coca-Cola jäällä",
    ar: "كوكاكولا مع ثلج",
    so: "Coca-Cola baraf leh",
  },
  espresso: {
    en: "Hot espresso",
    fi: "Kuuma espresso",
    ar: "إسبريسو ساخن",
    so: "Espresso kulul",
  },
  "fish soup": {
    en: "Fish soup with sea greens",
    fi: "Kalakeitto meren antimilla",
    ar: "شوربة سمك مع أعشاب بحرية",
    so: "Maraq kalluun oo cagaar badeed leh",
  },
  "garden salad": {
    en: "Fresh garden vegetables",
    fi: "Tuoreita puutarhavihanneksia",
    ar: "خضار حدائق طازجة",
    so: "Khudaar cagaaran oo cusub",
  },
  "hot drinks ->tea": {
    en: "Hot cup of Somali tea with milk",
    fi: "Kuuma somalialainen tee maidolla",
    ar: "كوب شاي صومالي ساخن بالحليب",
    so: "Koob shaah Soomaali oo caano leh",
  },
  lasagna: {
    en: "Lasagna with minced meat",
    fi: "Lasagne jauhelihalla",
    ar: "لازانيا باللحم المفروم",
    so: "Lasagna hilib la shiiday leh",
  },
  latte: {
    en: "Coffee with milk and sugar",
    fi: "Kahvi maidolla ja sokerilla",
    ar: "قهوة بالحليب والسكر",
    so: "Qaxwo caano iyo sonkor leh",
  },
  lemonade: {
    en: "Cool and tasty lemonade",
    fi: "Raikas limonaadi",
    ar: "ليموناضة منعشة ولذيذة",
    so: "Liimoonayd qabow oo macaan",
  },
  "mango lasi": {
    en: "Mango lassi shake",
    fi: "Mango lassi -pirtelö",
    ar: "ميلك شيك مانجو لاسي",
    so: "Shake mango lassi",
  },
  "margherita pizza": {
    en: "Tomato, mozzarella, and fresh basil",
    fi: "Tomaattia, mozzarellaa ja tuoretta basilikaa",
    ar: "طماطم وموزاريلا وريحان طازج",
    so: "Yaanyo, mozzarella iyo basil cusub",
  },
  "orange juice": {
    en: "Fresh orange juice",
    fi: "Tuore appelsiinimehu",
    ar: "عصير برتقال طازج",
    so: "Liis liin dhanaan cusub",
  },
  "orange with ice": {
    en: "Refreshing cold drink for a hot day",
    fi: "Raikas kylmä juoma kuumalle päivälle",
    ar: "مشروب بارد منعش ليوم حار",
    so: "Cabitaan qabow oo qabow maalinta kulul",
  },
  pasta: {
    en: "Italian-style pasta",
    fi: "Italialaistyylinen pasta",
    ar: "باستا على الطريقة الإيطالية",
    so: "Baasto qaab Talyaani",
  },
  "pasta bolognese": {
    en: "Pasta with rich bolognese sauce",
    fi: "Pasta bolognese-kastikkeella",
    ar: "باستا بصلصة بولونيز غنية",
    so: "Baasto bolognese macaan",
  },
  "pasta with salmon": {
    en: "Pasta with salmon",
    fi: "Pasta lohella",
    ar: "باستا بالسلمون",
    so: "Baasto salmon leh",
  },
  "rice with meat": {
    en: "Rice served with meat",
    fi: "Riisiä lihan kanssa",
    ar: "أرز يقدم مع اللحم",
    so: "Bariis hilib la wada cuno",
  },
  sambusa: {
    en: "Savory meat and vegetable sambusa, served with chili",
    fi: "Suolainen liha-vihannesambusa chilillä",
    ar: "سمبوسة لحم وخضار تقدم مع الفلفل الحار",
    so: "Sambuusa hilib iyo khudaar, chili la socota",
  },
  sanbuse: {
    en: "Somali sambusa with meat or fish",
    fi: "Somalialainen sambusa lihalla tai kalalla",
    ar: "سمبوسة صومالية باللحم أو السمك",
    so: "Sambuusa Soomaali hilib ama kalluun",
  },
  "sea food salad": {
    en: "Salad with shrimp",
    fi: "Salaatti katkaravuilla",
    ar: "سلطة بالروبيان",
    so: "Salad shrimp leh",
  },
  "seafood salad": {
    en: "Salad with shrimp",
    fi: "Salaatti katkaravuilla",
    ar: "سلطة بالروبيان",
    so: "Salad shrimp leh",
  },
  "soft drink -> fanta": {
    en: "Fanta with ice",
    fi: "Fanta jäällä",
    ar: "فانتا مع ثلج",
    so: "Fanta baraf leh",
  },
  "somali-soup": {
    en: "Meat, potato, onion, and spices",
    fi: "Lihaa, perunaa, sipulia ja mausteita",
    ar: "لحم وبطاطس وبصل وتوابل",
    so: "Hilib, baradho, basasha iyo xawaash",
  },
  "somali soup": {
    en: "Meat, potato, onion, and spices",
    fi: "Lihaa, perunaa, sipulia ja mausteita",
    ar: "لحم وبطاطس وبصل وتوابل",
    so: "Hilib, baradho, basasha iyo xawaash",
  },
  "somali tea": {
    en: "Tea with milk and sugar",
    fi: "Tee maidolla ja sokerilla",
    ar: "شاي بالحليب والسكر",
    so: "Shaah caano iyo sonkor leh",
  },
  "soor with meat": {
    en: "Somali soor with suqaar",
    fi: "Somalialainen soor suqaarilla",
    ar: "سور صومالي مع سقار",
    so: "Soor Soomaali oo suqaar leh",
  },
  "soor with salmon": {
    en: "Soor served with salmon",
    fi: "Soor lohella",
    ar: "سور يقدم مع السلمون",
    so: "Soor salmon la wada cuno",
  },
  "strawberry skake": {
    en: "Creamy strawberry milkshake",
    fi: "Kermaisen mansikkapirtelö",
    ar: "ميلك شيك فراولة كريمي",
    so: "Shake strawberry jilicsan",
  },
  "strawberry shake": {
    en: "Creamy strawberry milkshake",
    fi: "Kermaisen mansikkapirtelö",
    ar: "ميلك شيك فراولة كريمي",
    so: "Shake strawberry jilicsan",
  },
  suqaar: {
    en: "Somali suqaar with bread or canjeero",
    fi: "Somalialainen suqaar leivän tai canjeeron kanssa",
    ar: "سقار صومالي مع خبز أو كانجيرو",
    so: "Suqaar Soomaali oo rooti ama canjeero leh",
  },
  tiramisu: {
    en: "Classic tiramisu — great with Somali coffee",
    fi: "Klassinen tiramisu — sopii somalialaiseen kahviin",
    ar: "تيراميسو كلاسيكي — رائع مع القهوة الصومالية",
    so: "Tiramisu caadi — wanaagsan qaxwada Soomaaliga",
  },
  "tuna salad": {
    en: "Fresh tuna salad",
    fi: "Tuore tonnikalasalaatti",
    ar: "سلطة تونة طازجة",
    so: "Salad tuna cusub",
  },
  "vanila shake": {
    en: "Creamy vanilla milkshake",
    fi: "Kermaisen vaniljapirtelö",
    ar: "ميلك شيك فانيليا كريمي",
    so: "Shake vanilje jilicsan",
  },
  "vanilla shake": {
    en: "Creamy vanilla milkshake",
    fi: "Kermaisen vaniljapirtelö",
    ar: "ميلك شيك فانيليا كريمي",
    so: "Shake vanilje jilicsan",
  },
  "hot chocolate": {
    en: "Rich hot chocolate",
    fi: "Täyteläinen kaakao",
    ar: "شوكولاتة ساخنة غنية",
    so: "Shukulaato kulul oo macaan",
  },
  "greek salad": {
    en: "Classic Greek salad",
    fi: "Klassinen kreikkalainen salaatti",
    ar: "سلطة يونانية كلاسيكية",
    so: "Salad Greek caadi ah",
  },
  "caprese salad": {
    en: "Tomato, mozzarella, and basil",
    fi: "Tomaattia, mozzarellaa ja basilikaa",
    ar: "طماطم وموزاريلا وريحان",
    so: "Yaanyo, mozzarella iyo basil",
  },
  bariis: {
    en: "Somali-style rice",
    fi: "Somalialaistyylinen riisi",
    ar: "أرز على الطريقة الصومالية",
    so: "Bariis Soomaali",
  },
  soor: {
    en: "Traditional Somali soor",
    fi: "Perinteinen somalialainen soor",
    ar: "سور صومالي تقليدي",
    so: "Soor Soomaali dhaqameed",
  },
  "grilled fish": {
    en: "Grilled fish, simply seasoned",
    fi: "Grillattua kalaa kevyesti maustettuna",
    ar: "سمك مشوي متبل ببساطة",
    so: "Kalluun laabbas oo fudud xawaash leh",
  },
  "cream pasta": {
    en: "Pasta in a creamy sauce",
    fi: "Pasta kermakastikkeessa",
    ar: "باستا بصلصة كريمية",
    so: "Baasto kareem jilicsan",
  },
};

/** Fallback when admin names differ but image key is known. */
const BY_IMAGE: Record<string, LocalizedName> = {
  "menu/salad-avocado.jpg": BY_NAME["avocado salad"]!,
  "menu/tea-no-milk.jpg": BY_NAME["black tea"]!,
  "menu/bur.jpg": BY_NAME.bur!,
  "menu/caesar-salad.jpg": BY_NAME["caesar salad"]!,
  "menu/coffee-cappuccino.jpg": BY_NAME.cappuccino!,
  "menu/salad-chicken.jpg": BY_NAME["chicken salad"]!,
  "menu/shake-chocolate.jpg": BY_NAME["chocolate shake"]!,
  "menu/cold-cola.jpg": BY_NAME.cola!,
  "menu/coffee-espresso.jpg": BY_NAME.espresso!,
  "menu/fish-soup.jpg": BY_NAME["fish soup"]!,
  "menu/salad-garden.jpg": BY_NAME["garden salad"]!,
  "menu/tea.jpg": BY_NAME["somali tea"]!,
  "menu/pasta-lasagna.jpg": BY_NAME.lasagna!,
  "menu/coffee-latte.jpg": BY_NAME.latte!,
  "menu/cold-lemonade.jpg": BY_NAME.lemonade!,
  "menu/shake-mango.jpg": BY_NAME["mango lasi"]!,
  "menu/margherita.jpg": BY_NAME["margherita pizza"]!,
  "menu/cold-orange-juice.jpg": BY_NAME["orange juice"]!,
  "menu/soft-drink.jpg": BY_NAME["orange with ice"]!,
  "menu/pasta-fish.jpg": BY_NAME.pasta!,
  "menu/pasta-bolognese.jpg": BY_NAME["pasta bolognese"]!,
  "menu/pasta-salmon.jpg": BY_NAME["pasta with salmon"]!,
  "menu/sambusa.jpg": BY_NAME.sambusa!,
  "menu/salad-seafood.jpg": BY_NAME["seafood salad"]!,
  "menu/somali-soup.jpg": BY_NAME["somali soup"]!,
  "menu/soor.jpg": BY_NAME["soor with meat"]!,
  "menu/soor-salmon.jpg": BY_NAME["soor with salmon"]!,
  "menu/shake-strawberry.jpg": BY_NAME["strawberry shake"]!,
  "menu/suqaar.jpg": BY_NAME.suqaar!,
  "menu/tiramisu.jpg": BY_NAME.tiramisu!,
  "menu/salad-tuna.jpg": BY_NAME["tuna salad"]!,
  "menu/shake-vanilla.jpg": BY_NAME["vanilla shake"]!,
  "menu/hot-chocolate.jpg": BY_NAME["hot chocolate"]!,
  "menu/salad-greek.jpg": BY_NAME["greek salad"]!,
  "menu/salad-caprese.jpg": BY_NAME["caprese salad"]!,
  "menu/bariis.jpg": BY_NAME.bariis!,
  "menu/grilled-fish.jpg": BY_NAME["grilled fish"]!,
  "menu/pasta-cream.jpg": BY_NAME["cream pasta"]!,
};

const DESC_BY_IMAGE: Record<string, LocalizedName> = {
  "menu/salad-avocado.jpg": DESC_BY_NAME["avocado salad"]!,
  "menu/tea-no-milk.jpg": DESC_BY_NAME["black tea"]!,
  "menu/bur.jpg": DESC_BY_NAME.bur!,
  "menu/caesar-salad.jpg": DESC_BY_NAME["caesar salad"]!,
  "menu/coffee-cappuccino.jpg": DESC_BY_NAME.cappuccino!,
  "menu/salad-chicken.jpg": DESC_BY_NAME["chicken salad"]!,
  "menu/shake-chocolate.jpg": DESC_BY_NAME["chocolate shake"]!,
  "menu/cold-cola.jpg": DESC_BY_NAME.cola!,
  "menu/coffee-espresso.jpg": DESC_BY_NAME.espresso!,
  "menu/fish-soup.jpg": DESC_BY_NAME["fish soup"]!,
  "menu/salad-garden.jpg": DESC_BY_NAME["garden salad"]!,
  "menu/tea.jpg": DESC_BY_NAME["somali tea"]!,
  "menu/pasta-lasagna.jpg": DESC_BY_NAME.lasagna!,
  "menu/coffee-latte.jpg": DESC_BY_NAME.latte!,
  "menu/cold-lemonade.jpg": DESC_BY_NAME.lemonade!,
  "menu/shake-mango.jpg": DESC_BY_NAME["mango lasi"]!,
  "menu/margherita.jpg": DESC_BY_NAME["margherita pizza"]!,
  "menu/cold-orange-juice.jpg": DESC_BY_NAME["orange juice"]!,
  "menu/soft-drink.jpg": DESC_BY_NAME["orange with ice"]!,
  "menu/pasta-fish.jpg": DESC_BY_NAME.pasta!,
  "menu/pasta-bolognese.jpg": DESC_BY_NAME["pasta bolognese"]!,
  "menu/pasta-salmon.jpg": DESC_BY_NAME["pasta with salmon"]!,
  "menu/sambusa.jpg": DESC_BY_NAME.sambusa!,
  "menu/salad-seafood.jpg": DESC_BY_NAME["seafood salad"]!,
  "menu/somali-soup.jpg": DESC_BY_NAME["somali soup"]!,
  "menu/soor.jpg": DESC_BY_NAME["soor with meat"]!,
  "menu/soor-salmon.jpg": DESC_BY_NAME["soor with salmon"]!,
  "menu/shake-strawberry.jpg": DESC_BY_NAME["strawberry shake"]!,
  "menu/suqaar.jpg": DESC_BY_NAME.suqaar!,
  "menu/tiramisu.jpg": DESC_BY_NAME.tiramisu!,
  "menu/salad-tuna.jpg": DESC_BY_NAME["tuna salad"]!,
  "menu/shake-vanilla.jpg": DESC_BY_NAME["vanilla shake"]!,
  "menu/hot-chocolate.jpg": DESC_BY_NAME["hot chocolate"]!,
  "menu/salad-greek.jpg": DESC_BY_NAME["greek salad"]!,
  "menu/salad-caprese.jpg": DESC_BY_NAME["caprese salad"]!,
  "menu/bariis.jpg": DESC_BY_NAME.bariis!,
  "menu/grilled-fish.jpg": DESC_BY_NAME["grilled fish"]!,
  "menu/pasta-cream.jpg": DESC_BY_NAME["cream pasta"]!,
};

function lookupLocalized(
  tableByName: Record<string, LocalizedName>,
  tableByImage: Record<string, LocalizedName>,
  name: string,
  locale: Locale,
  imageUrl?: string | null,
): string | null {
  const byName = tableByName[normalizeName(name)];
  if (byName) return byName[locale] ?? byName.en;

  const imageKey = normalizeImageKey(imageUrl);
  if (imageKey && tableByImage[imageKey]) {
    const byImage = tableByImage[imageKey]!;
    return byImage[locale] ?? byImage.en;
  }

  return null;
}

export function localizedMenuItemName(
  name: string,
  locale: Locale,
  imageUrl?: string | null,
): string {
  return (
    lookupLocalized(BY_NAME, BY_IMAGE, name, locale, imageUrl) ?? name
  );
}

export function localizedMenuItemDescription(
  name: string,
  locale: Locale,
  imageUrl?: string | null,
  fallback?: string | null,
): string | null {
  return (
    lookupLocalized(DESC_BY_NAME, DESC_BY_IMAGE, name, locale, imageUrl) ??
    fallback ??
    null
  );
}

/** Locale-aware menu index (Eastern Arabic digits when Arabic is selected). */
export function formatMenuIndex(index: number, locale: Locale): string {
  return localizeDigits(String(Math.trunc(index)), locale);
}
