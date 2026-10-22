import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const FAQS = [
  {
    group: "About JNT",
    items: [
      {
        q: "Are JNT products genuinely created for your brand, or do you simply put your own labels on someone else's products?",
        a: "JNT is committed to offering premium hair care products that reflect our brand's standards of quality, care, and performance. Our products are developed and presented under the JNT brand, with a focus on supporting healthy hair care practices and helping our customers care for their hair with confidence. We believe in offering more than beautiful packaging. We want our customers to understand what they use and why it belongs in their hair care routine.",
      },
      {
        q: "Are JNT products safe for my hair?",
        a: "Our products are designed with hair care in mind. We encourage every customer to read the product description, ingredients, and directions before use. Individual results and suitability may vary depending on your hair, scalp, and sensitivities. Perform a patch test before using a new product and discontinue use if irritation occurs.",
      },
      {
        q: "Are JNT products suitable for all hair textures and types?",
        a: "Different hair textures and types have different needs. We aim to offer products for various hair care needs, but not every product will be suitable for every hair type or concern. Please check each product's description and recommended use. If you're unsure which product is right for you, contact us for guidance.",
      },
      {
        q: "Can both men and women use JNT products?",
        a: "Yes. Our hair care products are intended for anyone whose hair care needs match the product's purpose and directions. We encourage everyone to choose products according to their hair & scalp needs, and individual concerns.",
      },
      {
        q: "Are JNT products suitable for children and older adults?",
        a: "Suitability depends on the individual product, its ingredients, and the person's needs or sensitivities. Please check the product information before use. For young children, seek professional guidance if you are unsure whether a product is suitable for them.",
      },
    ],
  },
  {
    group: "Using JNT Products",
    items: [
      {
        q: "How do I know how to use each product?",
        a: "Each product should be used according to its specific directions. Read the instructions on the product label or product page before applying it. If you need help incorporating a product into your routine, contact us for guidance.",
      },
      {
        q: "How often should I use JNT products?",
        a: "The recommended frequency depends on the product and your hair's needs. Always follow the specific directions rather than assuming every product should be used daily. Contact us for more details.",
      },
      {
        q: "Can I combine different JNT products in one hair care routine?",
        a: "Some products may complement one another, but the best combination depends on their purpose and your hair's needs. Contact us if you need help choosing products or deciding how to use them together.",
      },
    ],
  },
];

const FAQItem = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-card rounded-xl shadow-botanical overflow-hidden">
      <Button variant="ghost" aria-expanded={open}
        onClick={() => setOpen(!open)}
        className="h-auto whitespace-normal w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-muted hover:text-foreground"
      >
        <span className="font-heading text-lg font-semibold">{q}</span>
        <ChevronDown className={`shrink-0 text-primary transition-transform ${open ? "rotate-180" : ""}`} size={20} />
      </Button>
      {open && <p className="px-6 pb-6 text-muted-foreground leading-relaxed">{a}</p>}
    </div>
  );
};

const FAQ = () => (
  <div>
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Frequently Asked Questions</h1>
        <p className="text-muted-foreground">Everything you need to know about JNT products</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl space-y-12">
        {FAQS.map((group) => (
          <div key={group.group}>
            <h2 className="font-heading text-2xl font-bold mb-6 text-primary">{group.group}</h2>
            <div className="space-y-4">
              {group.items.map((item) => (
                <FAQItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  </div>
);

export default FAQ;
