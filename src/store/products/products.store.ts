import { create } from 'zustand';
import { ProductsState } from './products.state';

export const useProductsStore = create<ProductsState>((set, get) => ({
  products: undefined,
  categories: undefined,

  setProducts: products => set({ products }),
  resetProducts: () => set({ products: undefined }),

  setCategories: categories => set({ categories }),
  resetCategories: () => set({ categories: undefined }),

  reset: () => set({ products: undefined, categories: undefined }),
}));
