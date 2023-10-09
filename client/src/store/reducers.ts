import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Product } from "../pages/ProductsByCategories";

const initialState = {
  products: [] as Product[], // Initialize as an empty array
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setProduct: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload]; // Create a new array with the updated data
    },
  },
});

export const { setProduct } = productSlice.actions;

export default productSlice.reducer;
