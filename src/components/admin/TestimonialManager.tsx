import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, X } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  country: string | null;
}

interface Props {
  testimonials: Testimonial[];
  onRefresh: () => void;
}

const TestimonialManager = ({ testimonials, onRefresh }: Props) => {
  const { toast } = useToast();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", text: "", rating: 5, country: "" });

  const add = async () => {
    if (!form.name || !form.text) { toast({ title: "Name and text required", variant: "destructive" }); return; }
    const { error } = await supabase.from("testimonials").insert({
      name: form.name, text: form.text, rating: form.rating, country: form.country || null,
    });
    if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
    toast({ title: "Testimonial added" });
    setForm({ name: "", text: "", rating: 5, country: "" });
    setAdding(false);
    onRefresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    await supabase.from("testimonials").delete().eq("id", id);
    toast({ title: "Deleted" });
    onRefresh();
  };

  return (
    <div className="bg-card rounded-xl shadow-botanical overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold">Testimonials ({testimonials.length})</h2>
        <button onClick={() => setAdding(true)} className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
          <Plus size={16} /> Add
        </button>
      </div>

      {adding && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-lg font-semibold">Add Testimonial</h3>
              <button onClick={() => setAdding(false)}><X size={20} /></button>
            </div>
            <div className="space-y-3">
              <input placeholder="Customer name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <input placeholder="Country" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              <select value={form.rating} onChange={e => setForm({ ...form, rating: Number(e.target.value) })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Stars</option>)}
              </select>
              <textarea placeholder="Testimonial text" value={form.text} onChange={e => setForm({ ...form, text: e.target.value })}
                className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" rows={3} />
              <button onClick={add} className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium">Add Testimonial</button>
            </div>
          </div>
        </div>
      )}

      <div className="divide-y divide-border">
        {testimonials.map(t => (
          <div key={t.id} className="p-4 flex justify-between items-start">
            <div>
              <p className="font-medium">{t.name} <span className="text-xs text-muted-foreground">({t.country})</span></p>
              <p className="text-sm text-muted-foreground mt-1">{"⭐".repeat(t.rating)} — {t.text}</p>
            </div>
            <button onClick={() => remove(t.id)} className="p-1.5 hover:bg-accent/10 rounded text-accent"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialManager;
