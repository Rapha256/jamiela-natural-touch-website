const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h2 className="font-heading text-2xl font-bold text-foreground">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </div>
);

const Returns = () => (
  <div>
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Returns, Refunds &amp; Order Issues</h1>
        <p className="text-muted-foreground">Please read carefully before placing an order</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl space-y-10">
        <div className="bg-accent/10 border border-accent/30 rounded-xl p-6">
          <p className="font-heading text-xl font-semibold text-foreground">
            At Jamiela Natural Touch (JNT), all purchases are final.
          </p>
          <p className="text-muted-foreground mt-2">
            We do not offer returns, refunds, or exchanges for change of mind, personal preference, or dissatisfaction with a product.
            Please read product descriptions, ingredients, and usage directions carefully before placing an order.
          </p>
        </div>

        <Section title="Damaged or Incorrect Items">
          <p>If your order arrives damaged, incorrect, or incomplete, contact us within 48 hours of delivery with:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Your order details</li>
            <li>Clear photos of the item and packaging</li>
            <li>A brief description of the issue</li>
          </ul>
          <p>We will review the issue and determine the appropriate resolution at our discretion.</p>
        </Section>

        <Section title="When a Refund or Replacement May Be Considered">
          <p>A refund, replacement, or other resolution may be considered only if:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>The wrong item was sent</li>
            <li>The item arrived damaged</li>
            <li>The order was incomplete</li>
          </ul>
          <p>Any approved resolution will depend on the circumstances and supporting evidence provided.</p>
        </Section>

        <Section title="Delivery Delays and Courier Issues">
          <p>Once an order has been dispatched, delivery delays caused by couriers, customs, weather, or other external factors are outside our control. We will assist where reasonably possible, but we are not responsible for delays caused by third-party delivery services.</p>
        </Section>

        <Section title="Incorrect Address or Failed Delivery">
          <p>Customers are responsible for providing accurate shipping information. We are not responsible for orders delayed, lost, or returned due to an incorrect or incomplete address provided by the customer.</p>
        </Section>

        <Section title="Order Cancellation">
          <p>Orders may not be cancelled once they have been processed or dispatched.</p>
        </Section>

        <Section title="Contact Us">
          <p>
            To report an order issue, contact us at <a href="mailto:info@jamielanaturaltouch.com" className="text-primary hover:underline">info@jamielanaturaltouch.com</a> or WhatsApp{" "}
            <a href="https://wa.me/2204129401" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+220 412 9401</a> within 48 hours of delivery.
          </p>
        </Section>
      </div>
    </section>
  </div>
);

export default Returns;
