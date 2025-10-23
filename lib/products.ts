export interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  rating: number
  reviews: number
  image: string
  category: string
  inStock: boolean
  description: string
  fullDescription?: string
  images?: string[]
  specifications?: Record<string, string>
  features?: string[]
}

export const products: Product[] = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones",
    price: 49.99,
    originalPrice: 79.99,
    rating: 4.5,
    reviews: 2341,
    image: "/wireless-bluetooth-headphones.jpg",
    category: "Electronics",
    inStock: true,
    description: "High-quality wireless headphones with noise cancellation",
    fullDescription:
      "Experience premium audio with our Wireless Bluetooth Headphones. Featuring active noise cancellation technology, these headphones deliver crystal-clear sound for music, calls, and gaming. With a 30-hour battery life and comfortable over-ear design, they're perfect for all-day use.",
    images: ["/wireless-bluetooth-headphones.jpg"],
    specifications: {
      "Driver Size": "40mm",
      "Frequency Response": "20Hz - 20kHz",
      Impedance: "32 Ohms",
      "Battery Life": "30 hours",
      "Charging Time": "2 hours",
      "Bluetooth Version": "5.0",
      Weight: "250g",
    },
    features: [
      "Active Noise Cancellation (ANC)",
      "30-hour battery life",
      "Bluetooth 5.0 connectivity",
      "Built-in microphone for calls",
      "Comfortable over-ear design",
      "Foldable for portability",
    ],
  },
  {
    id: "2",
    name: "USB-C Fast Charging Cable",
    price: 12.99,
    originalPrice: 19.99,
    rating: 4.7,
    reviews: 5621,
    image: "/usb-c-charging-cable.jpg",
    category: "Electronics",
    inStock: true,
    description: "Durable USB-C cable with fast charging support",
    fullDescription:
      "Our premium USB-C Fast Charging Cable supports up to 100W power delivery, making it ideal for charging laptops, tablets, and smartphones. Built with reinforced connectors and high-quality materials, this cable is designed to last.",
    images: ["/usb-c-charging-cable.jpg"],
    specifications: {
      Length: "2 meters",
      "Power Delivery": "100W",
      "Data Transfer Speed": "480 Mbps",
      Material: "Nylon Braided",
      Connector: "USB-C to USB-C",
      Certification: "USB-IF Certified",
    },
    features: [
      "100W power delivery",
      "Fast charging support",
      "Durable nylon braided design",
      "2-meter length",
      "USB-IF certified",
      "Lifetime warranty",
    ],
  },
  {
    id: "3",
    name: "Portable Phone Stand",
    price: 15.99,
    rating: 4.3,
    reviews: 1203,
    image: "/portable-phone-stand.jpg",
    category: "Electronics",
    inStock: true,
    description: "Adjustable phone stand for desk and travel",
    fullDescription:
      "Keep your phone at the perfect viewing angle with our Portable Phone Stand. Featuring adjustable angles and a sturdy base, it works with phones of all sizes and is lightweight enough to carry anywhere.",
    images: ["/portable-phone-stand.jpg"],
    specifications: {
      Material: "Aluminum Alloy",
      "Max Load": "500g",
      "Adjustment Range": "0-270 degrees",
      Weight: "120g",
      "Folded Size": "15cm x 8cm",
      Colors: "Black, Silver",
    },
    features: [
      "Adjustable viewing angles",
      "Supports all phone sizes",
      "Lightweight aluminum construction",
      "Portable and compact",
      "Non-slip base",
      "Easy to fold and carry",
    ],
  },
  {
    id: "4",
    name: "Stainless Steel Water Bottle",
    price: 24.99,
    originalPrice: 34.99,
    rating: 4.6,
    reviews: 3421,
    image: "/stainless-steel-bottle.png",
    category: "Home",
    inStock: true,
    description: "Keeps drinks cold for 24 hours or hot for 12 hours",
    fullDescription:
      "Stay hydrated in style with our premium Stainless Steel Water Bottle. Double-wall insulation keeps your beverages at the perfect temperature for hours. Available in multiple colors and sizes.",
    images: ["/stainless-steel-bottle.png"],
    specifications: {
      Capacity: "750ml",
      Material: "18/8 Stainless Steel",
      "Insulation Type": "Double-wall vacuum",
      "Cold Retention": "24 hours",
      "Hot Retention": "12 hours",
      Weight: "450g",
    },
    features: [
      "Double-wall vacuum insulation",
      "Keeps drinks cold for 24 hours",
      "Keeps drinks hot for 12 hours",
      "Leak-proof design",
      "Eco-friendly material",
      "Available in 5 colors",
    ],
  },
  {
    id: "5",
    name: "Wireless Mouse",
    price: 29.99,
    originalPrice: 49.99,
    rating: 4.4,
    reviews: 2156,
    image: "/wireless-mouse.png",
    category: "Electronics",
    inStock: true,
    description: "Ergonomic wireless mouse with precision tracking",
    fullDescription:
      "Enhance your productivity with our Ergonomic Wireless Mouse. Featuring precision optical tracking and a comfortable contoured design, it reduces hand fatigue during extended use.",
    images: ["/wireless-mouse.png"],
    specifications: {
      DPI: "800-3200",
      "Tracking Speed": "100 IPS",
      Buttons: "6 programmable buttons",
      "Battery Life": "18 months",
      "Wireless Range": "10 meters",
      Weight: "95g",
    },
    features: [
      "Ergonomic design",
      "Precision optical tracking",
      "6 programmable buttons",
      "18-month battery life",
      "2.4GHz wireless connection",
      "Compatible with Windows and Mac",
    ],
  },
  {
    id: "6",
    name: "Desk Lamp with USB Port",
    price: 34.99,
    rating: 4.5,
    reviews: 1876,
    image: "/desk-lamp-usb.jpg",
    category: "Home",
    inStock: true,
    description: "LED desk lamp with adjustable brightness and USB charging",
    fullDescription:
      "Illuminate your workspace with our modern LED Desk Lamp. Features adjustable brightness levels, a built-in USB charging port, and a sleek design that complements any desk setup.",
    images: ["/desk-lamp-usb.jpg"],
    specifications: {
      "Light Type": "LED",
      "Brightness Levels": "3 levels",
      "Color Temperature": "4000K (Neutral White)",
      "USB Output": "5V/1A",
      "Power Consumption": "8W",
      "Arm Length": "40cm",
    },
    features: [
      "Adjustable brightness",
      "Built-in USB charging port",
      "Energy-efficient LED",
      "Flexible arm design",
      "Touch control",
      "Eye-care technology",
    ],
  },
  {
    id: "7",
    name: "Mechanical Keyboard",
    price: 79.99,
    originalPrice: 129.99,
    rating: 4.8,
    reviews: 4532,
    image: "/mechanical-keyboard.png",
    category: "Electronics",
    inStock: true,
    description: "RGB mechanical keyboard with Cherry MX switches",
    fullDescription:
      "Experience the ultimate typing experience with our RGB Mechanical Keyboard. Featuring genuine Cherry MX switches, customizable RGB lighting, and a premium aluminum frame.",
    images: ["/mechanical-keyboard.png"],
    specifications: {
      "Switch Type": "Cherry MX Brown",
      "Key Count": "104 keys",
      Backlighting: "RGB per-key",
      Connection: "USB-C wired",
      Material: "Aluminum frame",
      "Polling Rate": "1000Hz",
    },
    features: [
      "Cherry MX mechanical switches",
      "Per-key RGB lighting",
      "Programmable keys",
      "Premium aluminum construction",
      "USB-C connection",
      "Includes keycap puller",
    ],
  },
  {
    id: "8",
    name: "Yoga Mat",
    price: 19.99,
    rating: 4.2,
    reviews: 987,
    image: "/rolled-yoga-mat.png",
    category: "Home",
    inStock: true,
    description: "Non-slip yoga mat with carrying strap",
    fullDescription:
      "Perfect for yoga, pilates, and floor exercises. Our premium yoga mat features a non-slip surface, cushioning for comfort, and comes with a convenient carrying strap.",
    images: ["/rolled-yoga-mat.png"],
    specifications: {
      Material: "TPE (Thermoplastic Elastomer)",
      Thickness: "6mm",
      Length: "183cm",
      Width: "61cm",
      Weight: "600g",
      "Non-slip Surface": "Yes",
    },
    features: [
      "Non-slip surface",
      "6mm cushioning",
      "Eco-friendly TPE material",
      "Carrying strap included",
      "Easy to clean",
      "Lightweight and portable",
    ],
  },
]

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id)
}

export function getRelatedProducts(productId: string, limit = 4): Product[] {
  const product = getProductById(productId)
  if (!product) return []

  return products.filter((p) => p.category === product.category && p.id !== productId).slice(0, limit)
}
