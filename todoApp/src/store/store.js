import { configureStore } from "@reduxjs/toolkit";
import todosReducer from "../features/todos/todoSlice";

const STORAGE_KEY = "todos-state";

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : undefined;
  } catch (error) {
    return undefined;
  }
};

const store = configureStore({
  reducer: {
    todos: todosReducer,
  },
  preloadedState: loadState(),
});

export default store;

// Persist on every change
store.subscribe(() => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState()));
  } catch (error) {}
});
