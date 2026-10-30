import { usePageCopy } from "@/hooks/use-page-copy";
import { Leaf, Heart, Globe, FlaskConical, Users, BadgeCheck } from "lucide-react";

const VALUES = [
  { icon: Leaf, title: "Botanically Inspired", desc: "Our formulas are rooted in botanical hair care traditions, shaped by ingredients people have trusted for generations." },
  { icon: FlaskConical, title: "Scientifically Minded", desc: "We formulate with intention — every ingredient earns its place based on what it does for your hair and scalp." },
  { icon: Heart, title: "Purposefully Formulated", desc: "No fillers, no shortcuts. Every product is formulated with care and attention to detail." },
  { icon: Users, title: "Community Centered", desc: "JNT was built through real conversations, real feedback, and a community that believes in what we do." },
  { icon: Globe, title: "Global Reach", desc: "From The Gambia to the world — we deliver worldwide, bringing Gambian beauty traditions everywhere." },
  { icon: BadgeCheck, title: "Honest Guidance", desc: "We want you to understand what you use and why it belongs in your routine." },
];

const About = () => {
  const { t } = usePageCopy("story");
  return (
  <div>
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-3">{t("text_1")}</p>
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{t("text_2")}</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">{t("text_3")}</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="prose prose-lg mx-auto text-muted-foreground leading-relaxed space-y-6">
          <p>
            <strong className="text-foreground font-heading text-xl">{t("text_4")}</strong>{" "}{t("text_5")}</p>
          <p>{t("text_6")}</p>
          <p>{t("text_7")}</p>
          <p>{t("text_8")}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-16">
          {VALUES.map(({ icon: Icon }, i) => (
            <div key={i} className="bg-card rounded-xl p-6 shadow-botanical text-center">
              <Icon className="text-primary mx-auto mb-3" size={32} />
              <h3 className="font-heading text-lg font-semibold mb-2">{t(`value_${i}_title`)}</h3>
              <p className="text-sm text-muted-foreground">{t(`value_${i}_description`)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  </div>
);
};

export default About;
