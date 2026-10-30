import defaults from "./page-copy-defaults.json";

export type PageId = keyof typeof defaults;
export type PageCopy = Record<string, string | string[]>;
export const pageDefaults = defaults as Record<PageId, PageCopy>;
export const pageNames: Record<PageId, string> = { home: "Home", story: "Our Story", consultation: "Hair Consultation", reviews: "Customer Reviews", contact: "Contact Us" };

export function mergePageCopy(page: PageId, saved: unknown): PageCopy {
  const result = { ...pageDefaults[page] };
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) return result;
  for (const [key, fallback] of Object.entries(result)) {
    const value = (saved as Record<string, unknown>)[key];
    if (typeof fallback === "string" && typeof value === "string") result[key] = value;
    if (Array.isArray(fallback) && Array.isArray(value) && value.length && value.every(item => typeof item === "string" && item.trim())) result[key] = value;
  }
  return result;
}