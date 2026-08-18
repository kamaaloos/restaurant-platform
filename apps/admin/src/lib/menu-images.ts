/**
 * Local menu photos live in `public/images/menu/` (not static imports —
 * Turbopack HMR breaks on many large JPG imports under src/images).
 *
 * DB / admin store keys like `menu/margherita.jpg` → served as `/images/menu/margherita.jpg`.
 */

export const LOCAL_MENU_IMAGE_KEYS = [
  "menu/margherita.jpg",
  "menu/caesar-salad.jpg",
  "menu/salad-greek.jpg",
  "menu/salad-garden.jpg",
  "menu/salad-tuna.jpg",
  "menu/salad-chicken.jpg",
  "menu/salad-avocado.jpg",
  "menu/salad-caprese.jpg",
  "menu/salad-seafood.jpg",
  "menu/tiramisu.jpg",
  "menu/sambusa.jpg",
  "menu/bur.jpg",
  "menu/bariis.jpg",
  "menu/soor.jpg",
  "menu/soor-salmon.jpg",
  "menu/suqaar.jpg",
  "menu/somali-soup.jpg",
  "menu/fish-soup.jpg",
  "menu/grilled-fish.jpg",
  "menu/pasta-fish.jpg",
  "menu/pasta-salmon.jpg",
  "menu/pasta-lasagna.jpg",
  "menu/pasta-cream.jpg",
  "menu/pasta-bolognese.jpg",
  "menu/tea.jpg",
  "menu/tea-no-milk.jpg",
  "menu/coffee-espresso.jpg",
  "menu/coffee-cappuccino.jpg",
  "menu/coffee-latte.jpg",
  "menu/hot-chocolate.jpg",
  "menu/soft-drink.jpg",
  "menu/cold-lemonade.jpg",
  "menu/cold-cola.jpg",
  "menu/cold-orange-juice.jpg",
  "menu/shake-chocolate.jpg",
  "menu/shake-strawberry.jpg",
  "menu/shake-vanilla.jpg",
  "menu/shake-mango.jpg",
] as const;

export type LocalMenuImageKey = (typeof LOCAL_MENU_IMAGE_KEYS)[number];

const LOCAL_MENU_IMAGE_SET = new Set<string>(LOCAL_MENU_IMAGE_KEYS);

export const LOCAL_MENU_IMAGE_OPTIONS: ReadonlyArray<{
  key: LocalMenuImageKey;
  label: string;
}> = [
  { key: "menu/margherita.jpg", label: "Margherita pizza" },
  { key: "menu/caesar-salad.jpg", label: "Caesar salad" },
  { key: "menu/salad-greek.jpg", label: "Greek salad" },
  { key: "menu/salad-garden.jpg", label: "Garden salad" },
  { key: "menu/salad-tuna.jpg", label: "Tuna salad" },
  { key: "menu/salad-chicken.jpg", label: "Chicken salad" },
  { key: "menu/salad-avocado.jpg", label: "Avocado salad" },
  { key: "menu/salad-caprese.jpg", label: "Caprese salad" },
  { key: "menu/salad-seafood.jpg", label: "Seafood salad" },
  { key: "menu/tiramisu.jpg", label: "Tiramisu" },
  { key: "menu/sambusa.jpg", label: "Sambusa" },
  { key: "menu/bur.jpg", label: "Bur / rice" },
  { key: "menu/bariis.jpg", label: "Bariis" },
  { key: "menu/soor.jpg", label: "Soor" },
  { key: "menu/soor-salmon.jpg", label: "Soor with salmon" },
  { key: "menu/suqaar.jpg", label: "Suqaar" },
  { key: "menu/somali-soup.jpg", label: "Somali soup" },
  { key: "menu/fish-soup.jpg", label: "Fish soup" },
  { key: "menu/grilled-fish.jpg", label: "Grilled fish" },
  { key: "menu/pasta-fish.jpg", label: "Pasta with fish" },
  { key: "menu/pasta-salmon.jpg", label: "Pasta with salmon" },
  { key: "menu/pasta-lasagna.jpg", label: "Lasagna" },
  { key: "menu/pasta-cream.jpg", label: "Cream pasta" },
  { key: "menu/pasta-bolognese.jpg", label: "Pasta bolognese" },
  { key: "menu/tea.jpg", label: "Tea (with milk)" },
  { key: "menu/tea-no-milk.jpg", label: "Tea (no milk)" },
  { key: "menu/coffee-espresso.jpg", label: "Espresso" },
  { key: "menu/coffee-cappuccino.jpg", label: "Cappuccino" },
  { key: "menu/coffee-latte.jpg", label: "Latte" },
  { key: "menu/hot-chocolate.jpg", label: "Hot chocolate" },
  { key: "menu/soft-drink.jpg", label: "Soft drink (orange)" },
  { key: "menu/cold-lemonade.jpg", label: "Lemonade" },
  { key: "menu/cold-cola.jpg", label: "Cola" },
  { key: "menu/cold-orange-juice.jpg", label: "Orange juice" },
  { key: "menu/shake-chocolate.jpg", label: "Chocolate shake" },
  { key: "menu/shake-strawberry.jpg", label: "Strawberry shake" },
  { key: "menu/shake-vanilla.jpg", label: "Vanilla shake" },
  { key: "menu/shake-mango.jpg", label: "Mango shake" },
];

function toPublicPath(key: string): string {
  const file = key.replace(/^menu\//, "");
  return `/images/menu/${file}`;
}

/**
 * Resolve a menu image field:
 * - remote http(s) URL → pass through
 * - local key (`menu/….jpg`) → `/images/menu/….jpg` from public/
 * - already a public path starting with `/` → pass through
 */
export function resolveMenuImage(
  imageUrl: string | null | undefined,
): string | null {
  if (!imageUrl?.trim()) return null;
  const raw = imageUrl.trim();
  if (/^https?:\/\//i.test(raw)) return raw;

  const normalized = raw.replace(/^\//, "");
  if (LOCAL_MENU_IMAGE_SET.has(normalized)) {
    return toPublicPath(normalized);
  }

  const asMenuKey = raw.startsWith("menu/") ? raw : `menu/${raw}`;
  if (LOCAL_MENU_IMAGE_SET.has(asMenuKey)) {
    return toPublicPath(asMenuKey);
  }

  if (raw.startsWith("/uploads/")) {
    const api = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/api\/?$/, "");
    return api ? `${api}${raw}` : raw;
  }

  if (raw.startsWith("/")) return raw;
  return null;
}

export function isRemoteMenuImage(url: string | null | undefined): boolean {
  return !!url && /^https?:\/\//i.test(url.trim());
}

export function uniqueRemoteMenuImages(
  ...lists: Array<Iterable<string | null | undefined> | undefined | null>
): string[] {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const list of lists) {
    if (!list) continue;
    for (const raw of list) {
      const v = raw?.trim();
      if (!v || !isRemoteMenuImage(v) || seen.has(v)) continue;
      seen.add(v);
      out.push(v);
    }
  }
  return out;
}

export function menuImagePreviewSrc(
  imageUrl: string | null | undefined,
): string | null {
  return resolveMenuImage(imageUrl);
}
