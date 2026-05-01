import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

const contactInfo = [
  {
    icon: MapPin,
    title: "Our Location",
    lines: ["123 Wellness Ave, Suite 400", "Los Angeles, CA 90001"],
  },
  {
    icon: Phone,
    title: "Phone",
    lines: ["+1 (800) 733-8288", "Mon–Fri, 9am–6pm PST"],
  },
  {
    icon: Mail,
    title: "Email",
    lines: ["hello@redvault.com", "support@redvault.com"],
  },
  {
    icon: Clock,
    title: "Working Hours",
    lines: ["Monday – Friday: 9am – 6pm", "Saturday: 10am – 4pm"],
  },
];

const subjects = [
  "Order Inquiry",
  "Product Question",
  "Returns & Refunds",
  "Wholesale / B2B",
  "Press & Media",
  "Other",
];

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-background text-foreground min-h-screen overflow-x-hidden">
      <Navbar />

      {/* Hero */}
      <section className="pt-36 pb-20 bg-background border-b border-border relative overflow-hidden">
        <div className="absolute inset-0 opacity-5 pointer-events-none select-none flex items-center justify-center">
          <span className="text-[18vw] font-black uppercase tracking-tighter text-foreground whitespace-nowrap">CONTACT</span>
        </div>
        <div className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp}>
            <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Get in Touch</p>
            <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
              We'd Love To<br /><span className="text-primary">Hear From You</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl font-light">
              Questions about an order? Need expert advice on a product? Our team is here to help — fast.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-zinc-950">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card border border-border p-8 group hover:border-primary transition-colors duration-300"
                data-testid={`card-contact-info-${i}`}
              >
                <div className="w-12 h-12 bg-primary/10 border border-primary/30 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:border-primary transition-colors duration-300">
                  <item.icon size={22} className="text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                </div>
                <h3 className="font-black uppercase tracking-wider text-lg mb-3">{item.title}</h3>
                {item.lines.map((line, j) => (
                  <p key={j} className="text-muted-foreground font-light text-sm leading-relaxed">{line}</p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form + Map */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Send a Message</p>
              <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-10">
                Let's <span className="text-primary">Connect</span>
              </h2>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-card border border-primary p-12 text-center"
                >
                  <CheckCircle size={56} className="text-primary mx-auto mb-6" />
                  <h3 className="text-3xl font-black uppercase tracking-tight mb-4">Message Sent!</h3>
                  <p className="text-muted-foreground font-light text-lg mb-8">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <Button
                    onClick={() => { setSubmitted(false); setFormData({ name: "", email: "", subject: "", message: "" }); }}
                    variant="outline"
                    className="rounded-none uppercase font-bold tracking-widest border-2 h-12 px-8"
                  >
                    Send Another
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="name">
                        Full Name *
                      </label>
                      <Input
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Jane Smith"
                        data-testid="input-name"
                        className="h-13 rounded-none bg-card border-border focus:border-primary placeholder:text-muted-foreground/50 px-5 py-4"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="email">
                        Email Address *
                      </label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="jane@example.com"
                        data-testid="input-email"
                        className="h-13 rounded-none bg-card border-border focus:border-primary placeholder:text-muted-foreground/50 px-5 py-4"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="subject">
                      Subject *
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      required
                      value={formData.subject}
                      onChange={handleChange}
                      data-testid="select-subject"
                      className="w-full h-13 rounded-none bg-card border border-border text-foreground px-5 py-4 text-sm focus:outline-none focus:border-primary transition-colors appearance-none cursor-pointer"
                    >
                      <option value="" disabled>Select a subject...</option>
                      {subjects.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-bold uppercase tracking-widest text-muted-foreground" htmlFor="message">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell us how we can help you..."
                      data-testid="textarea-message"
                      className="w-full rounded-none bg-card border border-border text-foreground px-5 py-4 text-sm focus:outline-none focus:border-primary transition-colors resize-none placeholder:text-muted-foreground/50"
                    />
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    data-testid="button-submit"
                    className="w-full h-14 rounded-none uppercase font-bold tracking-widest text-base"
                  >
                    Send Message <Send size={18} className="ml-2" />
                  </Button>
                </form>
              )}
            </motion.div>

            {/* Map / Info Panel */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              {/* Fake map */}
              <div className="aspect-[4/3] bg-card border border-border relative overflow-hidden">
                <div className="absolute inset-0 bg-zinc-900 flex items-center justify-center flex-col gap-4">
                  <div className="grid grid-cols-6 grid-rows-6 gap-px w-full h-full opacity-10">
                    {Array.from({ length: 36 }).map((_, i) => (
                      <div key={i} className="bg-zinc-600" />
                    ))}
                  </div>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center mb-3 animate-pulse">
                      <MapPin size={28} className="text-primary" />
                    </div>
                    <p className="font-black uppercase tracking-widest text-xl">RedVault HQ</p>
                    <p className="text-muted-foreground text-sm mt-1">Los Angeles, CA</p>
                  </div>
                </div>
              </div>

              {/* FAQ Teasers */}
              <div className="bg-card border border-border p-8">
                <h3 className="font-black uppercase tracking-widest text-xl mb-6">Quick Answers</h3>
                <div className="space-y-5">
                  {[
                    { q: "How long does shipping take?", a: "Standard: 5–7 business days. Express: 2–3 business days. Free shipping on orders over $50." },
                    { q: "What is your return policy?", a: "30-day hassle-free returns on all items in original condition. Start a return from your account." },
                    { q: "Do you ship internationally?", a: "Yes! We ship to over 60 countries. International delivery takes 7–14 business days." },
                  ].map((item, i) => (
                    <div key={i} className="border-b border-border pb-5 last:border-0 last:pb-0">
                      <p className="font-bold uppercase tracking-wide text-sm mb-2">{item.q}</p>
                      <p className="text-muted-foreground text-sm font-light leading-relaxed">{item.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
