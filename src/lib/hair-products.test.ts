import { describe, expect, it } from "vitest";
import { isHairProduct, productDescription } from "./hair-products";

describe("hair-care-only catalog", () => {
  it("excludes body care and body cream", () => {
    expect(isHairProduct({ name: "Silk & Smooth Body Cream", category: "Body Care" })).toBe(false);
    expect(isHairProduct({ name: "Cream", category: "Body Care" })).toBe(false);
    expect(isHairProduct({ name: "JNT Hair Conditioner", category: "Conditioners" })).toBe(true);
  });
  it("preserves the admin's edited product information", () => {
    expect(productDescription({ name: "JNT Hair Shampoo", description: "Owner's custom formula details" })).toBe("Owner's custom formula details");
  });
});