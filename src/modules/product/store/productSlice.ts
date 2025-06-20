import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type {
  Product,
  ProductState,
  ProductFilters,
  CreateProductDto,
  UpdateProductDto,
} from "../types/index.ts";
import {
  mockProducts,
  mockCategories,
} from "../../../shared/data/mockProducts.ts";

const initialState: ProductState = {
  products: [],
  filteredProducts: [],
  loading: false,
  error: null,
  filters: {},
  categories: mockCategories,
  favorites: [],
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return mockProducts;
  }
);

export const createProduct = createAsyncThunk(
  "products/createProduct",
  async (productData: CreateProductDto) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    const newProduct: Product = {
      ...productData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    return newProduct;
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, data }: { id: string; data: UpdateProductDto }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return { id, data };
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (id: string) => {
    await new Promise((resolve) => setTimeout(resolve, 500));
    return id;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
      state.filteredProducts = filterProducts(state.products, state.filters);
    },
    toggleFavorite: (state, action) => {
      const productId = action.payload;
      if (state.favorites.includes(productId)) {
        state.favorites = state.favorites.filter((id) => id !== productId);
      } else {
        state.favorites.push(productId);
      }
    },
    clearFilters: (state) => {
      state.filters = {};
      state.filteredProducts = state.products;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
        state.filteredProducts = filterProducts(action.payload, state.filters);
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        console.log("createProduct.fulfilled called:", action.payload);
        console.log("Products before:", state.products.length);
        console.log("FilteredProducts before:", state.filteredProducts.length);

        state.loading = false;
        state.products.push(action.payload);
        state.filteredProducts = filterProducts(state.products, state.filters);

        console.log("Products after:", state.products.length);
        console.log("FilteredProducts after:", state.filteredProducts.length);
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create product";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        const { id, data } = action.payload;
        const index = state.products.findIndex((product) => product.id === id);
        if (index !== -1) {
          state.products[index] = {
            ...state.products[index],
            ...data,
            updatedAt: new Date().toISOString(),
          };
          state.filteredProducts = filterProducts(
            state.products,
            state.filters
          );
        }
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product.id !== action.payload
        );
        state.filteredProducts = filterProducts(state.products, state.filters);
        state.favorites = state.favorites.filter((id) => id !== action.payload);
      });
  },
});

function filterProducts(
  products: Product[],
  filters: ProductFilters
): Product[] {
  return products.filter((product) => {
    if (
      filters.search &&
      !product.name.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    if (filters.category && product.category !== filters.category) {
      return false;
    }
    if (filters.minPrice && product.price < filters.minPrice) {
      return false;
    }
    if (filters.maxPrice && product.price > filters.maxPrice) {
      return false;
    }
    return true;
  });
}

export const { setFilters, toggleFavorite, clearFilters } =
  productSlice.actions;
export default productSlice.reducer;
