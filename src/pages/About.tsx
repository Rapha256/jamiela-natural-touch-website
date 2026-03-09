import { Leaf, Heart, Globe } from "lucide-react";

const About = () => (
  <div>
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Story</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Rooted in nature, formulated with care from the heart of The Gambia.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
          <p>
            <strong className="text-foreground font-heading text-xl">JAMIELA NATURAL TOUCH</strong> was born out of a deep passion for natural beauty and the belief that everyone deserves access to pure, chemical-free hair and body care products.
          </p>
          <p>
            Based in Sukuta, The Gambia, we harness the rich botanical heritage of West Africa to create products that nourish, protect, and revitalize. Every ingredient is carefully selected — from shea butter to coconut oil, from herbal extracts to essential oils — ensuring our formulations are as gentle on the earth as they are on your skin and hair.
          </p>
          <p>
            Our mission is simple: to accelerate your beauty naturally. No harsh chemicals, no artificial fragrances — just the power of nature working for you.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
          {[
            { icon: Leaf, title: "Natural Ingredients", desc: "We source only the finest botanical ingredients from trusted suppliers." },
            { icon: Heart, title: "Made with Love", desc: "Every product is formulated with care and attention to detail." },
            { icon: Globe, title: "Global Reach", desc: "We deliver worldwide, bringing Gambian beauty traditions to the world." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card rounded-xl p-6 shadow-botanical text-center">
              <Icon className="text-primary mx-auto mb-3" size={36} />
              <h3 className="font-heading text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);

export default About;
