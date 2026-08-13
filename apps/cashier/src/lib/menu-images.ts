/**
 * Resolve menu photos the same way as the customer app.
 * Local keys (`menu/margherita.jpg`) are served from the customer
 * project's `/images/menu/…` so cashier doesn't ship duplicate assets.
 */

const CUSTOMER_URL = (
  process.env.NEXT_PUBLIC_CUSTOMER_URL?.trim() ||
  (process.env.NODE_ENV === "production"
    ? "https://restaurant-platform-customer.vercel.app"
    : "http://localhost:3001")
).replace(/\/$/, "");

/** Case-insensitive name → bundled photo key (covers Alhuda items missing imageUrl). */
const NAME_TO_MENU_KEY: Record<string, string> = {
  "margherita pizza": "menu/margherita.jpg",
  margherita: "menu/margherita.jpg",
  "caesar salad": "menu/caesar-salad.jpg",
  "greek salad": "menu/salad-greek.jpg",
  "garden salad": "menu/salad-garden.jpg",
  "tuna salad": "menu/salad-tuna.jpg",
  "chicken salad": "menu/salad-chicken.jpg",
  "avocado salad": "menu/salad-avocado.jpg",
  "caprese salad": "menu/salad-caprese.jpg",
  "seafood salad": "menu/salad-seafood.jpg",
  tiramisu: "menu/tiramisu.jpg",
  cake: "menu/tiramisu.jpg",
  sambusa: "menu/sambusa.jpg",
  bur: "menu/bur.jpg",
  bariis: "menu/bariis.jpg",
  soor: "menu/soor.jpg",
  "somali soor": "menu/soor.jpg",
  "soor with salmon": "menu/soor-salmon.jpg",
  "soor salmon": "menu/soor-salmon.jpg",
  suqaar: "menu/suqaar.jpg",
  "somali-soup": "menu/somali-soup.jpg",
  "somali soup": "menu/somali-soup.jpg",
  "fish soup": "menu/fish-soup.jpg",
  "grilled fish": "menu/grilled-fish.jpg",
  "pasta with fish": "menu/pasta-fish.jpg",
  "pasta fish": "menu/pasta-fish.jpg",
  "fish pasta": "menu/pasta-fish.jpg",
  "pasta with salmon": "menu/pasta-salmon.jpg",
  "pasta salmon": "menu/pasta-salmon.jpg",
  "salmon pasta": "menu/pasta-salmon.jpg",
  lasagna: "menu/pasta-lasagna.jpg",
  "pasta lasagna": "menu/pasta-lasagna.jpg",
  "cream pasta": "menu/pasta-cream.jpg",
  "pasta cream": "menu/pasta-cream.jpg",
  bolognese: "menu/pasta-bolognese.jpg",
  "pasta bolognese": "menu/pasta-bolognese.jpg",
  tea: "menu/tea.jpg",
  "black tea": "menu/tea-no-milk.jpg",
  "tea without milk": "menu/tea-no-milk.jpg",
  "tea (no milk)": "menu/tea-no-milk.jpg",
  espresso: "menu/coffee-espresso.jpg",
  coffee: "menu/coffee-espresso.jpg",
  cappuccino: "menu/coffee-cappuccino.jpg",
  latte: "menu/coffee-latte.jpg",
  "hot chocolate": "menu/hot-chocolate.jpg",
  lemonade: "menu/cold-lemonade.jpg",
  cola: "menu/cold-cola.jpg",
  "orange juice": "menu/cold-orange-juice.jpg",
  fanta: "menu/soft-drink.jpg",
  "soft drink": "menu/soft-drink.jpg",
  "chocolate shake": "menu/shake-chocolate.jpg",
  "strawberry shake": "menu/shake-strawberry.jpg",
  "vanilla shake": "menu/shake-vanilla.jpg",
  "mango shake": "menu/shake-mango.jpg",
};

function toCustomerMenuUrl(key: string): string {
  const file = key.replace(/^menu\//, "");
  return `${CUSTOMER_URL}/images/menu/${file}`;
}

export function resolveMenuImage(
  imageUrl: string | null | undefined,
  itemName?: string | null,
): string | null {
  if (imageUrl?.trim()) {
    const raw = imageUrl.trim();
    if (/^https?:\/\//i.test(raw)) return raw;

    if (raw.startsWith("/images/menu/")) {
      return `${CUSTOMER_URL}${raw}`;
    }

    if (raw.startsWith("/")) return raw;

    const key = raw.startsWith("menu/")
      ? raw
      : `menu/${raw.replace(/^\//, "")}`;
    return toCustomerMenuUrl(key);
  }

  const nameKey = itemName?.trim().toLowerCase();
  if (nameKey && NAME_TO_MENU_KEY[nameKey]) {
    return toCustomerMenuUrl(NAME_TO_MENU_KEY[nameKey]);
  }

  return null;
}
