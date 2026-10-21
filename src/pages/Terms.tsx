const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h2 className="font-heading text-2xl font-bold text-foreground">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </div>
);

const Terms = () => (
  <div>
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Terms &amp; Conditions</h1>
        <p className="text-muted-foreground">Last updated: 2026</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl space-y-10">
        <Section title="1. Use of Our Website">
          <p>By using our website, you agree to use it lawfully and respectfully. You must not misuse the website, interfere with its operation, or attempt unauthorized access to any part of it.</p>
        </Section>

        <Section title="2. Product Information">
          <p>We aim to display product descriptions, ingredients, prices, images, and availability as accurately as possible. However, we do not guarantee that all content will always be error-free, complete, or current. We may update product details, packaging, pricing, and availability at any time without prior notice.</p>
        </Section>

        <Section title="3. Orders and Acceptance">
          <p>When you place an order, you are making an offer to purchase the selected products. We reserve the right to accept or reject any order at our discretion, including in cases of pricing errors, stock limitations, suspected fraud, or inability to process payment or delivery.</p>
        </Section>

        <Section title="4. Prices and Payment">
          <p>All prices are shown in USD unless otherwise stated, and may be subject to change. Payment must be completed before an order is processed, unless we state otherwise. Additional charges such as shipping, customs, duties, or local taxes may apply depending on your location.</p>
        </Section>

        <Section title="5. Shipping and Delivery">
          <p>Delivery times are estimates and may vary due to location, courier delays, customs processing, weather, or other circumstances beyond our control. Risk and responsibility for the order pass to the customer according to the delivery terms stated at checkout or in our delivery policy. Please see our Delivery Policy for full details.</p>
        </Section>

        <Section title="6. Returns, Refunds, and Exchanges">
          <p>All purchases are final. Please review our Returns &amp; Order Issues Policy before ordering.</p>
        </Section>

        <Section title="7. Product Use and Responsibility">
          <p>Our products should be used only as directed on the label, packaging, or product page. Individual results may vary depending on hair type, scalp condition, sensitivities, consistency of use, and other personal factors. Perform a patch test before using a new product and discontinue use if irritation occurs. For specific concerns or ongoing scalp or hair conditions, seek professional advice.</p>
        </Section>

        <Section title="8. Intellectual Property">
          <p>All content on this website — including our brand name, logos, product names, images, text, graphics, and design — belongs to Jamiela Natural Touch or its licensors and may not be copied, reproduced, distributed, or used without our written permission.</p>
        </Section>

        <Section title="9. Limitation of Liability">
          <p>To the fullest extent permitted by law, Jamiela Natural Touch is not liable for any indirect, incidental, special, or consequential damages arising from the use of our website, products, or services. Nothing in these Terms excludes liability that cannot legally be excluded.</p>
        </Section>

        <Section title="10. Privacy">
          <p>Your use of our website is also governed by our Privacy Policy, which explains how we collect, use, and protect personal information.</p>
        </Section>

        <Section title="11. Changes to These Terms">
          <p>We may update these Terms from time to time. Any changes will be posted on this page and will take effect once published.</p>
        </Section>

        <Section title="12. Contact Us">
          <p>
            Questions about these Terms: <a href="mailto:info@jamielanaturaltouch.com" className="text-primary hover:underline">info@jamielanaturaltouch.com</a> · WhatsApp:{" "}
            <a href="https://wa.me/2204129401" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+220 412 9401</a>
          </p>
        </Section>
      </div>
    </section>
  </div>
);

export default Terms;
