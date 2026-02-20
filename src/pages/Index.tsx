import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";
import logo from "@/assets/logo.jpeg";
import productHairOil from "@/assets/product-hair-oil.jpg";
import productGrowthSerum from "@/assets/product-growth-serum.jpg";
import productHairMist from "@/assets/product-hair-mist.jpg";
import productHairCream from "@/assets/product-hair-cream.jpg";
import productBodyCream from "@/assets/product-body-cream.jpg";
import { ArrowRight, Leaf, Truck, ShieldCheck } from "lucide-react";

const featuredProducts = [
  { name: "Hair Oil", price: "D450", image: productHairOil, category: "Hair Care" },
  { name: "Growth Serum", price: "D550", image: productGrowthSerum, category: "Hair Care" },
  { name: "Herbal Hair Mist", price: "D350", image: productHairMist, category: "Hair Care" },
  { name: "Hair Cream", price: "D400", image: productHairCream, category: "Hair Care" },
  { name: "Body Cream", price: "D500", image: productBodyCream, category: "Body Care" },
];

const Index = () => {
  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container mx-auto px-4 relative z-10 pt-20 pb-16 text-center">
          <img src={logo} alt="JAMIELA NATURAL TOUCH" className="w-28 h-28 mx-auto mb-6 rounded-xl shadow-botanical object-contain" />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-up">
            Accelerate Your Beauty<br />
            <span className="text-primary">Naturally</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Premium handcrafted hair and body care products made with nature's finest botanicals in Sukuta, The Gambia.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Link
              to="/shop"
              className="bg-primary text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity flex items-center gap-2"
            >
              Shop Now <ArrowRight size={18} />
            </Link>
            <Link
              to="/request"
              className="border-2 border-primary text-primary px-8 py-3.5 rounded-full font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
            >
              Send Request
            </Link>
            <a
              href="https://wa.me/2204129401"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-accent text-accent px-8 py-3.5 rounded-full font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
            >
              WhatsApp Order
            </a>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="bg-secondary py-10">
        <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { icon: Leaf, title: "100% Natural", desc: "Pure botanical ingredients" },
            { icon: Truck, title: "Worldwide Delivery", desc: "Ship anywhere upon request" },
            { icon: ShieldCheck, title: "Trusted Quality", desc: "Handcrafted with care" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-2">
              <Icon className="text-primary" size={32} />
              <h3 className="font-heading text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">Our Products</h2>
            <p className="text-muted-foreground">Nature's best, crafted for you</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.name}
                className="group bg-card rounded-xl overflow-hidden shadow-botanical hover:shadow-lg transition-shadow"
              >
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-heading text-xl font-semibold mt-1">{product.name}</h3>
                  <p className="text-primary font-bold text-lg mt-2">{product.price}</p>
                  <div className="flex gap-2 mt-4">
                    <Link
                      to="/request"
                      className="flex-1 bg-primary text-primary-foreground text-center py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Request
                    </Link>
                    <a
                      href={`https://wa.me/2204129401?text=Hi! I'd like to order ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-primary text-primary text-center py-2.5 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop" className="text-primary font-medium hover:underline inline-flex items-center gap-1">
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Ready to Transform Your Beauty Routine?
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Experience the power of nature with our handcrafted products. Delivered worldwide.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/request"
              className="bg-background text-foreground px-8 py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity"
            >
              Send a Request
            </Link>
            <a
              href="https://wa.me/2204129401"
              target="_blank"
              rel="noopener noreferrer"
              className="border-2 border-primary-foreground text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:bg-primary-foreground hover:text-primary transition-colors"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
