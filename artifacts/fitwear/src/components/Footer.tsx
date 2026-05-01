import { FaInstagram, FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-background border-t border-border py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div>
            <span className="text-4xl font-black tracking-tighter uppercase italic block mb-6">
              <span className="text-primary">Red</span>
              <span className="text-foreground">Vault</span>
            </span>
            <p className="text-muted-foreground font-light mb-6">
              Premium fitness, health, and beauty tools. Your one vault for everything wellness.
            </p>
            <div className="flex gap-4">
              {[FaInstagram, FaFacebook, FaTwitter, FaYoutube].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 bg-card border border-border flex items-center justify-center hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest mb-6 text-xl">Shop</h4>
            <ul className="space-y-4">
              {["Fitness Tools", "Health Devices", "Beauty Tools", "Supplements", "Skincare", "Wellness"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest mb-6 text-xl">Company</h4>
            <ul className="space-y-4">
              {[
                { label: "About Us", href: "/#about" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
                { label: "Careers", href: "#" },
                { label: "Affiliates", href: "#" },
              ].map((item) => (
                <li key={item.label}>
                  <a href={item.href} className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black uppercase tracking-widest mb-6 text-xl">Support</h4>
            <ul className="space-y-4">
              {["FAQ", "Shipping & Returns", "Size Guide", "Track Order", "Contact Us"].map((item) => (
                <li key={item}>
                  <a href="#" className="text-muted-foreground hover:text-primary uppercase text-sm font-semibold tracking-wider transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">© 2024 RedVault. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Privacy Policy</a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
