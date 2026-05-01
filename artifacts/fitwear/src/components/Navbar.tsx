import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { ShoppingCart, Search, Menu, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Categories", href: "/shop" },
  { label: "About", href: "/#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const { totalItems } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) => {
    if (href === "/") return location === "/";
    return location.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrolled ? "bg-background/95 backdrop-blur-md border-b border-border py-4" : "bg-transparent py-6"
        }`}
      >
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-3xl font-black tracking-tighter uppercase italic">
              <span className="text-primary">Red</span>
              <span className="text-foreground">Vault</span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-sm font-semibold uppercase tracking-wider transition-colors ${
                  isActive(link.href) ? "text-primary" : "hover:text-primary"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-primary transition-colors hidden sm:block">
              <Search size={20} />
            </button>
            <Link href="/cart" className="p-2 hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems > 9 ? "9+" : totalItems}
                </span>
              )}
            </Link>
            <button
              className="p-2 hover:text-primary transition-colors lg:hidden"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center lg:hidden">
          <button
            className="absolute top-6 right-6 p-2 text-foreground hover:text-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X size={32} />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-3xl font-black uppercase tracking-widest hover:text-primary transition-colors ${
                  isActive(link.href) ? "text-primary" : ""
                }`}
              >
                {link.label}
              </a>
            ))}
            <a
              href="/cart"
              onClick={() => setMobileMenuOpen(false)}
              className="text-3xl font-black uppercase tracking-widest hover:text-primary transition-colors flex items-center gap-3"
            >
              Cart {totalItems > 0 && <span className="text-primary">({totalItems})</span>}
            </a>
          </nav>
        </div>
      )}
    </>
  );
}
