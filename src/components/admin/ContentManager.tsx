import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Save, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { usePageCopy } from "@/hooks/use-page-copy";
import { pageDefaults, pageNames, type PageCopy, type PageId } from "@/lib/page-copy";

export default function ContentManager() {
  const [page, setPage] = useState<PageId>("home");
  const { copy, isLoading, isError } = usePageCopy(page);
  const [draft, setDraft] = useState<PageCopy>({});
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();
  useEffect(() => { setDraft(copy); }, [copy]);
  const save = async () => {
    if (Object.values(draft).some(value => Array.isArray(value) && !value.length)) {
      toast({ title: "Please keep at least one option in each list", variant: "destructive" }); return;
    }
    setSaving(true);
    const { error } = await supabase.from("site_content").upsert({ id: `page_${page}`, content: draft });
    setSaving(false);
    if (error) { toast({ title: "Could not save content", description: error.message, variant: "destructive" }); return; }
    await queryClient.invalidateQueries({ queryKey: ["page-copy", page] });
    toast({ title: `${pageNames[page]} updated` });
  };
  const upload = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    const path = `banner-${crypto.randomUUID()}.${file.name.split(".").pop() || "jpg"}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    else {
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setDraft(previous => ({ ...previous, hero_image: data.publicUrl }));
    }
    setUploading(false);
  };
  return <section className="max-w-4xl mx-auto">
    <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
      <h2 className="font-heading text-2xl font-semibold">Website Content</h2>
      <Button onClick={save} disabled={saving || uploading || isLoading || isError}><Save size={16} />{saving ? "Saving…" : "Save Changes"}</Button>
    </div>
    <label htmlFor="content-page" className="block text-sm font-medium mb-2">Page</label>
    <select id="content-page" value={page} onChange={event => setPage(event.target.value as PageId)} className="w-full border border-input rounded-lg bg-background p-3 mb-6">
      {Object.entries(pageNames).map(([id, name]) => <option key={id} value={id}>{name}</option>)}
    </select>
    {isLoading ? <p>Loading…</p> : isError ? <p className="text-destructive">Content could not be loaded. Please try again.</p> : <div className="space-y-5">
      {Object.entries(pageDefaults[page]).map(([key, fallback]) => <div key={`${page}-${key}`}>
        <label htmlFor={`copy-${key}`} className="block text-sm font-medium mb-2 break-words">{key === "hero_image" ? "Homepage Banner" : key === "hero_title" ? "Banner Description" : key === "whatsapp_url" ? "WhatsApp Link" : key.startsWith("text_") ? String(fallback).slice(0, 100) : key.replaceAll("_", " ")}</label>
        {key === "hero_image" ? <div>
          <img src={String(draft[key] || fallback)} alt="Homepage banner" className="w-full aspect-video object-contain bg-muted mb-3" />
          <Button asChild variant="outline"><label><Upload size={16}/>{uploading ? "Uploading…" : "Replace Banner"}<input aria-label="Replace Banner" type="file" accept="image/*" className="hidden" disabled={uploading} onChange={e => upload(e.target.files?.[0])}/></label></Button>
        </div> : <textarea id={`copy-${key}`} rows={Array.isArray(fallback) ? 5 : String(fallback).length > 160 ? 4 : 2} value={Array.isArray(draft[key]) ? (draft[key] as string[]).join("\n") : String(draft[key] ?? fallback)} onChange={event => setDraft(previous => ({ ...previous, [key]: Array.isArray(fallback) ? event.target.value.split("\n") : event.target.value }))} className="w-full border border-input rounded-lg bg-background px-3 py-2 text-sm"/>}
      </div>)}
    </div>}
  </section>;
}