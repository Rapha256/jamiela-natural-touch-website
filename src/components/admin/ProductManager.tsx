import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Plus, Pencil, Trash2, Upload, X } from "lucide-react";

interface Product {
  id: string;
  name: string;
  category: string;
  price: string;
  description: string | null;
  image_url: string | null;
  in_stock: boolean;
}

interface Props {
  products: Product[];
  onRefresh: () => void;
}

const emptyProduct = { name: "", category: "Hair Care", price: "", description: "", image_url: "", in_stock: true };

const ProductManager = ({ products, onRefresh }: Props) => {
  const { toast } = useToast();
  const [editing, setEditing] = useState<Partial<Product> | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [uploading, setUploading] = useState(false);

  const openNew = () => { setEditing({ ...emptyProduct }); setIsNew(true); };
  const openEdit = (p: Product) => { setEditing({ ...p }); setIsNew(false); };
  const close = () => { setEditing(null); setIsNew(false); };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editing) return;
    setUploading(true);
    
    // Generate unique filename preserving original extension
    const ext = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const path = `${Date.now()}-${Math.random().toString(36).substring(2)}.${ext}`;
    
    const { error } = await supabase.storage.from("product-images").upload(path, file, {
      contentType: file.type,
      cacheControl: "3600",
    });
    
    if (error) {
      toast({ title: "Upload failed", description: error.message, variant: "destructive" });
    } else {
      const { data } = supabase.storage.from("product-images").getPublicUrl(path);
      setEditing({ ...editing, image_url: data.publicUrl });
    }
    setUploading(false);
  };

  const save = async () => {
    if (!editing?.name || !editing?.price) {
      toast({ title: "Name and price are required", variant: "destructive" });
      return;
    }
    if (isNew) {
      const { error } = await supabase.from("products").insert({
        name: editing.name,
        category: editing.category || "Hair Care",
        price: editing.price,
        description: editing.description || null,
        image_url: editing.image_url || null,
        in_stock: editing.in_stock ?? true,
      });
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Product added" });
    } else {
      const { error } = await supabase.from("products").update({
        name: editing.name,
        category: editing.category,
        price: editing.price,
        description: editing.description,
        image_url: editing.image_url,
        in_stock: editing.in_stock,
      }).eq("id", editing.id!);
      if (error) { toast({ title: "Error", description: error.message, variant: "destructive" }); return; }
      toast({ title: "Product updated" });
    }
    close();
    onRefresh();
  };

  const remove = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    toast({ title: "Product deleted" });
    onRefresh();
  };

  return (
    <div className="bg-card rounded-xl shadow-botanical overflow-hidden">
      <div className="p-4 border-b border-border flex items-center justify-between">
        <h2 className="font-heading text-lg font-semibold">Products ({products.length})</h2>
        <button onClick={openNew} className="flex items-center gap-1 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
          <Plus size={16} /> Add Product
        </button>
      </div>

      {/* Modal */}
      {editing && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-card rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-heading text-lg font-semibold">{isNew ? "Add Product" : "Edit Product"}</h3>
              <button onClick={close}><X size={20} /></button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input value={editing.name || ""} onChange={e => setEditing({ ...editing, name: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <select value={editing.category || "Hair Care"} onChange={e => setEditing({ ...editing, category: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm">
                  <option>Hair Care</option>
                  <option>Body Care</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Price *</label>
                <input value={editing.price || ""} onChange={e => setEditing({ ...editing, price: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" placeholder="D450" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Description</label>
                <textarea value={editing.description || ""} onChange={e => setEditing({ ...editing, description: e.target.value })}
                  className="w-full rounded-lg border border-input bg-background px-3 py-2 text-sm" rows={3} />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Product Image / Video</label>
                {editing.image_url && (
                  editing.image_url.match(/\.(mp4|mov|avi|webm|mkv)$/i) ? (
                    <video src={editing.image_url} className="w-32 h-24 object-cover rounded-lg mb-2" controls muted />
                  ) : (
                    <img src={editing.image_url} alt="" className="w-24 h-24 object-cover rounded-lg mb-2" />
                  )
                )}
                <label className="flex items-center gap-2 cursor-pointer text-sm text-primary">
                  <Upload size={16} /> {uploading ? "Uploading..." : "Upload Image / Video"}
                  <input type="file" accept="image/*,video/*" onChange={handleImageUpload} className="hidden" />
                </label>
                <p className="text-xs text-muted-foreground mt-1">Supports all image & video formats (JPG, PNG, HEIC, WebP, MP4, MOV, etc.)</p>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" checked={editing.in_stock ?? true} onChange={e => setEditing({ ...editing, in_stock: e.target.checked })}
                  className="rounded" />
                <label className="text-sm">In Stock</label>
              </div>
              <button onClick={save} className="w-full bg-primary text-primary-foreground py-3 rounded-full font-medium">
                {isNew ? "Add Product" : "Save Changes"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-muted">
            <tr>
              <th className="text-left p-3 font-medium">Image</th>
              <th className="text-left p-3 font-medium">Name</th>
              <th className="text-left p-3 font-medium">Category</th>
              <th className="text-left p-3 font-medium">Price</th>
              <th className="text-left p-3 font-medium">Stock</th>
              <th className="text-left p-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id} className="border-t border-border">
                <td className="p-3">
                  {p.image_url ? (
                    p.image_url.match(/\.(mp4|mov|avi|webm|mkv)$/i) ? (
                      <video src={p.image_url} className="w-10 h-10 object-cover rounded" muted />
                    ) : (
                      <img src={p.image_url} alt={p.name} className="w-10 h-10 object-cover rounded" />
                    )
                  ) : (
                    <div className="w-10 h-10 bg-muted rounded flex items-center justify-center text-xs text-muted-foreground">N/A</div>
                  )}
                </td>
                <td className="p-3 font-medium">{p.name}</td>
                <td className="p-3 text-muted-foreground">{p.category}</td>
                <td className="p-3">{p.price}</td>
                <td className="p-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${p.in_stock ? "bg-primary/10 text-primary" : "bg-accent/10 text-accent"}`}>
                    {p.in_stock ? "In Stock" : "Out of Stock"}
                  </span>
                </td>
                <td className="p-3">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(p)} className="p-1.5 hover:bg-muted rounded"><Pencil size={14} /></button>
                    <button onClick={() => remove(p.id)} className="p-1.5 hover:bg-accent/10 rounded text-accent"><Trash2 size={14} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManager;
