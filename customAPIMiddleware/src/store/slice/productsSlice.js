import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "../action-type";

const slice = createSlice({
  name: "products",
  initialState: {
    list: [],
    loading: false,
    error: null,
  },
  reducers: {
    productsRequested: (state) => {
      state.loading = true;
      state.error = null;
    },
    productsReceived: (state, action) => {
      state.list = action.payload;
      state.loading = false;
    },
    productsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { productsRequested, productsReceived, productsFailed } =
  slice.actions;

export default slice.reducer;

// Action creators that describe API calls
export const loadProducts = () => {
  return apiCallBegan({
    url: "/products",
    onStart: productsRequested.type,
    onSuccess: productsReceived.type,
    onError: productsFailed.type,
  });
};
