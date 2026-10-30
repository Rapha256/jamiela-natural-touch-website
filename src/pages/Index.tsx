import { usePageCopy } from "@/hooks/use-page-copy";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";


import { ArrowRight, Leaf, Truck, FlaskConical, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isHairProduct } from "@/lib/hair-products";

const Index = () => {
  const { t, list } = usePageCopy("home");
  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase.from("products").select("*").order("created_at").limit(6);
      setProducts((data || []).filter(isHairProduct));
    };
    fetchProducts();
  }, []);

  return (
    <div>
      {/* Hero */}
      <section aria-label="Jamiela Natural Touch" className="relative">
        <h1 className="sr-only">{t("hero_title")}</h1>
        <img src={t("hero_image")} alt={t("hero_title")} className="w-full aspect-[1280/722] object-contain" fetchPriority="high" />
        <div className="container mx-auto px-4 py-6 flex flex-wrap justify-center gap-3">
          <Button asChild className="rounded-full"><Link to="/shop">{t("text_4")}<ArrowRight /></Link></Button>
          <Button asChild variant="outline" className="rounded-full"><Link to="/consultation">{t("text_5")}</Link></Button>
          <Button asChild variant="outline" className="rounded-full"><a href="https://wa.me/2204129401" target="_blank" rel="noopener noreferrer">{t("text_6")}</a></Button>
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
          ].map(({ icon: Icon }, i) => (
            <div key={i} className="flex flex-col items-center gap-2">
              <Icon className="text-primary" size={32} />
              <h3 className="font-heading text-lg font-semibold">{t(`value_${i}_title`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`value_${i}_description`)}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 border-b border-border">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <p className="text-sm uppercase text-primary mb-4">{t("text_7")}</p>
          <h2 className="font-heading text-2xl md:text-3xl leading-relaxed">{t("text_8")}</h2>
          <Button asChild variant="link" className="mt-4"><Link to="/about">{t("text_9")}<ArrowRight /></Link></Button>
        </div>
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 text-center">
          {list("categories").map(category => <div key={category} className="py-5 border-y border-border"><h3 className="font-heading text-xl">{category}</h3></div>)}
        </div>
      </section>

      {/* Featured Products - Dynamic */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold mb-3">{t("text_10")}</h2>
            <p className="text-muted-foreground">{t("text_11")}</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <div key={product.id} className="group bg-card rounded-xl overflow-hidden shadow-botanical hover:shadow-lg transition-shadow">
                <Link to={`/shop/${product.id}`} className="block aspect-square overflow-hidden bg-muted">
                  {product.image_url && <img
                    src={product.image_url || undefined}
                    alt={product.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  />}
                </Link>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-heading text-xl font-semibold mt-1"><Link to={`/shop/${product.id}`}>{product.name}</Link></h3>
                  <p className="text-primary font-bold text-lg mt-2">{product.price}</p>
                  <div className="flex gap-2 mt-4">
                    <Link to="/request" className="flex-1 bg-primary text-primary-foreground text-center py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity">{t("text_12")}</Link>
                    <a href={`https://wa.me/2204129401?text=${encodeURIComponent(`Hi! I'd like to order ${product.name}`)}`}
                      target="_blank" rel="noopener noreferrer"
                      className="flex-1 border border-primary text-primary text-center py-2.5 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors">{t("text_13")}</a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-12">
            <Link to="/shop" className="text-primary font-medium hover:underline inline-flex items-center gap-1">{t("text_14")}<ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground mb-4">{t("text_15")}</h2>
          <p className="text-primary-foreground/80 mb-8 max-w-lg mx-auto">{t("text_16")}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" variant="secondary" className="rounded-full"><Link to="/consultation">{t("text_17")}<ArrowRight /></Link></Button>
            <a href="https://wa.me/2204129401" target="_blank" rel="noopener noreferrer"
              className="border-2 border-primary-foreground text-primary-foreground px-8 py-3.5 rounded-full font-medium hover:bg-primary-foreground hover:text-primary transition-colors">{t("text_18")}</a>
          </div>
        </div>
      </section>
      <section className="py-16 text-center">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl font-bold mb-8">{t("text_19")}</h2>
          <div className="flex flex-wrap justify-center gap-12">
            {list("coming_soon").map(name => <div key={name}><h3 className="font-heading text-xl">{name}</h3><p className="text-sm text-muted-foreground mt-2">{t("text_20")}</p></div>)}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
