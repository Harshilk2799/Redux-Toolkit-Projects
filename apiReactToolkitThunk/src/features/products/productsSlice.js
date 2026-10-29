import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://fakestoreapi.com";

// Fetch all products
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (_, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products`);
      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || err.message || "Failed to fetch products"
      );
    }
  }
);

// Fetch single product by id
export const fetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`${BASE_URL}/products/${id}`);
      return data;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to fetch product");
    }
  }
);

const initialState = {
  items: [],
  selected: null,
  status: "idle", // list ke liye
  selectedStatus: "idle", // detail ke liye
  error: null,
  selectedError: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    clearSelected: (state) => {
      state.selected = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // fetchProducts
      .addCase(fetchProducts.pending, (state, action) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload || action.error.message;
      })
      //   fetchProductById
      .addCase(fetchProductById.pending, (state, action) => {
        state.selectedStatus = "loading";
        state.selectedError = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.selectedStatus = "succeeded";
        state.selected = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.selectedStatus = "failed";
        state.selectedError = action.payload || action.error.message;
      });
  },
});

export const { clearSelected } = productsSlice.actions;

export default productsSlice.reducer;
