import { useState } from "react";
import { Link } from "react-router-dom";
import productHairOil from "@/assets/product-hair-oil.jpg";
import productGrowthSerum from "@/assets/product-growth-serum.jpg";
import productHairMist from "@/assets/product-hair-mist.jpg";
import productHairCream from "@/assets/product-hair-cream.jpg";
import productBodyCream from "@/assets/product-body-cream.jpg";

const products = [
  { name: "Hair Oil", price: "D450", image: productHairOil, category: "Hair Care", description: "Nourishing blend of natural oils to strengthen and add shine to your hair.", inStock: true },
  { name: "Growth Serum", price: "D550", image: productGrowthSerum, category: "Hair Care", description: "Powerful herbal serum formulated to stimulate hair growth and reduce breakage.", inStock: true },
  { name: "Herbal Hair Mist", price: "D350", image: productHairMist, category: "Hair Care", description: "Refreshing herbal mist to hydrate and revitalize your hair throughout the day.", inStock: true },
  { name: "Hair Cream", price: "D400", image: productHairCream, category: "Hair Care", description: "Rich moisturizing cream with shea butter for soft, manageable hair.", inStock: true },
  { name: "Body Cream", price: "D500", image: productBodyCream, category: "Body Care", description: "Luxurious coconut-based body cream for silky smooth, hydrated skin.", inStock: true },
];

const categories = ["All", "Hair Care", "Body Care"];

const Shop = () => {
  const [filter, setFilter] = useState("All");
  const filtered = filter === "All" ? products : products.filter((p) => p.category === filter);

  return (
    <div>
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">Our Products</h1>
          <p className="text-muted-foreground">Handcrafted with nature's finest ingredients</p>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          {/* Filters */}
          <div className="flex justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                  filter === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground hover:bg-primary/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filtered.map((product) => (
              <div key={product.name} className="group bg-card rounded-xl overflow-hidden shadow-botanical hover:shadow-lg transition-shadow">
                <div className="aspect-square overflow-hidden bg-muted relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  {product.inStock ? (
                    <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">In Stock</span>
                  ) : (
                    <span className="absolute top-3 left-3 bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full">Out of Stock</span>
                  )}
                </div>
                <div className="p-5">
                  <span className="text-xs font-medium text-primary uppercase tracking-wider">{product.category}</span>
                  <h3 className="font-heading text-xl font-semibold mt-1">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mt-2">{product.description}</p>
                  <p className="text-primary font-bold text-lg mt-3">{product.price}</p>
                  <div className="flex gap-2 mt-4">
                    <Link
                      to="/request"
                      className="flex-1 bg-primary text-primary-foreground text-center py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
                    >
                      Request
                    </Link>
                    <a
                      href={`https://wa.me/2204129401?text=Hi! I'd like to order ${product.name}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 border border-primary text-primary text-center py-2.5 rounded-full text-sm font-medium hover:bg-primary hover:text-primary-foreground transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
