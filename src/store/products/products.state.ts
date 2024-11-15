import { Product, ProductCategory } from "@/interfaces";

export interface ProductsState {
  products?: Product[];
  categories?: ProductCategory[];

  setProducts: (products: Product[]) => void;
  resetProducts: () => void;

  setCategories: (categories: ProductCategory[]) => void;
  resetCategories: () => void;

  reset: () => void;
}
