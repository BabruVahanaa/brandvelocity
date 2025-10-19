
import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import useMobile from "@/hooks/useMobile";

export default function Navigation() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMobileMenuOpen && isMobile) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen, isMobile]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/work", label: "Work" },
    { href: "/blog", label: "Blog" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-black/80 backdrop-blur-md border-b border-purple-500/20"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            <Link href="/">
              <div className="flex items-center cursor-pointer group">
                <span className="text-xl md:text-2xl font-bold transition-opacity group-hover:opacity-80">
                  <span className="text-[#1abc9c]">Brand</span>
                  <span className="text-white">Velocity</span>
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center space-x-8">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <span
                    className={`relative cursor-pointer text-sm font-medium transition-colors hover:text-purple-400 ${
                      location === link.href
                        ? "text-purple-400"
                        : "text-gray-300"
                    }`}
                  >
                    {link.label}
                    {location === link.href && (
                      <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500"></span>
                    )}
                  </span>
                </Link>
              ))}
              <Link href="/contact">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                  Get Started
                </Button>
              </Link>
            </div>

            <button
              className="md:hidden text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {isMobile && isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-black/95 backdrop-blur-lg border-l border-purple-500/20 z-50 md:hidden transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-6 border-b border-purple-500/20">
            <span className="text-xl font-bold">
              <span className="text-[#1abc9c]">Brand</span>
              <span className="text-white">Velocity</span>
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-white p-2 hover:bg-white/10 rounded-lg transition-colors"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto py-6">
            <div className="space-y-2 px-4">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href}>
                  <div
                    className={`block px-4 py-3 rounded-lg cursor-pointer transition-all ${
                      location === link.href
                        ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link.label}
                  </div>
                </Link>
              ))}
            </div>
          </div>

          <div className="p-6 border-t border-purple-500/20">
            <Link href="/contact">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
