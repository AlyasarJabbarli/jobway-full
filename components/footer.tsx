import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Briefcase, Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Briefcase className="h-8 w-8 text-blue-400" />
              <span className="text-2xl font-bold">JobPortal</span>
            </div>
            <p className="text-gray-300 text-sm">
              Connecting talented professionals with innovative companies. Your next career opportunity starts here.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Linkedin className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white p-2">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/jobs" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Browse Jobs
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Our Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white text-sm transition-colors">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-300 hover:text-white text-sm transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Stay Updated</h3>
            <p className="text-gray-300 text-sm">
              Subscribe to our newsletter for the latest job opportunities and career tips.
            </p>
            <div className="space-y-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border-gray-700 text-white placeholder-gray-400"
              />
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Mail className="mr-2 h-4 w-4" />
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">© 2024 JobPortal. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/sitemap" className="text-gray-400 hover:text-white text-sm transition-colors">
                Sitemap
              </Link>
              <Link href="/accessibility" className="text-gray-400 hover:text-white text-sm transition-colors">
                Accessibility
              </Link>
              <Link href="/help" className="text-gray-400 hover:text-white text-sm transition-colors">
                Help Center
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
