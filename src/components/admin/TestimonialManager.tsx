import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, X, Upload, Image, Video } from "lucide-react";

interface Testimonial {
  id: string;
  name: string;
  text: string;
  rating: number;
  country: string | null;
  image_url: string | null;
  video_url: string | null;
}

interface Props {
  testimonials: Testimonial[];
  onRefresh: () => void;
}

const TestimonialManager = ({ testimonials, onRefresh }: Props) => {
  const { toast } = useToast();
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ name: "", text: "", rating: 5, country: "" });
  const [mediaFile, setMediaFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  const uploadMedia = async (file: File): Promise<{ image_url: string | null; video_url: string | null }> => {
    const ext = file.name.split(".").pop()?.toLowerCase() || "";
    const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
    
    const { error } = await supabase.storage.from("testimonial-media").upload(fileName, file);
    if (error) throw error;
    
    const { data: { publicUrl } } = supabase.storage.from("testimonial-media").getPublicUrl(fileName);
    
    const videoExts = ["mp4", "mov", "mpeg", "avi", "webm", "mkv", "m4v", "mp3", "wav", "ogg", "m4a"];
    if (videoExts.includes(ext)) {
      return { image_url: null, video_url: publicUrl };
    }
    return { image_url: publicUrl, video_url: null };
  };

  const add = async () => {
    if (!form.name || !form.text) { toast({ title: "Name and text required", variant: "destructive" }); return; }
    
    setUploading(true);
    try {
      let mediaUrls = { image_url: null as string | null, video_url: null as string | null };
      if (mediaFile) {
        mediaUrls = await uploadMedia(mediaFile);
      }
      
      const { error } = await supabase.from("testimonials").insert({
        name: form.name,
        text: form.text,
        rating: form.rating,
        country: form.country || null,
        image_url: mediaUrls.image_url,
        video_url: mediaUrls.video_url,
      });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Testimonial added" });
      setForm({ name: "", text: "", rating: 5, country: "" });
      setMediaFile(null);
      setAdding(false);
      onRefresh();
    } catch (err: any) {
      toast({ title: "Upload error", description: err.message, variant: "destructive" });
    } finally {
      setUploading(false);
    }
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
        <div className="fixed inset-0 bg-foreground/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-lg font-semibold">Add Testimonial</h3>
              <button onClick={() => { setAdding(false); setMediaFile(null); }}><X size={20} /></button>
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
              
              {/* Media Upload */}
              <div>
                <label className="block text-sm font-medium mb-1.5">Photo or Video (optional)</label>
                <label className="flex items-center gap-2 cursor-pointer border-2 border-dashed border-input rounded-lg p-4 hover:border-primary transition-colors">
                  <Upload size={20} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {mediaFile ? mediaFile.name : "Upload image, video, or screenshot"}
                  </span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*,video/*,audio/*,.heic,.heif,.webp,.mp4,.mov,.mpeg,.avi,.mkv,.mp3,.wav,.ogg"
                    onChange={(e) => setMediaFile(e.target.files?.[0] || null)}
                  />
                </label>
                {mediaFile && (
                  <button onClick={() => setMediaFile(null)} className="text-xs text-destructive mt-1">Remove file</button>
                )}
              </div>

              <button onClick={add} disabled={uploading}
                className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium disabled:opacity-50">
                {uploading ? "Uploading..." : "Add Testimonial"}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="divide-y divide-border">
        {testimonials.map(t => (
          <div key={t.id} className="p-4 flex justify-between items-start gap-3">
            {/* Thumbnail */}
            {(t.image_url || t.video_url) && (
              <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-muted">
                {t.video_url ? (
                  <div className="w-full h-full flex items-center justify-center bg-muted">
                    <Video size={20} className="text-muted-foreground" />
                  </div>
                ) : t.image_url ? (
                  <img src={t.image_url} alt="" className="w-full h-full object-cover" />
                ) : null}
              </div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-medium">{t.name} <span className="text-xs text-muted-foreground">({t.country})</span></p>
              <p className="text-sm text-muted-foreground mt-1 truncate">{"⭐".repeat(t.rating)} — {t.text}</p>
              {t.video_url && <span className="text-xs text-primary">🎥 Video</span>}
              {t.image_url && <span className="text-xs text-primary">📷 Photo</span>}
            </div>
            <button onClick={() => remove(t.id)} className="p-1.5 hover:bg-accent/10 rounded text-accent flex-shrink-0"><Trash2 size={14} /></button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialManager;
