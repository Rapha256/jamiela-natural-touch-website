import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import type { Tables } from "@/integrations/supabase/types";
import { isHairProduct, productDescription } from "@/lib/hair-products";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Tables<"products"> | null>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let active = true;
    const load = async () => {
      if (!id) return;
      const { data } = await supabase.from("products").select("*").eq("id", id).maybeSingle();
      if (active) { setProduct(data && isHairProduct(data) ? data : null); setLoading(false); }
    };
    load(); return () => { active = false; };
  }, [id]);
  if (loading) return <p className="container py-20 text-muted-foreground">Loading…</p>;
  if (!product) return <div className="container py-20"><h1 className="text-3xl mb-6">Product unavailable</h1><Button asChild><Link to="/shop">Back to Shop</Link></Button></div>;
  return <article className="container mx-auto px-4 py-10">
    <Button asChild variant="ghost" className="mb-8"><Link to="/shop"><ArrowLeft size={16}/>Shop</Link></Button>
    <div className="grid md:grid-cols-2 gap-10 items-start">
      <div className="aspect-square bg-muted">
        {product.image_url && <img src={product.image_url} alt={product.name} className="w-full h-full object-contain"/>}
      </div>
      <div>
        <p className="text-primary text-sm mb-3">{product.category}</p>
        <h1 className="font-heading text-4xl font-bold mb-4">{product.name}</h1>
        <p className="text-primary text-xl font-semibold mb-2">{product.price}</p>
        <p className="text-sm text-muted-foreground mb-6">{product.in_stock ? "In Stock" : "Out of Stock"}</p>
        <div className="flex flex-wrap gap-3 mb-10">
          <Button asChild><Link to={`/request?product=${encodeURIComponent(product.name)}`}>Request</Link></Button>
          <Button asChild variant="outline"><a href={`https://wa.me/2204129401?text=${encodeURIComponent(`Hi! I'd like to order ${product.name}`)}`} target="_blank" rel="noopener noreferrer">Order via WhatsApp</a></Button>
        </div>
        <div className="text-muted-foreground whitespace-pre-line leading-relaxed">{productDescription(product)}</div>
      </div>
    </div>
  </article>;
}