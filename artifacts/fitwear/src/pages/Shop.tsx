import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Star, ArrowRight, SlidersHorizontal, X, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, categories } from "@/data/store";
import { useCart } from "@/context/CartContext";
import p1 from "@/assets/product-1.png";
import p2 from "@/assets/product-2.png";
import p3 from "@/assets/product-3.png";
import p4 from "@/assets/product-4.png";

const imgs = [p1, p2, p3, p4];

const sortOptions = ["Featured", "Price: Low to High", "Price: High to Low", "Top Rated", "Most Reviewed"];

export default function Shop() {
  const { addToCart } = useCart();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("Featured");
  const [maxPrice, setMaxPrice] = useState(300);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [added, setAdded] = useState<string | null>(null);

  const filtered = useMemo(() => {
    let list = products.filter((p) =>
      (selectedCategory === "all" || p.category === selectedCategory) &&
      p.price <= maxPrice
    );
    if (sortBy === "Price: Low to High") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "Price: High to Low") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "Top Rated") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "Most Reviewed") list = [...list].sort((a, b) => b.reviews - a.reviews);
    return list;
  }, [selectedCategory, sortBy, maxPrice]);

  const handleAdd = (product: typeof products[0]) => {
    addToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-16 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
          <span className="text-[18vw] font-black uppercase tracking-tighter text-foreground whitespace-nowrap">SHOP</span>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">The Full Collection</p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-4">
            Shop <span className="text-primary">All</span>
          </h1>
          <p className="text-xl text-muted-foreground font-light">{products.length} products across {categories.length} categories</p>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* Sidebar filters (desktop) */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-8">
              <div>
                <h3 className="font-black uppercase tracking-widest text-sm mb-4">Categories</h3>
                <ul className="space-y-2">
                  <li>
                    <button
                      onClick={() => setSelectedCategory("all")}
                      className={`w-full text-left px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${selectedCategory === "all" ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"}`}
                    >
                      All Products ({products.length})
                    </button>
                  </li>
                  {categories.map((cat) => {
                    const count = products.filter((p) => p.category === cat.slug).length;
                    return (
                      <li key={cat.slug}>
                        <button
                          onClick={() => setSelectedCategory(cat.slug)}
                          className={`w-full text-left px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${selectedCategory === cat.slug ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"}`}
                        >
                          {cat.name} ({count})
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <h3 className="font-black uppercase tracking-widest text-sm mb-4">Max Price: ${maxPrice}</h3>
                <input
                  type="range" min={20} max={300} step={10} value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>$20</span><span>$300</span>
                </div>
              </div>

              <div>
                <h3 className="font-black uppercase tracking-widest text-sm mb-4">Sort By</h3>
                <ul className="space-y-2">
                  {sortOptions.map((opt) => (
                    <li key={opt}>
                      <button
                        onClick={() => setSortBy(opt)}
                        className={`w-full text-left px-3 py-2 text-sm font-bold uppercase tracking-wider transition-colors ${sortBy === opt ? "text-primary bg-primary/10" : "text-muted-foreground hover:text-primary"}`}
                      >
                        {opt}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Mobile filter bar */}
          <div className="lg:hidden flex gap-3 mb-4">
            <button
              onClick={() => setFiltersOpen(true)}
              className="flex items-center gap-2 border border-border px-4 py-2 text-sm font-bold uppercase tracking-wider hover:border-primary hover:text-primary transition-colors"
            >
              <SlidersHorizontal size={16} /> Filters
            </button>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="flex-1 bg-card border border-border text-foreground px-4 py-2 text-sm font-bold uppercase tracking-wider focus:outline-none focus:border-primary"
            >
              {sortOptions.map((opt) => <option key={opt}>{opt}</option>)}
            </select>
          </div>

          {/* Mobile filter drawer */}
          {filtersOpen && (
            <div className="fixed inset-0 bg-background z-50 overflow-y-auto p-8 lg:hidden">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black uppercase">Filters</h2>
                <button onClick={() => setFiltersOpen(false)}><X size={28} /></button>
              </div>
              <div className="space-y-8">
                <div>
                  <h3 className="font-black uppercase tracking-widest text-sm mb-4">Categories</h3>
                  <ul className="space-y-3">
                    <li><button onClick={() => { setSelectedCategory("all"); setFiltersOpen(false); }} className={`text-sm font-bold uppercase tracking-wider ${selectedCategory === "all" ? "text-primary" : "text-muted-foreground"}`}>All Products</button></li>
                    {categories.map((cat) => (
                      <li key={cat.slug}><button onClick={() => { setSelectedCategory(cat.slug); setFiltersOpen(false); }} className={`text-sm font-bold uppercase tracking-wider ${selectedCategory === cat.slug ? "text-primary" : "text-muted-foreground"}`}>{cat.name}</button></li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-black uppercase tracking-widest text-sm mb-4">Max Price: ${maxPrice}</h3>
                  <input type="range" min={20} max={300} step={10} value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-primary" />
                </div>
              </div>
            </div>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-8">
              <p className="text-muted-foreground text-sm font-bold uppercase tracking-wider">{filtered.length} products</p>
              <div className="hidden lg:flex items-center gap-2">
                <span className="text-sm text-muted-foreground font-bold uppercase tracking-wider">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-card border border-border text-foreground px-4 py-2 text-sm font-bold focus:outline-none focus:border-primary"
                >
                  {sortOptions.map((opt) => <option key={opt}>{opt}</option>)}
                </select>
              </div>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-32">
                <p className="text-2xl font-black uppercase text-muted-foreground">No products found</p>
                <button onClick={() => { setSelectedCategory("all"); setMaxPrice(300); }} className="mt-4 text-primary font-bold uppercase underline">Clear Filters</button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-12">
                {filtered.map((product, i) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                    className="group flex flex-col"
                    data-testid={`card-product-${product.id}`}
                  >
                    <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] bg-card mb-4 overflow-hidden border border-border hover:border-primary transition-colors duration-300">
                      <img src={imgs[(product.img - 1) % 4]} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-lighten" />
                      <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      {product.badge && (
                        <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-1">
                          {product.badge}
                        </span>
                      )}
                      {product.originalPrice && (
                        <span className="absolute top-3 right-3 bg-background text-foreground text-xs font-bold uppercase px-2 py-1 border border-border">
                          -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                        </span>
                      )}
                    </Link>

                    <Link href={`/product/${product.slug}`} className="block">
                      <div className="flex gap-1 mb-2">
                        {[...Array(5)].map((_, j) => (
                          <Star key={j} size={12} className={j < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"} />
                        ))}
                        <span className="text-muted-foreground text-xs ml-1">({product.reviews})</span>
                      </div>
                      <h3 className="font-black uppercase tracking-tight text-base mb-1 group-hover:text-primary transition-colors leading-tight">
                        {product.name}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mt-auto pt-3">
                      <div className="flex items-center gap-2">
                        <span className="font-black text-lg text-primary">${product.price.toFixed(2)}</span>
                        {product.originalPrice && (
                          <span className="text-muted-foreground line-through text-sm">${product.originalPrice.toFixed(2)}</span>
                        )}
                      </div>
                      <button
                        onClick={() => handleAdd(product)}
                        className={`flex items-center gap-1.5 px-3 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 ${added === product.id ? "bg-primary text-primary-foreground" : "border border-border hover:border-primary hover:text-primary"}`}
                      >
                        <ShoppingCart size={13} />
                        {added === product.id ? "Added!" : "Add"}
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
