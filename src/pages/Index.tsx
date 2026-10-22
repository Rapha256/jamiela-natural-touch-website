import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import heroBg from "@/assets/hero-bg-new.jpeg";
import logo from "@/assets/logo.jpeg";
import { ArrowRight, Leaf, Truck, FlaskConical, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*").order("created_at").limit(6);
      setProducts(data || []);
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section className="relative min-h-[68vh] flex items-center">
        <img src={heroBg} alt="" className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-hero-overlay" />
        <div className="container mx-auto px-4 relative z-10 pt-20 pb-16 text-center">
          <img src={logo} alt="JAMIELA NATURAL TOUCH" className="w-28 h-28 mx-auto mb-6 rounded-xl shadow-botanical object-contain" />
          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 animate-fade-up">
            J&T Premium<br />
            <span className="text-primary">Hair Care</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mb-8 animate-fade-up" style={{ animationDelay: "0.15s" }}>
            Elevate your hair care with J&T. From The Gambia to the world.
          </p>
          <div className="flex flex-wrap justify-center gap-4 animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <Button asChild size="lg" className="rounded-full"><Link to="/shop">Shop the Collection <ArrowRight /></Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary text-primary"><Link to="/consultation">Get Your Custom Routine</Link></Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-accent text-accent"><a href="https://wa.me/2204129401" target="_blank" rel="noopener noreferrer">WhatsApp Order</a></Button>
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="bg-secondary py-10">
        <div className="container mx-auto px-4 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {[
            { icon: Leaf, title: "Botanically Inspired", desc: "Rooted in botanical care" },
            { icon: FlaskConical, title: "Scientifically Minded", desc: "Formulated with intention" },
            { icon: Target, title: "Purposefully Formulated", desc: "Care and attention to detail" },
            { icon: Truck, title: "Worldwide Shipping", desc: "Delivery upon request" },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex flex-col items-center gap-2">
              <Icon className="text-primary" size={32} />
              <h3 className="font-heading text-lg font-semibold">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-sm uppercase text-primary mb-4">Our Philosophy</p>
          <h2 className="font-heading text-2xl md:text-3xl leading-relaxed">No two heads of hair are exactly alike, and hair care should never be a one-size-fits-all approach.</h2>
          <Button asChild variant="link" className="mt-4"><Link to="/about">Our Story <ArrowRight /></Link></Button>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center">
          {["Growth & Retention", "Moisture & Care", "Scalp Care"].map(category => <div key={category} className="py-5 border-y border-border"><h3 className="font-heading text-xl">{category}</h3></div>)}
        </div>
      </section>

      {/* Featured Products - Dynamic */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">The JNT Collection</h2>
            <p className="text-muted-foreground">Purposefully formulated hair and body care</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-card rounded-xl overflow-hidden shadow-botanical hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted">
                  <img
                    src={product.image_url || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-heading text-xl font-semibold mt-1">{product.name}</h3>
                  <p className="text-primary font-bold text-lg mt-2">{product.price}</p>
                  <div className="flex gap-2 mt-4">
                    <Link to="/request" className="flex-1 bg-primary text-primary-foreground text-center py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">
                      Request
                    </Link>
                    <a href={`https://wa.me/2204129401?text=${encodeURIComponent(`Hi! I'd like to order ${product.name}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 border border-primary text-primary text-center py-2.5 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
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
             Personalized Hair Care Designed Just for You
          </h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">
            Take our 8-step hair questionnaire to unlock your tailored JNT routine.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="rounded-full"><Link to="/consultation">Start My Routine <ArrowRight /></Link></Button>
            <a href="https://wa.me/2204129401" target="_blank" rel="noopener noreferrer"
              className="border-2 border-primary-foreground text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:bg-primary-foreground hover:text-primary transition-colors">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-8">More Hair-Care Essentials Coming Soon</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {["Hair Grease", "Hair Butter"].map(name => <div key={name}><h3 className="font-heading text-xl">{name}</h3><p className="text-sm text-muted-foreground mt-2">Coming Soon</p></div>)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
