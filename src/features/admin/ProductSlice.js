import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAllProducts,fetchProductsByFilters, fetchBrands, fetchCategories, fetchProductsById } from "../Product List/ProductAPI";

const initialState = {
  products: [],
  brands: [],
  categories: [],
  status: "idle",
  totalItems: 0,
  selectedProduct: null
};

export const fetchAllProductsAsync = createAsyncThunk(
  "product/fetchAllProducts",
  async () => {
    const response = await fetchAllProducts();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchProductsByIdAsync = createAsyncThunk(
  "product/fetchProductsById",
  async (id) => {
    const response = await fetchProductsById(id);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchBrandsAsync = createAsyncThunk(
  "product/fetchBrandsAsync",
  async () => {
    const response = await fetchBrands();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

export const fetchCategoryAsync = createAsyncThunk(
  "product/fetchCategoryAsync",
  async () => {
    const response = await fetchCategories();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const fetchProductsByFiltersAsync = createAsyncThunk(
  "product/fetchProductsByFilters",
  async ({ filter, sort, pagination }) => {
    const response = await fetchProductsByFilters(filter, sort, pagination);
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);


export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearSelectedProduct: (state) => {
      state.selectedProduct = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllProductsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload;
      })
      .addCase(fetchProductsByFiltersAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.products = action.payload.products;
        state.totalItems = action.payload.totalItems;
      })
      .addCase(fetchBrandsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchBrandsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.brands = action.payload;
      })
      .addCase(fetchCategoryAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCategoryAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.categories = action.payload;
      })
      .addCase(fetchProductsByIdAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProductsByIdAsync.fulfilled, (state, action) => {
        state.status = "idle";
        const index = state.products.findIndex(item => item.id === action.payload.id);
        state.products[index] = action.payload;
      });
  },
});


export const { clearSelectedProduct } = productSlice.actions;
export const selectAllProducts = (state) => state.product.products;
export const selectBrands = (state) => state.product.brands;
export const selectCategories = (state) => state.product.categories;
export const selectTotalItems = (state) => state.product.totalItems;
export const selectProductById = (state) => state.product.selectedProduct;



export default productSlice.reducer;
