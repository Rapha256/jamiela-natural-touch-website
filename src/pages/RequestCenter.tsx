import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const products = ["Hair Oil", "Growth Serum", "Herbal Hair Mist", "Hair Cream", "Body Cream"];

const RequestCenter = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({
    product: "",
    quantity: 1,
    fullName: "",
    country: "",
    phone: "",
    address: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.product || !form.fullName || !form.country || !form.phone || !form.address) {
      toast({ title: "Please fill all required fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    // Send WhatsApp notification
    const message = `New Order Request!\n\nProduct: ${form.product}\nQty: ${form.quantity}\nName: ${form.fullName}\nCountry: ${form.country}\nPhone: ${form.phone}\nAddress: ${form.address}\nNotes: ${form.notes || "N/A"}`;
    window.open(`https://wa.me/2204129401?text=${encodeURIComponent(message)}`, "_blank");

    toast({ title: "Request sent!", description: "We'll get back to you shortly via WhatsApp." });
    setForm({ product: "", quantity: 1, fullName: "", country: "", phone: "", address: "", notes: "" });
    setSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Request Center</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Fill in the form below to place your order. We'll confirm via WhatsApp.
          </p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-botanical p-8 space-y-6">
            <div>
              <label className="block text-sm font-medium mb-1.5">Product *</label>
              <select
                name="product"
                value={form.product}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                required
              >
                <option value="">Select a product</option>
                {products.map((p) => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Quantity *</label>
              <input
                type="number"
                name="quantity"
                min={1}
                value={form.quantity}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Full Name *</label>
              <input
                type="text"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                required
                maxLength={100}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1.5">Country *</label>
                <input
                  type="text"
                  name="country"
                  value={form.country}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  maxLength={20}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Delivery Address *</label>
              <textarea
                name="address"
                value={form.address}
                onChange={handleChange}
                rows={3}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                required
                maxLength={500}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1.5">Notes (optional)</label>
              <textarea
                name="notes"
                value={form.notes}
                onChange={handleChange}
                rows={2}
                className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                maxLength={500}
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {submitting ? "Sending..." : "Submit Request"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default RequestCenter;
