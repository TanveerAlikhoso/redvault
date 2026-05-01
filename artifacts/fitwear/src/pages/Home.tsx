import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import heroBg from "@/assets/hero-bg.png";
import brandStory from "@/assets/brand-story.png";
import product1 from "@/assets/product-1.png";
import product2 from "@/assets/product-2.png";
import product3 from "@/assets/product-3.png";
import product4 from "@/assets/product-4.png";
import categoryRunning from "@/assets/category-running.png";
import categoryTraining from "@/assets/category-training.png";

const CAT_PLACEHOLDER =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%231a1a1a'/%3E%3C/svg%3E";

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

export default function Home() {
  const [timeLeft, setTimeLeft] = useState({ days: 7, hours: 11, minutes: 45, seconds: 30 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const categories = [
    { name: "Fitness Tools", img: categoryRunning },
    { name: "Health Devices", img: categoryTraining },
    { name: "Beauty Tools", img: CAT_PLACEHOLDER },
    { name: "Supplements", img: CAT_PLACEHOLDER },
    { name: "Skincare", img: CAT_PLACEHOLDER },
    { name: "Wellness", img: CAT_PLACEHOLDER },
  ];

  const products = [
    { name: "Pro Massage Gun", price: "$149.99", img: product1, rating: 5, badge: "Best Seller" },
    { name: "Smart Jump Rope", price: "$49.99", img: product2, rating: 4, badge: "New" },
    { name: "LED Face Mask", price: "$89.99", img: product3, rating: 5, badge: "New" },
    { name: "Resistance Band Set", price: "$34.99", img: product4, rating: 4, badge: null },
    { name: "Ultrasonic Skin Scrubber", price: "$79.99", img: product1, rating: 5, badge: null },
    { name: "Ab Roller Pro", price: "$29.99", img: product2, rating: 4, badge: null },
    { name: "Collagen Boost Serum", price: "$59.99", img: product3, rating: 5, badge: null },
    { name: "Foam Roller Deluxe", price: "$44.99", img: product4, rating: 4, badge: null },
  ];

  const stats = [
    { value: "25,000+", label: "Happy Customers" },
    { value: "300+", label: "Premium Products" },
    { value: "60+", label: "Countries Served" },
    { value: "99%", label: "Satisfaction Rate" },
  ];

  const testimonials = [
    { name: "Jessica Ramirez", role: "Personal Trainer", text: "RedVault's massage gun is a game changer. Recovery time cut in half. I recommend it to all my clients without hesitation." },
    { name: "Priya Sharma", role: "Skincare Enthusiast", text: "The LED face mask from RedVault completely transformed my skincare routine. My skin has never looked better — results in just two weeks." },
    { name: "Daniel Torres", role: "Wellness Coach", text: "Finally a one-stop shop for both fitness and beauty tools. RedVault's quality is unmatched and the prices are incredibly fair." },
  ];

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden selection:bg-primary selection:text-primary-foreground">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src={heroBg} alt="Hero background" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-black/65 bg-gradient-to-t from-background via-black/40 to-transparent" />
        </div>

        <div className="container relative z-10 mx-auto px-4 md:px-8 pt-20">
          <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="max-w-5xl">
            <motion.div variants={fadeInUp} className="mb-4 inline-block bg-primary/15 border border-primary text-primary px-4 py-1.5 font-bold uppercase tracking-widest text-sm">
              Fitness · Health · Beauty
            </motion.div>
            <motion.h1 variants={fadeInUp} className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter mb-6">
              Elevate Your<br />
              <span className="text-transparent" style={{ WebkitTextStroke: "2px hsl(var(--primary))" }}>Body &amp;</span>
              <br />Beauty
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-lg md:text-xl text-gray-300 max-w-xl mb-10 font-light">
              Premium tools for your fitness, health, and beauty routine. One vault. Everything you need to look and feel your best.
            </motion.p>
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-4">
              <Button data-testid="button-shop-now" size="lg" className="h-14 px-8 text-lg rounded-none uppercase font-bold tracking-wider">
                Shop Now <ArrowRight className="ml-2" />
              </Button>
              <Button data-testid="button-explore" size="lg" variant="outline" className="h-14 px-8 text-lg rounded-none uppercase font-bold tracking-wider border-2 hover:bg-white hover:text-black transition-colors">
                Explore Collection
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Ticker */}
      <div className="w-full bg-primary text-primary-foreground py-4 overflow-hidden border-y border-primary/20">
        <div className="flex whitespace-nowrap animate-[marquee_25s_linear_infinite]">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-4 text-xl font-black uppercase tracking-widest">
              <span>Free Shipping Over $50</span>
              <span className="opacity-30">•</span>
              <span>30 Day Returns</span>
              <span className="opacity-30">•</span>
              <span>Premium Quality</span>
              <span className="opacity-30">•</span>
              <span>Worldwide Delivery</span>
              <span className="opacity-30">•</span>
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
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">Browse</p>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">
                Shop by <span className="text-primary">Category</span>
              </h2>
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
                data-testid={`card-category-${i}`}
              >
                <img src={cat.img} alt={cat.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-50 group-hover:opacity-30" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                  <h3 className="text-3xl md:text-4xl font-black uppercase tracking-widest transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    {cat.name}
                  </h3>
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
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Our Collection</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Best <span className="text-primary">Sellers</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Top-rated tools trusted by thousands for results that speak for themselves.
            </p>
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
                data-testid={`card-product-${i}`}
              >
                <div className="relative aspect-[3/4] bg-card mb-4 overflow-hidden border border-border">
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-lighten" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Button className="translate-y-4 group-hover:translate-y-0 transition-transform duration-300 uppercase font-bold rounded-none">
                      Quick Add
                    </Button>
                  </div>
                  {product.badge && (
                    <div className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-1">
                      {product.badge}
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-base mb-1 uppercase tracking-wide group-hover:text-primary transition-colors">
                      {product.name}
                    </h4>
                    <div className="flex gap-1 mb-2">
                      {[...Array(5)].map((_, j) => (
                        <Star key={j} size={13} className={j < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"} />
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
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <span className="text-[30vw] font-black uppercase tracking-tighter text-black whitespace-nowrap select-none">SALE</span>
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <p className="text-primary-foreground/70 font-bold uppercase tracking-widest text-sm mb-4">Limited Time Only</p>
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-primary-foreground mb-8">
            Flash Sale<br />Up to 60% Off
          </h2>

          <div className="flex justify-center gap-4 md:gap-8 mb-10">
            {[
              { label: "Days", value: timeLeft.days },
              { label: "Hours", value: timeLeft.hours },
              { label: "Minutes", value: timeLeft.minutes },
              { label: "Seconds", value: timeLeft.seconds },
            ].map((item) => (
              <div key={item.label} className="flex flex-col items-center">
                <div className="w-16 h-16 md:w-24 md:h-24 bg-primary-foreground text-primary flex items-center justify-center text-3xl md:text-5xl font-black mb-2 shadow-xl border-b-4 border-black/20">
                  {item.value.toString().padStart(2, "0")}
                </div>
                <span className="text-primary-foreground font-bold uppercase tracking-wider text-xs md:text-sm">{item.label}</span>
              </div>
            ))}
          </div>

          <Button size="lg" data-testid="button-shop-sale" className="bg-primary-foreground text-primary hover:bg-black hover:text-white h-14 px-12 text-lg rounded-none uppercase font-bold tracking-wider border-none">
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
              <img src={brandStory} alt="RedVault story" className="w-full h-full object-cover" />
              <div className="absolute -bottom-6 -right-6 md:-bottom-10 md:-right-10 bg-primary text-primary-foreground p-6 md:p-10 font-black uppercase max-w-xs shadow-2xl">
                <p className="text-xl md:text-3xl leading-none">"Your health. Your beauty. Your vault."</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Our Story</p>
              <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
                The <span className="text-primary">RedVault</span> Mission
              </h2>
              <p className="text-lg text-muted-foreground mb-6 font-light leading-relaxed">
                RedVault was built for people who take their health, fitness, and beauty seriously. We curate only the highest-quality tools — from recovery devices to professional-grade skincare — so you never have to compromise.
              </p>
              <p className="text-lg text-muted-foreground mb-10 font-light leading-relaxed">
                Every product in our vault is tested, reviewed, and selected by wellness professionals. We believe that looking good and feeling strong go hand in hand — and we've built the collection to prove it.
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
                data-testid={`stat-${i}`}
              >
                <div className="text-4xl md:text-6xl font-black text-transparent mb-2" style={{ WebkitTextStroke: "1px hsl(var(--foreground))" }}>
                  {stat.value}
                </div>
                <div className="font-bold uppercase tracking-widest text-primary text-sm md:text-base">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-3">Reviews</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              Real <span className="text-primary">Results</span>
            </h2>
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
                data-testid={`card-testimonial-${i}`}
              >
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} size={18} className="fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-lg italic font-light text-muted-foreground mb-8 flex-grow">"{t.text}"</p>
                <div>
                  <h4 className="font-bold text-xl uppercase">{t.name}</h4>
                  <span className="text-primary text-sm font-semibold uppercase tracking-wider">{t.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-24 bg-zinc-950 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Stay in the loop</p>
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-6">
              Join The <span className="text-primary">Vault</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10">
              Get exclusive deals, early access to new arrivals, and expert wellness tips — straight to your inbox.
            </p>

            <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <Input
                type="email"
                placeholder="Enter your email address"
                data-testid="input-email"
                className="h-14 rounded-none bg-background border-border text-foreground uppercase tracking-wider font-bold placeholder:text-muted-foreground text-center sm:text-left px-6 text-base"
              />
              <Button data-testid="button-subscribe" size="lg" type="submit" className="h-14 rounded-none uppercase font-bold tracking-widest px-10">
                Subscribe
              </Button>
            </form>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
