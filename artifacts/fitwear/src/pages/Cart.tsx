import { Link } from "wouter";
import { motion } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft, Truck, RotateCcw, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import p1 from "@/assets/product-1.png";
import p2 from "@/assets/product-2.png";
import p3 from "@/assets/product-3.png";
import p4 from "@/assets/product-4.png";

const imgs = [p1, p2, p3, p4];

export default function Cart() {
  const { items, removeFromCart, updateQuantity, subtotal, totalItems } = useCart();

  const shipping = subtotal >= 50 || subtotal === 0 ? 0 : 9.99;
  const total = subtotal + shipping;

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Header */}
      <section className="pt-36 pb-10 border-b border-border">
        <div className="container mx-auto px-4 md:px-8">
          <Link href="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary font-bold uppercase text-sm tracking-wider mb-6 transition-colors">
            <ArrowLeft size={16} /> Continue Shopping
          </Link>
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter">
            Your <span className="text-primary">Cart</span>
            {totalItems > 0 && <span className="text-muted-foreground ml-4 text-4xl">({totalItems})</span>}
          </h1>
        </div>
      </section>

      <div className="container mx-auto px-4 md:px-8 py-16">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <ShoppingBag size={80} className="text-muted-foreground/30 mb-8" />
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground text-lg mb-10">Add some products to get started.</p>
            <Link href="/shop">
              <Button size="lg" className="h-14 px-12 rounded-none uppercase font-bold tracking-widest">
                Shop Now
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">

            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {items.map((item, i) => {
                const img = imgs[(item.product.img - 1) % 4];
                return (
                  <motion.div
                    key={item.product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex gap-5 sm:gap-8 p-5 sm:p-6 bg-card border border-border"
                    data-testid={`cart-item-${item.product.id}`}
                  >
                    <Link href={`/product/${item.product.slug}`} className="flex-shrink-0 w-24 h-28 sm:w-32 sm:h-36 bg-background overflow-hidden border border-border hover:border-primary transition-colors">
                      <img src={img} alt={item.product.name} className="w-full h-full object-cover mix-blend-lighten" />
                    </Link>

                    <div className="flex-1 flex flex-col">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <Link href={`/category/${item.product.category}`} className="text-primary text-xs font-bold uppercase tracking-widest hover:underline">
                            {item.product.category.replace(/-/g, " ")}
                          </Link>
                          <Link href={`/product/${item.product.slug}`}>
                            <h3 className="font-black uppercase tracking-tight text-base sm:text-lg hover:text-primary transition-colors">
                              {item.product.name}
                            </h3>
                          </Link>
                        </div>
                        <button
                          onClick={() => removeFromCart(item.product.id)}
                          className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                          aria-label="Remove"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>

                      <div className="mt-auto flex items-center justify-between flex-wrap gap-3">
                        <div className="flex items-center border border-border">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-9 h-9 flex items-center justify-center hover:text-primary transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <span className="w-9 h-9 flex items-center justify-center font-black text-sm">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-9 h-9 flex items-center justify-center hover:text-primary transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        <div className="text-right">
                          <div className="font-black text-lg text-primary">${(item.product.price * item.quantity).toFixed(2)}</div>
                          {item.quantity > 1 && (
                            <div className="text-muted-foreground text-xs">${item.product.price.toFixed(2)} each</div>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border p-8 sticky top-28">
                <h2 className="font-black uppercase tracking-widest text-xl mb-8">Order Summary</h2>

                <div className="space-y-4 mb-6 pb-6 border-b border-border">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-semibold uppercase tracking-wide">Subtotal</span>
                    <span className="font-bold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground font-semibold uppercase tracking-wide">Shipping</span>
                    <span className="font-bold">{shipping === 0 ? <span className="text-primary">Free</span> : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  {shipping > 0 && (
                    <p className="text-xs text-muted-foreground">Add ${(50 - subtotal).toFixed(2)} more for free shipping</p>
                  )}
                </div>

                <div className="flex justify-between mb-8">
                  <span className="font-black uppercase tracking-widest">Total</span>
                  <span className="font-black text-2xl text-primary">${total.toFixed(2)}</span>
                </div>

                <Button size="lg" className="w-full h-14 rounded-none uppercase font-bold tracking-widest text-base mb-4">
                  Checkout
                </Button>
                <Link href="/shop">
                  <Button variant="outline" size="lg" className="w-full h-12 rounded-none uppercase font-bold tracking-widest border-2">
                    Continue Shopping
                  </Button>
                </Link>

                {/* Trust */}
                <div className="mt-8 pt-8 border-t border-border grid grid-cols-3 gap-3">
                  {[
                    { icon: Truck, label: "Free Ship\n$50+" },
                    { icon: RotateCcw, label: "30-Day\nReturns" },
                    { icon: Shield, label: "Secure\nCheckout" },
                  ].map((b) => (
                    <div key={b.label} className="flex flex-col items-center text-center gap-2">
                      <b.icon size={18} className="text-primary" />
                      <span className="font-bold uppercase text-[10px] tracking-wider leading-tight whitespace-pre">{b.label}</span>
                    </div>
                  ))}
                </div>

                {/* Promo code */}
                <div className="mt-6 pt-6 border-t border-border">
                  <p className="text-sm font-bold uppercase tracking-widest mb-3">Promo Code</p>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 bg-background border border-border px-3 py-2 text-sm focus:outline-none focus:border-primary transition-colors"
                    />
                    <button className="px-4 py-2 border border-border text-sm font-bold uppercase hover:border-primary hover:text-primary transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
