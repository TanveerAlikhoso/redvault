import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { Star, ArrowLeft, ShoppingCart } from "lucide-react";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductsByCategory, getCategoryBySlug, categories } from "@/data/store";
import { useCart } from "@/context/CartContext";
import p1 from "@/assets/product-1.png";
import p2 from "@/assets/product-2.png";
import p3 from "@/assets/product-3.png";
import p4 from "@/assets/product-4.png";

const imgs = [p1, p2, p3, p4];

export default function CategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [added, setAdded] = useState<string | null>(null);

  const category = getCategoryBySlug(slug ?? "");
  const categoryProducts = getProductsByCategory(slug ?? "");

  const handleAdd = (product: ReturnType<typeof getProductsByCategory>[0]) => {
    addToCart(product);
    setAdded(product.id);
    setTimeout(() => setAdded(null), 1500);
  };

  if (!category) {
    return (
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <p className="text-4xl font-black uppercase">Category Not Found</p>
          <Link href="/shop" className="text-primary font-bold uppercase underline">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className={`pt-36 pb-20 bg-gradient-to-b ${category.color} to-background border-b border-border relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
          <span className="text-[14vw] font-black uppercase tracking-tighter text-foreground whitespace-nowrap">
            {category.name}
          </span>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <Link href="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold uppercase text-sm tracking-wider mb-8 transition-colors">
            <ArrowLeft size={16} /> All Products
          </Link>
          <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">{categoryProducts.length} products</p>
          <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            {category.name}
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl font-light">{category.description}</p>
        </div>
      </section>

      {/* Category Nav */}
      <div className="border-b border-border bg-background/95 backdrop-blur-md sticky top-[73px] z-40">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/category/${cat.slug}`}
                className={`whitespace-nowrap px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all duration-200 flex-shrink-0 ${
                  cat.slug === slug
                    ? "bg-primary text-primary-foreground"
                    : "border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Products */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
            {categoryProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
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
        </div>
      </section>

      <Footer />
    </div>
  );
}
