import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

type Consultation = Tables<"consultations">;

export default function ConsultationManager({ consultations, onRefresh }: { consultations: Consultation[]; onRefresh: () => void }) {
  const { toast } = useToast();
  const [saving, setSaving] = useState<string | null>(null);

  const updateStatus = async (id: string, status: string) => {
    setSaving(id);
    const { error } = await supabase.from("consultations").update({ status }).eq("id", id);
    setSaving(null);
    if (error) {
      toast({ title: "Could not update consultation", description: "Please try again.", variant: "destructive" });
      return;
    }
    toast({ title: "Consultation updated" });
    onRefresh();
  };

  return (
    <section className="space-y-4">
      <h2 className="font-heading text-2xl font-semibold">Hair Consultations ({consultations.length})</h2>
      {consultations.length === 0 && <p className="text-muted-foreground py-8">No consultations received yet.</p>}
      {consultations.map((consultation) => (
        <article key={consultation.id} className="bg-card border border-border rounded-lg p-5">
          <div className="flex flex-wrap justify-between gap-4">
            <div className="min-w-0">
              <h3 className="font-heading text-xl font-semibold break-words">{consultation.name}</h3>
              <p className="text-sm text-muted-foreground break-words">{consultation.contact_method}: {consultation.contact_info}</p>
              <p className="text-xs text-muted-foreground mt-1">{new Date(consultation.created_at).toLocaleString()}</p>
            </div>
            <label className="text-sm font-medium flex items-center gap-2">
              Status
              <select className="border border-input rounded-md bg-background p-2" value={consultation.status} disabled={saving === consultation.id} onChange={(event) => updateStatus(consultation.id, event.target.value)}>
                {[...new Set(["New", "Reviewed", "Completed", consultation.status])].map((status) => <option key={status}>{status}</option>)}
              </select>
            </label>
          </div>
          <details className="mt-4 border-t border-border pt-4">
            <summary className="cursor-pointer text-primary font-medium">View hair story</summary>
            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 text-sm">
              {[
                ["Goals", consultation.goals.join(", ")],
                ["Concerns", consultation.concerns.join(", ")],
                ["Hair type", consultation.hair_type],
                ["Thickness", consultation.hair_thickness],
                ["Wash frequency", consultation.wash_frequency],
                ["Protective styles", consultation.protective_styles],
                ["Dryness frequency", consultation.dryness_frequency],
                ["Current products", consultation.current_products.join(", ")],
                ["Current routine", consultation.current_routine_notes],
                ["Desired routine", consultation.desired_routine],
                ["Additional information", consultation.additional_info],
              ].map(([label, value]) => (
                <div key={label} className="min-w-0"><dt className="font-medium">{label}</dt><dd className="text-muted-foreground whitespace-pre-wrap break-words mt-1">{value || "Not provided"}</dd></div>
              ))}
            </dl>
          </details>
          <Button asChild variant="link" className="px-0 mt-3"><a href="https://wa.me/2204129401" target="_blank" rel="noopener noreferrer">JNT WhatsApp</a></Button>
        </article>
      ))}
    </section>
  );
}