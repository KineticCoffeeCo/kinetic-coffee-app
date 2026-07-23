export type GrindOption = {
  id: string;
  label: string;
  priceDeltaCents: number; // added on top of base price
};

export type Product = {
  slug: string;
  name: string;
  origin: string;
  description: string;
  priceCents: number;      // base price in cents
  category: 'coffee' | 'refresher';
  image: string;            // path under /public
  grindOptions?: GrindOption[];
  subscribable?: boolean;   // show "Subscribe & Save" option
  subscriptionDiscountPct?: number; // e.g. 10 = 10% off subscription price
};

const GRIND_OPTIONS: GrindOption[] = [
  { id: 'whole-bean', label: 'Whole Bean', priceDeltaCents: 0 },
  { id: 'french-press', label: 'French Press - Coarse', priceDeltaCents: 100 },
  { id: 'drip', label: 'Drip - Medium', priceDeltaCents: 100 },
  { id: 'espresso', label: 'Espresso - Fine', priceDeltaCents: 100 },
];

export const PRODUCTS: Product[] = [
  {
    slug: 'white-knuckle',
    name: 'White Knuckle',
    origin: 'Brazil · White Roast · Highest Caffeine',
    description:
      "Deceptively mellow — a hint of peanut butter and toasted grain, almost no bitterness. Don't let the light color fool you: less time on heat means more caffeine left in the bean than anything else in the lineup.",
    priceCents: 2500,
    category: 'coffee',
    image: '/products/white-knuckle.png',
    grindOptions: GRIND_OPTIONS,
    subscribable: true,
    subscriptionDiscountPct: 10,
  },
  {
    slug: 'standard-issue',
    name: 'Standard Issue',
    origin: 'Peru · Medium Roast',
    description:
      'The daily driver. Toasted nuts, milk chocolate, and a balanced body — the one you keep in rotation year-round.',
    priceCents: 2500,
    category: 'coffee',
    image: '/products/standard-issue.png',
    grindOptions: GRIND_OPTIONS,
    subscribable: true,
    subscriptionDiscountPct: 10,
  },
  {
    slug: 'rally-point',
    name: 'Rally Point',
    origin: 'Ethiopia · Medium Roast',
    description:
      'Bright and floral, with notes of berry and stone fruit. The one that gets a "what is this?" from whoever you share it with.',
    priceCents: 2500,
    category: 'coffee',
    image: '/products/rally-point.png',
    grindOptions: GRIND_OPTIONS,
    subscribable: true,
    subscriptionDiscountPct: 10,
  },
  {
    slug: 'full-deployment',
    name: 'Full Deployment',
    origin: 'Colombia · Medium Roast',
    description:
      'Caramel, toasted nuts, plum, and a touch of cocoa nib. The boldest of the lineup without tipping into bitter.',
    priceCents: 2500,
    category: 'coffee',
    image: '/products/full-deployment.png',
    grindOptions: GRIND_OPTIONS,
    subscribable: true,
    subscriptionDiscountPct: 10,
  },
  {
    slug: 'watermelon-rush',
    name: 'Watermelon Rush',
    origin: 'Lotus Energy · Naturally Caffeinated',
    description:
      'Bright watermelon over ice, powered by the Plant Power 7 blend. Naturally caffeinated, no synthetic stimulants, no crash.',
    priceCents: 600,
    category: 'refresher',
    image: '/products/watermelon-rush.png',
    subscribable: false,
  },
  {
    slug: 'peach-mango-charge',
    name: 'Peach Mango Charge',
    origin: 'Lotus Energy · Naturally Caffeinated',
    description:
      'Sweet peach and mango, built for an afternoon push. Powered by the Plant Power 7 blend — clean plant-based lift, no coffee required.',
    priceCents: 600,
    category: 'refresher',
    image: '/products/peach-mango-charge.png',
    subscribable: false,
  },
  {
    slug: 'berry-bloom',
    name: 'Berry Bloom',
    origin: 'Lotus Energy · Naturally Caffeinated',
    description:
      'Mixed berries with a floral finish. Built on the Plant Power 7 blend — vibrant color, clean ingredients, zero synthetic stimulants.',
    priceCents: 600,
    category: 'refresher',
    image: '/products/berry-bloom.png',
    subscribable: false,
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}
