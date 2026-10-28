import { configureStore } from "@reduxjs/toolkit";
import productsReducer from "./slice/productsSlice";
import api from "./middleware/api";
import { loggerMiddleware } from "./middleware/api";

export const store = configureStore({
  reducer: { products: productsReducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loggerMiddleware, api),
});
