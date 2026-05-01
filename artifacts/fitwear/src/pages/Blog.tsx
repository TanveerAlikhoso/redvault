import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const categories = ["All", "Fitness", "Health", "Beauty", "Nutrition", "Wellness"];

const posts = [
  {
    id: 1,
    title: "10 Essential Fitness Tools Every Home Gym Needs in 2024",
    excerpt: "Building a home gym doesn't have to cost a fortune. We break down the ten must-have tools that deliver maximum results for minimal investment.",
    category: "Fitness",
    author: "Jordan Miles",
    date: "Nov 12, 2024",
    readTime: "6 min read",
    featured: true,
    color: "from-red-900/60 to-black/80",
  },
  {
    id: 2,
    title: "The Science Behind LED Light Therapy for Skin Rejuvenation",
    excerpt: "LED face masks have taken the beauty world by storm. Here's what the research actually says about red and blue light therapy for your skin.",
    category: "Beauty",
    author: "Aisha Patel",
    date: "Nov 8, 2024",
    readTime: "8 min read",
    featured: true,
    color: "from-zinc-900/60 to-black/80",
  },
  {
    id: 3,
    title: "Recovery 101: Why a Massage Gun Belongs in Your Routine",
    excerpt: "Professional athletes have used percussive therapy for years. Now it's accessible to everyone. Learn how to use it for faster muscle recovery.",
    category: "Fitness",
    author: "Marcus Webb",
    date: "Nov 4, 2024",
    readTime: "5 min read",
    featured: false,
    color: "from-zinc-900/60 to-black/80",
  },
  {
    id: 4,
    title: "Collagen Supplements: Do They Actually Work?",
    excerpt: "The supplement industry is full of hype. We cut through the noise and look at the clinical evidence for collagen's effect on skin, joints, and more.",
    category: "Nutrition",
    author: "Dr. Sana Rowe",
    date: "Oct 29, 2024",
    readTime: "7 min read",
    featured: false,
    color: "from-zinc-900/60 to-black/80",
  },
  {
    id: 5,
    title: "5 Morning Wellness Habits That Take Under 10 Minutes",
    excerpt: "You don't need a two-hour morning routine to feel good. These five quick habits will set the tone for your entire day without eating into your schedule.",
    category: "Wellness",
    author: "Priya Nair",
    date: "Oct 22, 2024",
    readTime: "4 min read",
    featured: false,
    color: "from-zinc-900/60 to-black/80",
  },
  {
    id: 6,
    title: "Ultrasonic Skin Scrubbers: The Gentle Exfoliation Revolution",
    excerpt: "Forget harsh physical scrubs. Ultrasonic skin scrubbers use high-frequency vibrations to deeply cleanse pores without damaging your skin barrier.",
    category: "Beauty",
    author: "Aisha Patel",
    date: "Oct 15, 2024",
    readTime: "6 min read",
    featured: false,
    color: "from-zinc-900/60 to-black/80",
  },
  {
    id: 7,
    title: "How to Build a Consistent Exercise Habit That Actually Sticks",
    excerpt: "Motivation fades. Habits last. Behavioral scientists share the proven strategies for building an exercise routine you'll actually maintain long-term.",
    category: "Health",
    author: "Jordan Miles",
    date: "Oct 9, 2024",
    readTime: "9 min read",
    featured: false,
    color: "from-zinc-900/60 to-black/80",
  },
  {
    id: 8,
    title: "Resistance Bands vs. Free Weights: Which Should You Use?",
    excerpt: "The resistance band renaissance is real — but are they actually better than dumbbells? We compare both tools across strength, convenience, and cost.",
    category: "Fitness",
    author: "Marcus Webb",
    date: "Oct 2, 2024",
    readTime: "5 min read",
    featured: false,
    color: "from-zinc-900/60 to-black/80",
  },
];

export default function Blog() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? posts
    : posts.filter((p) => p.category === activeCategory);

  const featured = posts.filter((p) => p.featured);
  const regular = filtered.filter((p) => !p.featured);

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
          <span className="text-[20vw] font-black uppercase tracking-tighter text-foreground whitespace-nowrap">BLOG</span>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">The RedVault Journal</p>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              Tips, Trends<br />&amp; <span className="text-primary">Insights</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl font-light">
              Expert guidance on fitness, health, and beauty — from the people who live it every day.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 md:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-primary font-bold uppercase tracking-widest text-sm mb-4"
          >
            Featured
          </motion.p>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {featured.map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="group relative aspect-[16/9] overflow-hidden bg-card cursor-pointer"
                data-testid={`card-featured-${post.id}`}
              >
                <div className={`absolute inset-0 bg-gradient-to-t ${post.color} z-10`} />
                <div className="absolute inset-0 bg-zinc-800 group-hover:bg-zinc-700 transition-colors duration-500" />

                <div className="absolute inset-0 z-20 flex flex-col justify-end p-8">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-primary text-primary-foreground text-xs font-bold uppercase px-3 py-1 tracking-wider">
                      {post.category}
                    </span>
                    <span className="text-white/60 text-sm flex items-center gap-1">
                      <Clock size={13} /> {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight text-white mb-3 group-hover:text-primary transition-colors duration-300">
                    {post.title}
                  </h2>
                  <p className="text-white/70 font-light mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-white/50 text-sm flex items-center gap-1">
                      <User size={13} /> {post.author} · {post.date}
                    </span>
                    <span className="text-primary flex items-center gap-1 font-bold uppercase text-sm group-hover:gap-3 transition-all duration-300">
                      Read <ArrowRight size={16} />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-16 bg-background border-b border-border sticky top-[73px] z-40 bg-background/95 backdrop-blur-md">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-muted-foreground uppercase text-sm font-bold tracking-widest mr-2">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                data-testid={`filter-${cat.toLowerCase()}`}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 uppercase text-sm font-bold tracking-wider transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-card border border-border text-muted-foreground hover:border-primary hover:text-primary"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          {regular.length === 0 ? (
            <div className="text-center py-20 text-muted-foreground">
              <p className="text-2xl font-bold uppercase">No posts in this category yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {regular.map((post, i) => (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group flex flex-col cursor-pointer"
                  data-testid={`card-post-${post.id}`}
                >
                  <div className="aspect-[16/10] bg-card border border-border mb-6 overflow-hidden relative">
                    <div className="absolute inset-0 bg-zinc-800 group-hover:bg-zinc-700 transition-colors duration-500" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-6xl font-black text-zinc-700 uppercase tracking-tighter select-none">
                        {post.category[0]}
                      </span>
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary text-primary-foreground text-xs font-bold uppercase px-3 py-1 tracking-wider">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-muted-foreground text-xs uppercase tracking-wider font-semibold mb-4">
                    <span className="flex items-center gap-1"><User size={12} /> {post.author}</span>
                    <span>·</span>
                    <span>{post.date}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                  </div>

                  <h3 className="text-xl md:text-2xl font-black uppercase tracking-tight mb-3 group-hover:text-primary transition-colors duration-300 leading-tight">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground font-light leading-relaxed mb-6 flex-grow line-clamp-3">
                    {post.excerpt}
                  </p>

                  <a href="#" className="flex items-center gap-2 text-primary font-bold uppercase tracking-wider text-sm group-hover:gap-4 transition-all duration-300">
                    Read Article <ArrowRight size={16} />
                  </a>
                </motion.article>
              ))}
            </div>
          )}

          <div className="mt-20 text-center">
            <Button variant="outline" size="lg" className="rounded-none uppercase font-bold tracking-widest border-2 h-14 px-10">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-24 bg-zinc-950 border-t border-border">
        <div className="container mx-auto px-4 md:px-8 max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Stay Updated</p>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter mb-6">
              Never Miss a <span className="text-primary">Drop</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Get the latest wellness tips, product launches, and exclusive deals delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="Enter your email address"
                data-testid="input-newsletter-email"
                className="h-14 flex-1 rounded-none bg-background border border-border text-foreground px-6 text-base font-medium placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-colors"
              />
              <Button type="submit" className="h-14 rounded-none uppercase font-bold tracking-widest px-8">
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
