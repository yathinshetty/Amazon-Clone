import { neon } from "@neondatabase/serverless"
import { hashPassword } from "../lib/auth"

const sql = neon(process.env.DATABASE_URL!)

const categories = [
  { name: "Electronics", slug: "electronics" },
  { name: "Books", slug: "books" },
  { name: "Clothing", slug: "clothing" },
  { name: "Home & Kitchen", slug: "home-kitchen" },
  { name: "Sports", slug: "sports" },
  { name: "Toys", slug: "toys" },
  { name: "Beauty", slug: "beauty" },
  { name: "Automotive", slug: "automotive" },
]

const products = [
  {
    title: "Wireless Bluetooth Headphones",
    description: "High-quality sound with noise cancellation",
    price: 79.99,
    original_price: 129.99,
    category: "Electronics",
    brand: "AudioTech",
    sku: "WBH-001",
    stock: 150,
    rating: 4.5,
    review_count: 328,
    image_url: "/wireless-headphones.png",
    is_prime: true,
  },
  {
    title: "USB-C Fast Charging Cable",
    description: "6ft durable charging cable with fast data transfer",
    price: 12.99,
    original_price: 19.99,
    category: "Electronics",
    brand: "CablePro",
    sku: "USB-C-001",
    stock: 500,
    rating: 4.3,
    review_count: 1205,
    image_url: "/usb-cable.png",
    is_prime: true,
  },
  {
    title: "The Midnight Library",
    description: "A novel about all the choices that go into a life well lived",
    price: 14.99,
    original_price: 18.99,
    category: "Books",
    brand: "Penguin Books",
    sku: "BOOK-001",
    stock: 200,
    rating: 4.6,
    review_count: 5432,
    image_url: "/book-midnight-library.jpg",
    is_prime: true,
  },
  {
    title: "Cotton T-Shirt",
    description: "Comfortable 100% cotton t-shirt in multiple colors",
    price: 19.99,
    original_price: 29.99,
    category: "Clothing",
    brand: "ComfortWear",
    sku: "TSHIRT-001",
    stock: 300,
    rating: 4.2,
    review_count: 892,
    image_url: "/cotton-tshirt.png",
    is_prime: true,
  },
  {
    title: "Stainless Steel Water Bottle",
    description: "Keeps drinks cold for 24 hours or hot for 12 hours",
    price: 34.99,
    original_price: 49.99,
    category: "Home & Kitchen",
    brand: "HydroFlask",
    sku: "BOTTLE-001",
    stock: 250,
    rating: 4.7,
    review_count: 2341,
    image_url: "/reusable-water-bottle.png",
    is_prime: true,
  },
  {
    title: "Yoga Mat",
    description: "Non-slip yoga mat with carrying strap",
    price: 24.99,
    original_price: 39.99,
    category: "Sports",
    brand: "FitLife",
    sku: "YOGA-001",
    stock: 180,
    rating: 4.4,
    review_count: 1567,
    image_url: "/rolled-yoga-mat.png",
    is_prime: true,
  },
]

async function seed() {
  try {
    console.log("Starting database seed...")

    // Insert categories
    for (const category of categories) {
      await sql`
        INSERT INTO categories (name, slug) 
        VALUES (${category.name}, ${category.slug})
        ON CONFLICT (slug) DO NOTHING
      `
    }
    console.log("Categories inserted")

    // Insert sample user
    const hashedPassword = await hashPassword("password123")
    await sql`
      INSERT INTO users (email, password_hash, name, role)
      VALUES ('user@example.com', ${hashedPassword}, 'John Doe', 'user')
      ON CONFLICT (email) DO NOTHING
    `

    const adminPassword = await hashPassword("admin123")
    await sql`
      INSERT INTO users (email, password_hash, name, role)
      VALUES ('admin@example.com', ${adminPassword}, 'Admin User', 'admin')
      ON CONFLICT (email) DO NOTHING
    `
    console.log("Users inserted")

    // Insert products
    for (const product of products) {
      const categoryResult = await sql`
        SELECT id FROM categories WHERE name = ${product.category}
      `
      const categoryId = categoryResult[0]?.id

      await sql`
        INSERT INTO products (
          title, description, price, original_price, category_id, brand, 
          sku, stock, rating, review_count, image_url, is_prime
        ) VALUES (
          ${product.title}, ${product.description}, ${product.price}, 
          ${product.original_price}, ${categoryId}, ${product.brand},
          ${product.sku}, ${product.stock}, ${product.rating}, 
          ${product.review_count}, ${product.image_url}, ${product.is_prime}
        )
        ON CONFLICT (sku) DO NOTHING
      `
    }
    console.log("Products inserted")
    console.log("Database seed completed successfully!")
  } catch (error) {
    console.error("Seed error:", error)
    process.exit(1)
  }
}

seed()
