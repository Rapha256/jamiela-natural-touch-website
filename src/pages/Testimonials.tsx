import { useState, useEffect } from "react";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      setTestimonials(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  return (
    <div>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">What Our Customers Say</h1>
          <p className="text-muted-foreground">Real reviews from real people who love our products</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-card rounded-xl p-6 shadow-botanical">
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} size={18} className={j < t.rating ? "text-gold fill-gold" : "text-muted"} />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic leading-relaxed">"{t.text}"</p>
                  <div className="mt-4 pt-4 border-t border-border">
                    <p className="font-heading font-semibold">{t.name}</p>
                    <p className="text-xs text-muted-foreground">{t.country}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
