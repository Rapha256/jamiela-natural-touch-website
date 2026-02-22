import { Link } from "react-router-dom";
import { MapPin, Phone, Mail } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background">
    <div className="container mx-auto px-4 py-16">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-heading text-2xl font-semibold mb-4">JAMIELA</h3>
          <p className="text-sm opacity-70 leading-relaxed">
            Accelerate Your Beauty Naturally. Premium handcrafted hair and body care products from Sukuta, The Gambia.
          </p>
        </div>
        <div>
          <h4 className="font-heading text-lg font-medium mb-4">Quick Links</h4>
          <div className="flex flex-col gap-2">
            {[
              { to: "/shop", label: "Shop" },
              { to: "/request", label: "Send Request" },
              { to: "/about", label: "About Us" },
              { to: "/delivery", label: "Delivery Info" },
              { to: "/contact", label: "Contact" },
            ].map((l) => (
              <Link key={l.to} to={l.to} className="text-sm opacity-70 hover:opacity-100 transition-opacity">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h4 className="font-heading text-lg font-medium mb-4">Contact</h4>
          <div className="flex flex-col gap-3 text-sm opacity-70">
            <div className="flex items-center gap-2">
              <MapPin size={16} /> Sukuta, The Gambia
            </div>
            <div className="flex items-center gap-2">
              <Phone size={16} /> +220 412 9401
            </div>
            <div className="flex items-center gap-2">
              <Mail size={16} /> info@jamielanaturaltouch.com
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-background/10 mt-12 pt-8 flex items-center justify-between text-xs opacity-50">
        <span>© {new Date().getFullYear()} JAMIELA NATURAL TOUCH. All rights reserved.</span>
        <Link to="/admin" className="hover:opacity-100 transition-opacity">Admin Access</Link>
      </div>
    </div>
  </footer>
);

export default Footer;
