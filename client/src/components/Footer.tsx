import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-black border-t border-purple-500/20">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-purple-900/10"></div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="text-2xl font-bold">
                <span className="text-[#1abc9c]">Brand</span>
                <span className="text-white">Velocity</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Accelerating brands into the future with innovative marketing strategies and cosmic creativity.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-purple-400 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer text-sm">About</span>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <span className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer text-sm">Services</span>
                </Link>
              </li>
              <li>
                <Link href="/work">
                  <span className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer text-sm">Work</span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-gray-400 hover:text-purple-400 transition-colors cursor-pointer text-sm">Blog</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li className="text-gray-400 text-sm">Brand Strategy</li>
              <li className="text-gray-400 text-sm">Visual Identity</li>
              <li className="text-gray-400 text-sm">Digital Presence</li>
              <li className="text-gray-400 text-sm">Public Relations</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2 text-gray-400 text-sm">
                <MapPin size={16} className="mt-1 flex-shrink-0" />
                <span>Plymouth, Devon, UK</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Phone size={16} className="flex-shrink-0" />
                <span>07426 877552</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400 text-sm">
                <Mail size={16} className="flex-shrink-0" />
                <span>connect@brandvelocity.co.uk</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-purple-500/20 text-center">
          <p className="text-gray-400 text-sm">
            © 2025 BrandVelocity. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

