import { usePageCopy } from "@/hooks/use-page-copy";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, ArrowRight, Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";














const Chip = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
  <Button
    type="button"
    variant="outline"
    aria-pressed={selected}
    onClick={onClick}
    className={`h-auto whitespace-normal justify-start px-4 py-2.5 rounded-full text-sm font-medium border-2 transition-colors text-left ${
      selected
        ? "bg-primary text-primary-foreground border-primary"
        : "border-border bg-card text-foreground hover:border-primary/50"
    }`}
  >
    {children}
  </Button>
);

const Consultation = () => {
  const { t, list } = usePageCopy("consultation");
  const GOALS = list("GOALS");
  const CONCERNS = list("CONCERNS");
  const HAIR_TYPES = list("HAIR_TYPES");
  const THICKNESS = list("THICKNESS");
  const WASH_FREQ = list("WASH_FREQ");
  const PROTECTIVE = list("PROTECTIVE");
  const DRYNESS = list("DRYNESS");
  const CURRENT_PRODUCTS = list("CURRENT_PRODUCTS");
  const DESIRED = list("DESIRED");
  const CONTACT_METHODS = list("CONTACT_METHODS");
  const STEP_TITLES = list("STEP_TITLES");

  const { toast } = useToast();
  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [goals, setGoals] = useState<string[]>{t("text_1")}<string[]>{t("text_2")}<string[]>([]);
  const [routineNotes, setRoutineNotes] = useState("");
  const [desired, setDesired] = useState("");
  const [additional, setAdditional] = useState("");
  const [name, setName] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const toggle = (list: string[], setList: (v: string[]) => void, item: string) =>
    setList(list.includes(item) ? list.filter((i) => i !== item) : [...list, item]);

  const canNext = () => {
    switch (step) {
      case 0: return goals.length > 0;
      case 1: return concerns.length > 0;
      case 2: return hairType !== "" && thickness !== "";
      case 3: return washFreq !== "" && protective !== "" && dryness !== "";
      case 4: return currentProducts.length > 0;
      case 5: return desired !== "";
      case 6: return true;
      case 7: return name.trim().length > 0 && contactMethod !== "" && contactInfo.trim().length > 0;
      default: return true;
    }
  };

  const handleSubmit = async () => {
    if (!canNext() || submitting) return;
    setSubmitting(true);
    const { error } = await supabase.from("consultations").insert({
      name: name.trim().slice(0, 100),
      contact_method: contactMethod,
      contact_info: contactInfo.trim().slice(0, 200),
      goals,
      concerns,
      hair_type: hairType,
      hair_thickness: thickness,
      wash_frequency: washFreq,
      protective_styles: protective,
      dryness_frequency: dryness,
      current_products: currentProducts,
      current_routine_notes: routineNotes.trim().slice(0, 1000) || null,
      desired_routine: desired,
      additional_info: additional.trim().slice(0, 2000) || null,
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Something went wrong", description: "Please try again or reach us on WhatsApp.", variant: "destructive" });
    } else {
      setSubmitted(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[70vh] flex items-center">
        <div className="container mx-auto px-4 max-w-xl text-center py-20">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Check className="text-primary" size={32} />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{t("text_3")}</h1>
          <p className="text-muted-foreground leading-relaxed">{t("text_4")}</p>
        </div>
      </div>
    );
  }

  return (
    <div>
      <section className="py-16 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs tracking-[0.3em] uppercase text-primary font-medium mb-3">{t("text_5")}</p>
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">{t("text_6")}</h1>
          <p className="text-muted-foreground max-w-xl mx-auto">{t("text_7")}</p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 max-w-2xl">
          {/* Progress */}
          <div className="flex items-center gap-2 mb-2">
            {STEP_TITLES.map((_, i) => (
              <div key={i} className={`h-1.5 flex-1 rounded-full transition-colors ${i <= step ? "bg-primary" : "bg-border"}`} />
            ))}
          </div>
          <p className="text-sm text-muted-foreground mb-8">
            Step {step + 1} of 8 — <span className="font-medium text-foreground">{STEP_TITLES[step]}</span>
          </p>

          <div className="bg-card rounded-xl p-6 md:p-8 shadow-botanical">
            {step === 0 && (
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-2">{t("text_8")}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t("text_9")}</p>
                <div className="flex flex-wrap gap-2">
                  {GOALS.map((g) => <Chip key={g} selected={goals.includes(g)} onClick={() => toggle(goals, setGoals, g)}>{g}</Chip>)}
                </div>
              </div>
            )}

            {step === 1 && (
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-2">{t("text_10")}</h2>
                <p className="text-sm text-muted-foreground mb-6">{t("text_11")}</p>
                <div className="flex flex-wrap gap-2">
                  {CONCERNS.map((c) => <Chip key={c} selected={concerns.includes(c)} onClick={() => toggle(concerns, setConcerns, c)}>{c}</Chip>)}
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-semibold mb-4">{t("text_12")}</h2>
                  <div className="flex flex-wrap gap-2">
                    {HAIR_TYPES.map((t) => <Chip key={t} selected={hairType === t} onClick={() => setHairType(t)}>{t}</Chip>)}
                  </div>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold mb-4">{t("text_13")}</h2>
                  <div className="flex flex-wrap gap-2">
                    {THICKNESS.map((t) => <Chip key={t} selected={thickness === t} onClick={() => setThickness(t)}>{t}</Chip>)}
                  </div>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-semibold mb-4">{t("text_14")}</h2>
                  <div className="flex flex-wrap gap-2">
                    {WASH_FREQ.map((t) => <Chip key={t} selected={washFreq === t} onClick={() => setWashFreq(t)}>{t}</Chip>)}
                  </div>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold mb-4">{t("text_15")}</h2>
                  <div className="flex flex-wrap gap-2">
                    {PROTECTIVE.map((t) => <Chip key={t} selected={protective === t} onClick={() => setProtective(t)}>{t}</Chip>)}
                  </div>
                </div>
                <div>
                  <h2 className="font-heading text-2xl font-semibold mb-4">{t("text_16")}</h2>
                  <div className="flex flex-wrap gap-2">
                    {DRYNESS.map((t) => <Chip key={t} selected={dryness === t} onClick={() => setDryness(t)}>{t}</Chip>)}
                  </div>
                </div>
              </div>
            )}

            {step === 4 && (
              <div className="space-y-8">
                <div>
                  <h2 className="font-heading text-2xl font-semibold mb-2">{t("text_17")}</h2>
                  <p className="text-sm text-muted-foreground mb-4">{t("text_18")}</p>
                  <div className="flex flex-wrap gap-2">
                    {CURRENT_PRODUCTS.map((t) => <Chip key={t} selected={currentProducts.includes(t)} onClick={() => toggle(currentProducts, setCurrentProducts, t)}>{t}</Chip>)}
                  </div>
                </div>
                <div>
                  <label className="font-heading text-lg font-semibold block mb-2">{t("text_19")}</label>
                  <textarea
                    value={routineNotes}
                    onChange={(e) => setRoutineNotes(e.target.value)}
                    maxLength={1000}
                    rows={4}
                    placeholder={t("text_29")}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            )}

            {step === 5 && (
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-4">{t("text_20")}</h2>
                <div className="flex flex-wrap gap-2">
                  {DESIRED.map((t) => <Chip key={t} selected={desired === t} onClick={() => setDesired(t)}>{t}</Chip>)}
                </div>
              </div>
            )}

            {step === 6 && (
              <div>
                <h2 className="font-heading text-2xl font-semibold mb-2">{t("text_21")}</h2>
                <p className="text-sm text-muted-foreground mb-4">{t("text_22")}</p>
                <textarea
                  value={additional}
                  onChange={(e) => setAdditional(e.target.value)}
                  maxLength={2000}
                  rows={6}
                  className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            )}

            {step === 7 && (
              <div className="space-y-6">
                <h2 className="font-heading text-2xl font-semibold">{t("text_23")}</h2>
                <div>
                  <label htmlFor="consultation-name" className="text-sm font-medium block mb-2">{t("text_24")}</label>
                  <input
                    id="consultation-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    maxLength={100}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium block mb-2">{t("text_25")}</label>
                  <div className="flex flex-wrap gap-2">
                    {CONTACT_METHODS.map((m) => <Chip key={m} selected={contactMethod === m} onClick={() => setContactMethod(m)}>{m}</Chip>)}
                  </div>
                </div>
                <div>
                  <label htmlFor="consultation-contact" className="text-sm font-medium block mb-2">{t("text_26")}</label>
                  <input
                    id="consultation-contact"
                    type="text"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    maxLength={200}
                    className="w-full rounded-lg border border-input bg-background px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex items-center justify-between mt-10 pt-6 border-t border-border">
              <Button variant="ghost"
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground disabled:opacity-0 transition-opacity"
              >
                <ArrowLeft size={16} />{t("text_27")}</Button>
              {step < 7 ? (
                <Button
                  type="button"
                  onClick={() => canNext() && setStep((s) => s + 1)}
                  disabled={!canNext()}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
                >{t("text_28")}<ArrowRight size={16} />
                </Button>
              ) : (
                <Button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!canNext() || submitting}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-40"
                >
                  <Sparkles size={16} /> {submitting ? "Submitting..." : "Submit My Routine"}
                </Button>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Consultation;
