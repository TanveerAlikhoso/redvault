export type Product = {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  category: string;
  rating: number;
  reviews: number;
  badge?: string;
  img: number;
  description: string;
  features: string[];
  inStock: boolean;
};

export type Category = {
  name: string;
  slug: string;
  description: string;
  color: string;
};

export const categories: Category[] = [
  {
    name: "Fitness Tools",
    slug: "fitness-tools",
    description: "Build strength, endurance, and agility with our curated selection of professional-grade fitness equipment.",
    color: "from-red-900/70",
  },
  {
    name: "Health Devices",
    slug: "health-devices",
    description: "Monitor your vitals, track progress, and stay on top of your health with smart medical-grade devices.",
    color: "from-zinc-800/70",
  },
  {
    name: "Beauty Tools",
    slug: "beauty-tools",
    description: "Spa-quality beauty technology for at-home treatments that deliver visible, lasting results.",
    color: "from-zinc-900/70",
  },
  {
    name: "Supplements",
    slug: "supplements",
    description: "Science-backed supplements to fuel your workouts, support recovery, and optimize your body from within.",
    color: "from-red-950/70",
  },
  {
    name: "Skincare",
    slug: "skincare",
    description: "Premium skincare formulas and tools designed to restore, rejuvenate, and protect your skin.",
    color: "from-zinc-800/70",
  },
  {
    name: "Wellness",
    slug: "wellness",
    description: "From sleep to stress relief, our wellness collection helps you recover, relax, and recharge.",
    color: "from-zinc-900/70",
  },
];

export const products: Product[] = [
  {
    id: "1", slug: "pro-massage-gun", name: "Pro Massage Gun", price: 149.99, originalPrice: 199.99,
    category: "fitness-tools", rating: 5, reviews: 342, badge: "Best Seller", img: 1,
    description: "The Pro Massage Gun delivers deep percussive therapy to sore muscles with 5 speed settings and 6 interchangeable heads. Ultra-quiet motor, 4-hour battery life, and compact design make it the #1 recovery tool in our vault.",
    features: ["5 speed settings (1200–3200 RPM)", "6 interchangeable massage heads", "Whisper-quiet 45dB motor", "4-hour rechargeable battery", "Ergonomic anti-slip grip", "Includes carry case"],
    inStock: true,
  },
  {
    id: "2", slug: "smart-jump-rope", name: "Smart Jump Rope", price: 49.99,
    category: "fitness-tools", rating: 4, reviews: 156, badge: "New", img: 2,
    description: "Upgrade your cardio with the Smart Jump Rope — a precision-weighted rope with a built-in counter that tracks jumps, calories, and workout duration. Compatible with our free RedVault app.",
    features: ["Built-in digital jump counter", "Tracks calories & workout time", "Adjustable rope length (8–10ft)", "Ergonomic foam handles", "Rechargeable via USB-C", "Works with RedVault App"],
    inStock: true,
  },
  {
    id: "3", slug: "led-face-mask", name: "LED Face Mask", price: 89.99, originalPrice: 120.00,
    category: "beauty-tools", rating: 5, reviews: 287, badge: "New", img: 3,
    description: "Clinical-grade LED light therapy at home. Red light boosts collagen production; blue light targets acne-causing bacteria. 20 minutes a day delivers noticeable improvements in just two weeks.",
    features: ["Red (630nm) + Blue (415nm) + Near-IR LEDs", "192 individual LED lights", "20-minute auto-shutoff timer", "Flexible, contoured mask design", "Clinically tested, FDA registered", "Comes with protective goggles"],
    inStock: true,
  },
  {
    id: "4", slug: "resistance-band-set", name: "Resistance Band Set", price: 34.99,
    category: "fitness-tools", rating: 4, reviews: 98, img: 4,
    description: "A complete set of 5 resistance bands ranging from 10 to 150 lbs of resistance — perfect for strength training, physical therapy, yoga, and stretching. Made from premium natural latex.",
    features: ["5 bands: 10, 20, 30, 50, 150 lbs", "100% natural latex construction", "Anti-snap safety design", "Includes mesh carry bag", "Works for all fitness levels", "Stackable up to 300 lbs"],
    inStock: true,
  },
  {
    id: "5", slug: "ultrasonic-skin-scrubber", name: "Ultrasonic Skin Scrubber", price: 79.99,
    category: "beauty-tools", rating: 5, reviews: 201, img: 1,
    description: "The Ultrasonic Skin Scrubber uses 28,000 Hz vibrations to deeply cleanse pores, exfoliate dead skin cells, and enhance the absorption of your skincare products — without irritation or redness.",
    features: ["28,000 Hz ultrasonic vibrations", "3 modes: Cleanse, Lift, Infuse", "Stainless steel spatula tip", "Rechargeable USB-C battery", "Works on all skin types", "Waterproof IPX7 rated"],
    inStock: true,
  },
  {
    id: "6", slug: "ab-roller-pro", name: "Ab Roller Pro", price: 29.99,
    category: "fitness-tools", rating: 4, reviews: 134, img: 2,
    description: "Strengthen your core and sculpt abs with the Ab Roller Pro. Features a wide dual-wheel design for stability, ergonomic non-slip handles, and a knee pad for comfort during intense sessions.",
    features: ["Wide dual-wheel design", "Non-slip ergonomic handles", "Includes knee pad", "Supports up to 440 lbs", "Compact foldable design", "Suitable for all fitness levels"],
    inStock: true,
  },
  {
    id: "7", slug: "collagen-boost-serum", name: "Collagen Boost Serum", price: 59.99, originalPrice: 79.99,
    category: "skincare", rating: 5, reviews: 412, img: 3,
    description: "Our concentrated Collagen Boost Serum combines marine collagen, hyaluronic acid, and vitamin C to visibly firm, plump, and brighten skin. Dermatologist-tested for all skin types.",
    features: ["Marine collagen + hyaluronic acid", "Vitamin C brightening complex", "Firms & plumps in 4 weeks", "Non-comedogenic formula", "Dermatologist tested", "30ml / 60-day supply"],
    inStock: true,
  },
  {
    id: "8", slug: "foam-roller-deluxe", name: "Foam Roller Deluxe", price: 44.99,
    category: "wellness", rating: 4, reviews: 89, img: 4,
    description: "The Foam Roller Deluxe features a tri-grid surface design that mimics a therapist's hands, targeting deep muscle tissue to reduce soreness and improve flexibility after every workout.",
    features: ["Tri-grid surface for deep tissue relief", "High-density EPP foam", "Hollow core for portability", "Supports up to 500 lbs", "33cm length, ideal for full body", "Sweat-resistant surface"],
    inStock: true,
  },
  {
    id: "9", slug: "infrared-sauna-blanket", name: "Infrared Sauna Blanket", price: 199.99, originalPrice: 259.99,
    category: "wellness", rating: 5, reviews: 167, badge: "Hot", img: 1,
    description: "Detox, recover, and relax with the Infrared Sauna Blanket. Far infrared heat penetrates deep into muscle tissue to boost circulation, burn calories, and promote deep relaxation from the comfort of home.",
    features: ["Far infrared heat technology", "3-layer waterproof inner lining", "6 temperature settings (77–176°F)", "60-min auto shutoff timer", "EMF-safe design", "Machine washable liner"],
    inStock: true,
  },
  {
    id: "10", slug: "smart-body-scale", name: "Smart Body Scale", price: 69.99,
    category: "health-devices", rating: 4, reviews: 223, img: 2,
    description: "The Smart Body Scale measures 13 key body metrics — weight, BMI, body fat, muscle mass, hydration, and more — syncing instantly to the RedVault app via Bluetooth for comprehensive health tracking.",
    features: ["13-metric body composition analysis", "Bluetooth 5.0 app sync", "Supports up to 8 users", "Tempered glass platform", "Auto-calibration", "400 lb / 180 kg capacity"],
    inStock: true,
  },
  {
    id: "11", slug: "blood-pressure-monitor", name: "Blood Pressure Monitor", price: 54.99,
    category: "health-devices", rating: 5, reviews: 189, img: 3,
    description: "Clinically validated upper-arm blood pressure monitor with triple measurement averaging, irregular heartbeat detection, and a large backlit display for easy readings — even in low light.",
    features: ["Clinically validated accuracy", "Triple measurement averaging", "Irregular heartbeat detection", "60-reading memory (2 users)", "Large backlit LCD display", "AAA battery powered"],
    inStock: true,
  },
  {
    id: "12", slug: "pulse-oximeter-pro", name: "Pulse Oximeter Pro", price: 39.99,
    category: "health-devices", rating: 4, reviews: 76, img: 4,
    description: "Track your blood oxygen saturation (SpO2) and pulse rate in seconds. Perfect for athletes, climbers, and anyone monitoring respiratory health. Includes an OLED display and carrying case.",
    features: ["SpO2 + pulse rate reading", "Results in under 10 seconds", "OLED rotating display", "Low battery indicator", "Audible alarm function", "Includes lanyard & case"],
    inStock: true,
  },
  {
    id: "13", slug: "yoga-mat-pro", name: "Yoga Mat Pro", price: 64.99,
    category: "fitness-tools", rating: 5, reviews: 298, img: 1,
    description: "The Yoga Mat Pro delivers superior grip, cushioning, and durability for yoga, pilates, and stretching. Made from eco-friendly natural rubber with an alignment guide printed directly on the mat.",
    features: ["6mm thickness for joint support", "Natural rubber non-slip base", "Alignment guide lines printed", "Sweat-absorbent microfiber top", "Includes carry strap", "72\" x 26\" full-length size"],
    inStock: true,
  },
  {
    id: "14", slug: "whey-protein-powder", name: "Whey Protein Powder", price: 49.99, originalPrice: 64.99,
    category: "supplements", rating: 4, reviews: 445, badge: "Best Seller", img: 2,
    description: "25g of premium cold-processed whey protein per serving with only 130 calories. Mixes instantly, digests easily, and comes in Chocolate, Vanilla, and Unflavored — no artificial sweeteners.",
    features: ["25g protein per serving", "130 calories, 2g sugar", "Cold-processed whey isolate", "Gluten-free & soy-free", "Instantized for smooth mixing", "30 servings per bag"],
    inStock: true,
  },
  {
    id: "15", slug: "vitamin-d3-k2", name: "Vitamin D3 + K2", price: 24.99,
    category: "supplements", rating: 5, reviews: 312, img: 3,
    description: "Our synergistic D3 + K2 formula ensures optimal vitamin D absorption while directing calcium to bones rather than arteries. Third-party tested for purity, potency, and safety.",
    features: ["5000 IU Vitamin D3 per capsule", "100mcg Vitamin K2 (MK-7)", "Enhanced bioavailability formula", "Third-party tested", "Non-GMO, gluten-free", "90 capsules / 3-month supply"],
    inStock: true,
  },
  {
    id: "16", slug: "collagen-peptides", name: "Collagen Peptides", price: 44.99,
    category: "supplements", rating: 4, reviews: 178, img: 4,
    description: "Hydrolyzed bovine collagen peptides to support joint health, skin elasticity, and gut function. Unflavored and dissolves completely in hot or cold liquids — coffee, smoothies, anything.",
    features: ["10g collagen peptides per scoop", "Types I & III collagen", "Fully hydrolyzed for absorption", "Unflavored, odorless", "Dissolves in any liquid", "30 servings per bag"],
    inStock: true,
  },
  {
    id: "17", slug: "eye-rejuvenation-mask", name: "Eye Rejuvenation Mask", price: 34.99,
    category: "beauty-tools", rating: 4, reviews: 93, img: 1,
    description: "The Eye Rejuvenation Mask combines gentle heat therapy with micro-vibration to reduce puffiness, dark circles, and fine lines around the eyes. 5 temperature levels and a rechargeable design.",
    features: ["Micro-vibration + heat therapy", "5 temperature levels (40–55°C)", "Reduces puffiness & dark circles", "Medical-grade silicone material", "Rechargeable USB-C", "One size fits all"],
    inStock: true,
  },
  {
    id: "18", slug: "gua-sha-tool-set", name: "Gua Sha Tool Set", price: 28.99,
    category: "skincare", rating: 5, reviews: 267, img: 2,
    description: "Traditional Chinese gua sha meets modern skincare. This 4-piece rose quartz set includes face, jaw, neck, and eye tools designed to boost lymphatic drainage, sculpt facial contours, and reduce puffiness.",
    features: ["100% genuine rose quartz", "4-piece full face set", "Boosts lymphatic drainage", "Sculpts & lifts facial contours", "Includes instruction guide", "Reusable & easy to clean"],
    inStock: true,
  },
  {
    id: "19", slug: "tens-pain-relief", name: "TENS Pain Relief Device", price: 84.99,
    category: "health-devices", rating: 4, reviews: 143, img: 3,
    description: "Drug-free pain relief anywhere, anytime. The TENS device sends gentle electrical pulses to override pain signals, with 20 intensity levels and 8 pre-set modes for back, neck, shoulder, and knee relief.",
    features: ["20 intensity levels", "8 pre-set pain modes", "4 electrode pads included", "Rechargeable battery (10-hour)", "Compact pocket-size design", "FDA cleared for OTC use"],
    inStock: true,
  },
  {
    id: "20", slug: "sleep-sound-machine", name: "Sleep Sound Machine", price: 54.99,
    category: "wellness", rating: 5, reviews: 321, img: 4,
    description: "Fall asleep faster and stay asleep longer with 30 soothing soundscapes — white noise, nature sounds, and sleep meditations. Timer, night light, and Bluetooth speaker all in one sleek device.",
    features: ["30 soothing soundscapes", "White noise, nature & meditations", "60/90/120-min auto-off timer", "Soft amber night light", "Bluetooth 5.0 speaker", "USB-C rechargeable"],
    inStock: true,
  },
];

export function getProductsByCategory(slug: string): Product[] {
  return products.filter((p) => p.category === slug);
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

export function getRelatedProducts(product: Product, count = 4): Product[] {
  return products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, count);
}
