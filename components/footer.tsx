import Link from "next/link"
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-16">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Get to Know Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Get to Know Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Press Releases
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect With Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect With Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Facebook
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Twitter
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Instagram
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  LinkedIn
                </Link>
              </li>
            </ul>
          </div>

          {/* Make Money With Us */}
          <div>
            <h3 className="font-bold text-lg mb-4">Make Money With Us</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Sell on Amazon
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Become an Affiliate
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Advertise Your Products
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Become a Delivery Partner
                </Link>
              </li>
            </ul>
          </div>

          {/* Help & Settings */}
          <div>
            <h3 className="font-bold text-lg mb-4">Help & Settings</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <Link href="#" className="hover:text-white transition">
                  Your Account
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Returns Centre
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  100% Purchase Protection
                </Link>
              </li>
              <li>
                <Link href="#" className="hover:text-white transition">
                  Help
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-sm text-gray-300">© 2025 Amazon Clone. All rights reserved.</div>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <Facebook size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <Twitter size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <Instagram size={20} />
              </Link>
              <Link href="#" className="text-gray-300 hover:text-white transition">
                <Linkedin size={20} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
