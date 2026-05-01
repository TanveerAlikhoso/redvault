import { useState } from "react";
import { Link, useParams } from "wouter";
import { motion } from "framer-motion";
import { Star, ShoppingCart, ArrowLeft, Check, Minus, Plus, Truck, RotateCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getProductBySlug, getRelatedProducts, getCategoryBySlug } from "@/data/store";
import { useCart } from "@/context/CartContext";
import p1 from "@/assets/product-1.png";
import p2 from "@/assets/product-2.png";
import p3 from "@/assets/product-3.png";
import p4 from "@/assets/product-4.png";

const imgs = [p1, p2, p3, p4];

export default function ProductDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const product = getProductBySlug(slug ?? "");
  const related = product ? getRelatedProducts(product) : [];
  const category = product ? getCategoryBySlug(product.category) : undefined;

  const handleAddToCart = () => {
    if (!product) return;
    addToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  if (!product) {
    return (
      <div className="bg-background text-foreground min-h-screen flex flex-col">
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center gap-6">
          <p className="text-4xl font-black uppercase">Product Not Found</p>
          <Link href="/shop" className="text-primary font-bold uppercase underline">Back to Shop</Link>
        </div>
        <Footer />
      </div>
    );
  }

  const img = imgs[(product.img - 1) % 4];

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Breadcrumb */}
      <div className="pt-28 pb-4 border-b border-border bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <nav className="flex items-center gap-2 text-sm text-muted-foreground font-semibold uppercase tracking-wider flex-wrap">
            <Link href="/" className="hover:text-primary transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-primary transition-colors">Shop</Link>
            <span>/</span>
            {category && (
              <>
                <Link href={`/category/${category.slug}`} className="hover:text-primary transition-colors">{category.name}</Link>
                <span>/</span>
              </>
            )}
            <span className="text-foreground">{product.name}</span>
          </nav>
        </div>
      </div>

      {/* Product */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <div className="aspect-square bg-card border border-border overflow-hidden sticky top-28">
                <img src={img} alt={product.name} className="w-full h-full object-cover mix-blend-lighten" />
                {product.badge && (
                  <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-sm font-bold uppercase px-3 py-1.5">
                    {product.badge}
                  </span>
                )}
                {product.originalPrice && (
                  <span className="absolute top-4 right-4 bg-background border border-border text-foreground text-sm font-bold uppercase px-3 py-1.5">
                    -{Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              {category && (
                <Link href={`/category/${category.slug}`} className="text-primary font-bold uppercase tracking-widest text-sm hover:underline block mb-4">
                  {category.name}
                </Link>
              )}

              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter leading-tight mb-6">
                {product.name}
              </h1>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < product.rating ? "fill-primary text-primary" : "fill-muted text-muted"} />
                  ))}
                </div>
                <span className="text-muted-foreground text-sm font-semibold">{product.reviews} reviews</span>
              </div>

              <div className="flex items-center gap-4 mb-8">
                <span className="text-4xl font-black text-primary">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="text-xl text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
                )}
                {product.originalPrice && (
                  <span className="bg-primary/10 text-primary font-bold text-sm px-3 py-1">
                    Save ${(product.originalPrice - product.price).toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-muted-foreground font-light leading-relaxed mb-8 text-lg">{product.description}</p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-black uppercase tracking-widest text-sm mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <Check size={16} className="text-primary flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Quantity + Add to Cart */}
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <div className="flex items-center border border-border">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-12 h-14 flex items-center justify-center hover:text-primary transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 h-14 flex items-center justify-center font-black text-lg">{quantity}</span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-12 h-14 flex items-center justify-center hover:text-primary transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <Button
                  onClick={handleAddToCart}
                  size="lg"
                  className={`flex-1 h-14 rounded-none uppercase font-bold tracking-widest text-base transition-all duration-300 ${added ? "bg-green-600 hover:bg-green-600" : ""}`}
                >
                  {added ? (
                    <><Check size={20} className="mr-2" /> Added to Cart!</>
                  ) : (
                    <><ShoppingCart size={20} className="mr-2" /> Add to Cart</>
                  )}
                </Button>
              </div>

              <Link href="/cart">
                <Button variant="outline" size="lg" className="w-full h-14 rounded-none uppercase font-bold tracking-widest border-2 text-base mb-8">
                  View Cart
                </Button>
              </Link>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-4 border-t border-border pt-8">
                {[
                  { icon: Truck, label: "Free Shipping", sub: "Orders over $50" },
                  { icon: RotateCcw, label: "30-Day Returns", sub: "Hassle free" },
                  { icon: Shield, label: "Secure Pay", sub: "256-bit SSL" },
                ].map((badge) => (
                  <div key={badge.label} className="flex flex-col items-center text-center gap-2">
                    <badge.icon size={22} className="text-primary" />
                    <span className="font-black uppercase text-xs tracking-wider">{badge.label}</span>
                    <span className="text-muted-foreground text-xs">{badge.sub}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="py-20 bg-zinc-950 border-t border-border">
          <div className="container mx-auto px-4 md:px-8">
            <div className="flex items-end justify-between mb-12">
              <div>
                <p className="text-primary font-bold uppercase tracking-widest text-sm mb-2">You May Also Like</p>
                <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter">Related Products</h2>
              </div>
              <Link href={`/category/${product.category}`} className="hidden sm:flex items-center gap-2 font-bold uppercase tracking-wider text-primary hover:underline text-sm">
                View All <ArrowLeft size={16} className="rotate-180" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
              {related.map((rel, i) => (
                <motion.div
                  key={rel.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col"
                >
                  <Link href={`/product/${rel.slug}`} className="block relative aspect-[3/4] bg-card mb-4 overflow-hidden border border-border hover:border-primary transition-colors duration-300">
                    <img src={imgs[(rel.img - 1) % 4]} alt={rel.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 mix-blend-lighten" />
                    {rel.badge && (
                      <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-bold uppercase px-2 py-1">{rel.badge}</span>
                    )}
                  </Link>
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} size={11} className={j < rel.rating ? "fill-primary text-primary" : "fill-muted text-muted"} />
                    ))}
                  </div>
                  <Link href={`/product/${rel.slug}`}>
                    <h3 className="font-black uppercase tracking-tight text-sm mb-2 group-hover:text-primary transition-colors">{rel.name}</h3>
                  </Link>
                  <span className="font-black text-primary">${rel.price.toFixed(2)}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}
