const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <h2 className="font-heading text-2xl font-bold text-foreground">{title}</h2>
    <div className="text-muted-foreground leading-relaxed space-y-3">{children}</div>
  </div>
);

const Privacy = () => (
  <div>
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Privacy Policy</h1>
        <p className="text-muted-foreground">Last updated: 2026</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl space-y-10">
        <Section title="1. Information We Collect">
          <p>We may collect the following personal information when you use our website, place an order, submit a form, or contact us:</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Full name</li>
            <li>Email address</li>
            <li>Phone number (including WhatsApp number)</li>
            <li>Shipping and billing address</li>
            <li>Order details and purchase history</li>
            <li>Hair consultation responses</li>
            <li>Payment-related information (processed securely by our payment provider — we do not store card details)</li>
          </ul>
        </Section>

        <Section title="2. How We Use Your Information">
          <ul className="list-disc list-inside space-y-1">
            <li>Process and fulfill orders</li>
            <li>Communicate about orders, deliveries, and support requests</li>
            <li>Provide personalized hair care recommendations</li>
            <li>Improve our products, services, and website experience</li>
            <li>Send updates, offers, and product announcements (only if you have opted in)</li>
            <li>Meet legal, tax, and accounting obligations</li>
          </ul>
        </Section>

        <Section title="3. Sharing Your Information">
          <p>We do not sell your personal information. We may share it only with trusted service providers who help us operate our business, such as payment processors, delivery/courier services, and website or communication tools — only to the extent necessary to provide their services.</p>
        </Section>

        <Section title="4. Data Security">
          <p>We take reasonable steps to protect your personal information from unauthorized access, misuse, loss, or disclosure. However, no online transmission or storage system is completely secure.</p>
        </Section>

        <Section title="5. Data Retention">
          <p>We keep personal information only as long as necessary for the purposes described in this policy, including order processing, customer support, legal compliance, and business record-keeping.</p>
        </Section>

        <Section title="6. Your Rights">
          <p>You may request access to, correction of, or deletion of your personal information, subject to applicable law. You may also opt out of marketing communications at any time. To make a request, contact us at <a href="mailto:info@jamielanaturaltouch.com" className="text-primary hover:underline">info@jamielanaturaltouch.com</a>.</p>
        </Section>

        <Section title="7. Cookies and Website Data">
          <p>Our website may use cookies or similar technologies to improve functionality, understand site usage, and enhance your browsing experience. You can control cookies through your browser settings.</p>
        </Section>

        <Section title="8. Third-Party Links">
          <p>Our website may contain links to third-party websites or platforms. We are not responsible for their privacy practices or content.</p>
        </Section>

        <Section title="9. Children's Privacy">
          <p>Our website and services are not directed to children under 13, and we do not knowingly collect personal information from children without appropriate consent.</p>
        </Section>

        <Section title="10. Changes to This Policy">
          <p>We may update this Privacy Policy from time to time. Any updates will be posted on this page with a revised effective date.</p>
        </Section>

        <Section title="11. Contact Us">
          <p>
            Questions about this policy: <a href="mailto:info@jamielanaturaltouch.com" className="text-primary hover:underline">info@jamielanaturaltouch.com</a> · WhatsApp:{" "}
            <a href="https://wa.me/2204129401" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">+220 412 9401</a>
          </p>
        </Section>
      </div>
    </section>
  </div>
);

export default Privacy;
