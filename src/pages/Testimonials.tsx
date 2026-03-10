import { useState, useEffect } from "react";
import { Star, Play, X, Image as ImageIcon, Video } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lightbox, setLightbox] = useState<{ type: "image" | "video"; url: string } | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase.from("testimonials").select("*").order("created_at", { ascending: false });
      setTestimonials(data || []);
      setLoading(false);
    };
    fetch();
  }, []);

  const isVideo = (url: string) => /\.(mp4|mov|mpeg|avi|webm|mkv|m4v)$/i.test(url);

  return (
    <div>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">What Our Customers Say</h1>
          <p className="text-muted-foreground">Real reviews from real people who love our products</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          {loading ? (
            <p className="text-center text-muted-foreground">Loading...</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {testimonials.map((t) => (
                <div key={t.id} className="bg-card rounded-xl overflow-hidden shadow-botanical flex flex-col">
                  {/* Media Section */}
                  {(t.image_url || t.video_url) && (
                    <div
                      className="relative cursor-pointer group"
                      onClick={() => {
                        if (t.video_url) setLightbox({ type: "video", url: t.video_url });
                        else if (t.image_url) setLightbox({ type: "image", url: t.image_url });
                      }}
                    >
                      {t.video_url ? (
                        <div className="relative aspect-[4/3] bg-muted">
                          <video
                            src={t.video_url}
                            className="w-full h-full object-cover"
                            muted
                            preload="metadata"
                          />
                          <div className="absolute inset-0 flex items-center justify-center bg-foreground/20 group-hover:bg-foreground/30 transition-colors">
                            <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center shadow-lg">
                              <Play size={24} className="text-primary-foreground ml-1" />
                            </div>
                          </div>
                        </div>
                      ) : t.image_url ? (
                        <div className="aspect-[4/3] bg-muted">
                          <img
                            src={t.image_url}
                            alt={`Review by ${t.name}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      ) : null}
                    </div>
                  )}

                  {/* Text Section */}
                  <div className="p-5 flex flex-col flex-1">
                    <div className="flex gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <Star key={j} size={16} className={j < t.rating ? "text-gold fill-gold" : "text-muted"} />
                      ))}
                    </div>
                    <p className="text-muted-foreground italic leading-relaxed text-sm flex-1">"{t.text}"</p>
                    <div className="mt-4 pt-3 border-t border-border">
                      <p className="font-heading font-semibold text-sm">{t.name}</p>
                      {t.country && <p className="text-xs text-muted-foreground">{t.country}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 bg-foreground/80 z-50 flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <button className="absolute top-4 right-4 text-background hover:text-background/80 z-10" onClick={() => setLightbox(null)}>
            <X size={32} />
          </button>
          <div className="max-w-3xl max-h-[85vh] w-full" onClick={(e) => e.stopPropagation()}>
            {lightbox.type === "video" ? (
              <video src={lightbox.url} controls autoPlay className="w-full max-h-[85vh] rounded-lg" />
            ) : (
              <img src={lightbox.url} alt="Testimonial" className="w-full max-h-[85vh] object-contain rounded-lg" />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Testimonials;
