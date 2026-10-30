import productCopy from "./hair-product-copy.json";

export const hairCategories = ["Hair Care", "Shampoos", "Conditioners", "Hair Creams", "Hair Mists", "Hair Serums", "Hair Oils", "Hair Butters", "Hair Grease"];
export function isHairProduct(product: { name: string; category: string }) {
  return !/\bbody\b/i.test(`${product.name} ${product.category}`);
}
export function productDescription(product: { name: string; description: string | null }) {
  return product.description ?? productCopy.find(item => item.name.toLowerCase() === product.name.toLowerCase())?.description ?? "";
}