import { Leaf, Heart, Globe, FlaskConical, Users, BadgeCheck } from "lucide-react";

const VALUES = [
  { icon: Leaf, title: "Botanically Inspired", desc: "Our formulas are rooted in botanical hair care traditions, shaped by ingredients people have trusted for generations." },
  { icon: FlaskConical, title: "Scientifically Minded", desc: "We formulate with intention — every ingredient earns its place based on what it does for your hair and scalp." },
  { icon: Heart, title: "Purposefully Formulated", desc: "No fillers, no shortcuts. Every product is formulated with care and attention to detail." },
  { icon: Users, title: "Community Centered", desc: "JNT was built through real conversations, real feedback, and a community that believes in what we do." },
  { icon: Globe, title: "Global Reach", desc: "From The Gambia to the world — we deliver worldwide, bringing Gambian beauty traditions everywhere." },
  { icon: BadgeCheck, title: "Honest Guidance", desc: "We want you to understand what you use and why it belongs in your routine." },
];

const About = () => (
  <div>
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-3">Our Story</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">From The Gambia to the World</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Scientifically Minded. Botanically Inspired. Purposefully Formulated.
        </p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
          <p>
            <strong className="text-foreground font-heading text-xl">JAMIELA NATURAL TOUCH</strong> began with a simple
            belief: hair care should be honest, intentional, and rooted in what truly works. Based in Sukuta, The Gambia,
            we launched in October 2023 with a commitment to premium hair care that reflects our standards of quality,
            care, and performance.
          </p>
          <p>
            We harness the rich botanical heritage of West Africa to create products that nourish, protect, and
            revitalize. Every ingredient is carefully selected — from shea butter to coconut oil, from herbal extracts
            to essential oils — ensuring our formulations are as gentle on the earth as they are on your hair and scalp.
          </p>
          <p>
            But JNT is more than products. We believe in offering more than beautiful packaging — we want our customers
            to understand what they use and why it belongs in their hair care routine. That's why every product comes
            with honest guidance, and why we offer personalized consultations to help you build a routine that fits
            your hair, your goals, and your life.
          </p>
          <p>
            Our mission is simple: to accelerate your beauty naturally. No harsh chemicals, no empty promises — just
            the power of nature, formulated with care and attention to detail, working for you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card rounded-xl p-6 shadow-botanical text-center">
              <Icon className="text-primary mx-auto mb-3" size={32} />
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
