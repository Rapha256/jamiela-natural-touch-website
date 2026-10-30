import { Button } from "@/components/ui/button";
import { usePageCopy } from "@/hooks/use-page-copy";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { MapPin, Phone, Mail } from "lucide-react";

const Contact = () => {
  const { t, list } = usePageCopy("contact");
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }
    setSubmitting(true);

    const { error } = await supabase.from("contact_messages").insert({
      name: form.name,
      email: form.email,
      message: form.message,
    });

    if (error) {
      toast({ title: "Error sending message", description: error.message, variant: "destructive" });
      setSubmitting(false);
      return;
    }

    toast({ title: "Message sent!", description: "We'll get back to you soon." });
    setForm({ name: "", email: "", message: "" });
    setSubmitting(false);
  };

  return (
    <div>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{t("text_1")}</h1>
          <p className="text-muted-foreground">{t("text_2")}</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="space-y-8">
              <div>
                <h2 className="font-heading text-2xl font-bold mb-4">{t("text_3")}</h2>
                <div className="space-y-4 text-muted-foreground">
                  <div className="flex items-center gap-3">
                    <MapPin className="text-primary flex-shrink-0" size={20} />
                    <span>{t("text_4")}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="text-primary flex-shrink-0" size={20} />
                    <a href={t("whatsapp_url")} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">{t("text_5")}</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="text-primary flex-shrink-0" size={20} />
                    <span>{t("text_6")}</span>
                  </div>
                </div>
              </div>

              <div className="bg-primary/5 rounded-xl p-6">
                <h3 className="font-heading text-lg font-semibold mb-2">{t("text_7")}</h3>
                <p className="text-sm text-muted-foreground mb-4">{t("text_8")}</p>
                <a
                  href={t("whatsapp_url")}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                >{t("text_9")}</a>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="bg-card rounded-xl shadow-botanical p-8 space-y-5">
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("text_10")}</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  maxLength={100}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("text_11")}</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  required
                  maxLength={255}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1.5">{t("text_12")}</label>
                <textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  rows={5}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                  required
                  maxLength={1000}
                />
              </div>
              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-primary text-primary-foreground py-3.5 rounded-full font-medium hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {submitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
