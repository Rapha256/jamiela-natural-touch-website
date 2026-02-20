import { Star } from "lucide-react";

const testimonials = [
  { name: "Fatou J.", rating: 5, text: "My hair has never looked this healthy! The Growth Serum is amazing. I saw results in just 3 weeks.", country: "The Gambia" },
  { name: "Amina K.", rating: 5, text: "I love the Body Cream — it's so moisturizing and smells wonderful. My skin glows all day!", country: "Senegal" },
  { name: "Sarah M.", rating: 4, text: "The Hair Oil is my go-to product. It keeps my hair soft and manageable. Highly recommended.", country: "United Kingdom" },
  { name: "Mariama B.", rating: 5, text: "Natural products that actually work! I've tried many brands but JAMIELA is the best by far.", country: "The Gambia" },
];

const Testimonials = () => (
  <div>
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">What Our Customers Say</h1>
        <p className="text-muted-foreground">Real reviews from real people who love our products</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-card rounded-xl p-6 shadow-botanical">
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
      </div>
    </section>
  </div>
);

export default Testimonials;
