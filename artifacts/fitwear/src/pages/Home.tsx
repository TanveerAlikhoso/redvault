import { useEffect, useState } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { ShoppingCart, Search, Menu, Star, ArrowRight, X } from "lucide-react";
import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import heroBg from "@/assets/hero-bg.png";
import brandStory from "@/assets/brand-story.png";
import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";
import categoryRunning from "@/assets/category-running.png";
import categoryTraining from "@/assets/category-training.png";

// Placeholder images for categories without generated images
const CAT_PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%231a1a1a'/%3E%3C/svg%3E";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // Countdown state
  const [timeLeft, setTimeLeft] = useState({
    days: 14,
    hours: 23,
    minutes: 59,
    seconds: 59
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const navLinks = ["Home", "Shop", "Categories", "About", "Blog", "Contact"];

  const categories = [
    { name: "Running", img: categoryRunning },
    { name: "Training", img: categoryTraining },
    { name: "Yoga", img: CAT_PLACEHOLDER },
    { name: "Swimming", img: CAT_PLACEHOLDER },
    { name: "Boxing", img: CAT_PLACEHOLDER },
    { name: "Cycling", img: CAT_PLACEHOLDER },
  ];

  const products = [
    { name: "Pro Runner Jacket", price: "$129.99", img: product1, rating: 5 },
    { name: "Power Training Shorts", price: "$59.99", img: product2, rating: 4 },
    { name: "Flex Yoga Leggings", price: "$89.99", img: product3, rating: 5 },
    { name: "Elite Compression Shirt", price: "$49.99", img: product4, rating: 4 },
    { name: "Aero Track Pants", price: "$79.99", img: product1, rating: 5 },
    { name: "Surge Performance Tee", price: "$39.99", img: product2, rating: 4 },
    { name: "Velocity Windbreaker", price: "$109.99", img: product3, rating: 5 },
    { name: "Apex Training Hoodie", price: "$99.99", img: product4, rating: 4 },
  ];

  const stats = [
    { value: "10,000+", label: "Happy Athletes" },
    { value: "500+", label: "Performance Products" },
    { value: "50+", label: "Countries" },
    { value: "98%", label: "Satisfaction Rate" },
  ];

  const testimonials = [
    { name: "Alex Mercer", sport: "Professional Runner", text: "FitWear completely changed how I train. The materials are incredibly breathable and durable." },
    { name: "Sarah Chen", sport: "CrossFit Coach", text: "I demand a lot from my gear, and FitWear is the only brand that keeps up with my intensity." },
    { name: "Marcus Johnson", sport: "Triathlete", text: "The fit, the style, the performance. Nothing else comes close to the quality of FitWear." },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      
      {/* Navbar */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-md border-b border-border py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black tracking-tighter uppercase italic text-primary">FITWEAR</span>
          </div>
          
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} className="text-sm font-semibold uppercase tracking-wider hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button className="p-2 hover:text-primary transition-colors hidden sm:block"><Search size={20} /></button>
            <button className="p-2 hover:text-primary transition-colors relative">
              <ShoppingCart size={20} />
              <span className="absolute top-0 right-0 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </button>
            <button className="p-2 hover:text-primary transition-colors lg:hidden" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-background z-50 flex flex-col items-center justify-center lg:hidden">
          <button className="absolute top-6 right-6 p-2 text-foreground hover:text-primary" onClick={() => setMobileMenuOpen(false)}>
            <X size={32} />
          </button>
          <nav className="flex flex-col items-center gap-8">
            {navLinks.map(link => (
              <a key={link} href={`#${link.toLowerCase()}`} onClick={() => setMobileMenuOpen(false)} className="text-3xl font-black uppercase tracking-widest hover:text-primary transition-colors">
                {link}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Hero background" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/60 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        
        <div className="container relative z-10 mx-auto px-4 md:px-8 pt-20">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-4xl"
          >
            <motion.div variants={fadeInUp} className="mb-4 inline-block bg-primary/10 border border-primary text-primary px-4 py-1.5 font-bold uppercase tracking-widest text-sm">
              New Collection 2024
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-6">
              Performance<br />
              <span className="text-transparent" style={{ WebkitTextStroke: '2px hsl(var(--primary))' }}>Gear For</span><br />
              Champions
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 max-w-xl mb-10 font-light">
              Engineered for the relentless. Designed for the bold. Experience the next evolution of athletic performance wear.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button size="lg" className="h-14 px-8 text-lg rounded-none uppercase font-bold tracking-wider">
                Shop Now <ArrowRight className="ml-2" />
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-lg rounded-none uppercase font-bold tracking-wider border-2 hover:bg-white hover:text-black transition-colors">
                Explore Collection
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ticker */}
      <div className="w-full bg-primary text-primary-foreground py-4 overflow-hidden border-y border-primary/20">
        <div className="flex whitespace-nowrap animate-[marquee_20s_linear_infinite]">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4 text-xl font-black uppercase tracking-widest">
              <span>FREE SHIPPING</span>
              <span className="text-black/30">•</span>
              <span>30 DAY RETURNS</span>
              <span className="text-black/30">•</span>
              <span>PREMIUM QUALITY</span>
              <span className="text-black/30">•</span>
              <span>WORLDWIDE DELIVERY</span>
              <span className="text-black/30">•</span>
            </div>
          ))}
        </div>
      </div>

      {/* Categories */}
      <section id="categories" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInUp}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Shop by <span className="text-primary">Sport</span></h2>
            </div>
            <a href="#" className="hidden md:flex items-center gap-2 font-bold uppercase tracking-wider text-primary hover:underline">
              View All <ArrowRight size={16} />
            </a>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, i) => (
              <motion.div 
                key={cat.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[4/3] overflow-hidden bg-card cursor-pointer"
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-60 group-hover:opacity-40" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-4xl font-black uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">{cat.name}</h3>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="bg-primary text-primary-foreground px-4 py-2 font-bold uppercase text-sm">Explore</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="shop" className="py-24 bg-zinc-950 border-t border-border">
        <div className="container mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Latest <span className="text-primary">Drops</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Discover the newest additions to our high-performance collection.</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-12">
            {products.map((product, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="group flex flex-col"
              >
                <div className="relative aspect-[3/4] bg-card mb-4 overflow-hidden rounded-none border border-border">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-lighten" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 uppercase font-bold rounded-none">
                      Quick Add
                    </Button>
                  </div>
                  
                  {/* Badges */}
                  {i < 2 && (
                    <div className="absolute top-3 left-3 bg-white text-black text-xs font-bold uppercase px-2 py-1">
                      New
                    </div>
                  )}
                </div>
                
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-lg mb-1 uppercase tracking-wide group-hover:text-primary transition-colors">{product.name}</h4>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={14} className={j < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"} />
                      ))}
                    </div>
                  </div>
                  <span className="font-bold text-lg text-primary">{product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" className="rounded-none uppercase font-bold tracking-widest border-2 h-14 px-10">
              View All Products
            </Button>
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section className="relative py-32 overflow-hidden flex items-center justify-center bg-primary">
        <div className="absolute inset-0 flex items-center justify-center opacity-10 mix-blend-overlay">
          <span className="text-[30vw] font-black uppercase tracking-tighter text-black whitespace-nowrap select-none">SALE SALE SALE</span>
        </div>
        
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-primary-foreground mb-8">
            Summer Sale<br/>Up to 50% Off
          </h2>
          
          <div className="flex justify-center gap-4 md:gap-8 mb-10">
            {[
              { label: 'Days', value: timeLeft.days },
              { label: 'Hours', value: timeLeft.hours },
              { label: 'Minutes', value: timeLeft.minutes },
              { label: 'Seconds', value: timeLeft.seconds }
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-primary-foreground text-primary flex items-center justify-center text-3xl md:text-5xl font-black mb-2 shadow-xl border-b-4 border-black/20">
                  {item.value.toString().padStart(2, '0')}
                </div>
                <span className="text-primary-foreground font-bold uppercase tracking-wider text-xs md:text-sm">{item.label}</span>
              </div>
            ))}
          </div>
          
          <Button size="lg" className="bg-primary-foreground text-primary hover:bg-black hover:text-white h-14 px-12 text-lg rounded-none uppercase font-bold tracking-wider border-none">
            Shop Sale
          </Button>
        </div>
      </section>

      {/* Brand Story */}
      <section id="about" className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative aspect-square md:aspect-[4/5] bg-card"
            >
              <img src={brandStory} alt="Athlete training" className="w-full h-full object-cover" />
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-primary text-primary-foreground p-6 md:p-10 font-black uppercase max-w-xs shadow-2xl">
                <p className="text-xl md:text-3xl leading-none">"Born in the gym.<br/>Built for champions."</p>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">The <span className="text-primary">FitWear</span> Legacy</h2>
              <p className="text-lg text-muted-foreground mb-6 font-light leading-relaxed">
                We believe that performance gear should do exactly that—perform. Every stitch, every seam, and every fabric choice is meticulously tested by professional athletes to ensure it stands up to the most grueling workouts.
              </p>
              <p className="text-lg text-muted-foreground mb-10 font-light leading-relaxed">
                Since our founding, we've remained committed to one simple goal: creating the most advanced, durable, and stylish athletic wear on the planet. We don't compromise on quality, because you don't compromise on your training.
              </p>
              <Button size="lg" className="rounded-none uppercase font-bold tracking-widest h-14 px-8">
                Read Our Story
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 border-y border-border bg-zinc-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl md:text-6xl font-black text-transparent mb-2" style={{ WebkitTextStroke: '1px hsl(var(--foreground))' }}>
                  {stat.value}
                </div>
                <div className="font-bold uppercase tracking-widest text-primary text-sm md:text-base">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">Built For <span className="text-primary">The Best</span></h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-8 relative flex flex-col"
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={18} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg italic font-light text-muted-foreground mb-8 flex-grow">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-xl uppercase">{t.name}</h4>
                  <span className="text-primary text-sm font-semibold uppercase tracking-wider">{t.sport}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-zinc-950 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">Join The <span className="text-primary">Tribe</span></h2>
            <p className="text-xl text-muted-foreground mb-10">Subscribe to get special offers, free giveaways, and early access to new drops.</p>
            
            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={e => e.preventDefault()}>
              <Input 
                type="email" 
                placeholder="ENTER YOUR EMAIL" 
                className="h-14 rounded-none bg-background border-border text-foreground uppercase tracking-wider font-bold placeholder:text-muted-foreground text-center sm:text-left px-6 text-lg" 
              />
              <Button size="lg" type="submit" className="h-14 rounded-none uppercase font-bold tracking-widest px-10">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background border-t border-border py-16">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <span className="text-4xl font-black tracking-tighter uppercase italic text-primary block mb-6">FITWEAR</span>
              <p className="text-muted-foreground font-light mb-6">
                Premium athletic gear engineered for maximum performance, durability, and style.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  <FaInstagram size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  <FaFacebook size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  <FaTwitter size={18} />
                </a>
                <a href="#" className="w-10 h-10 bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors">
                  <FaYoutube size={18} />
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest mb-6 text-xl">Shop</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">New Arrivals</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">Best Sellers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">Men's Collection</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">Women's Collection</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">Accessories</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest mb-6 text-xl">Company</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">About Us</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">Careers</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">Press</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">Affiliates</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">Store Locator</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-black uppercase tracking-widest mb-6 text-xl">Support</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">FAQ</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">Shipping & Returns</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">Size Guide</a></li>
                <li><a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">Contact Us</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-muted-foreground text-sm">© 2024 FitWear. All rights reserved.</p>
            <div className="flex gap-4">
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>
      
    </div>
  );
}
