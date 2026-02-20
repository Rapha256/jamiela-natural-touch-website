import { MapPin, Truck, Globe } from "lucide-react";

const Delivery = () => (
  <div>
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4 text-center">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Delivery Information</h1>
        <p className="text-muted-foreground">We bring nature's best to your doorstep</p>
      </div>
    </section>

    <section className="py-16">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: MapPin, title: "Based in Sukuta", desc: "Our products are handcrafted in Sukuta, The Gambia." },
            { icon: Globe, title: "Worldwide Delivery", desc: "We deliver anywhere in the world upon request." },
            { icon: Truck, title: "Cost Estimate", desc: "Delivery cost depends on location and order quantity." },
          ].map(({ icon: Icon, title, desc }) => (
            <div key={title} className="bg-card rounded-xl p-6 shadow-botanical text-center">
              <Icon className="text-primary mx-auto mb-3" size={36} />
              <h3 className="font-heading text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-8 shadow-botanical space-y-4 text-muted-foreground">
          <h2 className="font-heading text-2xl font-bold text-foreground">How It Works</h2>
          <ol className="list-decimal list-inside space-y-3">
            <li>Browse our products and choose what you'd like.</li>
            <li>Send a request through our website or WhatsApp.</li>
            <li>We'll confirm availability and calculate delivery cost.</li>
            <li>Once confirmed, we'll prepare and ship your order.</li>
            <li>You'll receive tracking info and delivery updates via WhatsApp.</li>
          </ol>
          <p className="pt-4">
            For questions about delivery, reach us at{" "}
            <a href="https://wa.me/2204129401" target="_blank" rel="noopener noreferrer" className="text-primary font-medium hover:underline">
              +220 412 9401
            </a>{" "}
            on WhatsApp.
          </p>
        </div>
      </div>
    </section>
  </div>
);

export default Delivery;
