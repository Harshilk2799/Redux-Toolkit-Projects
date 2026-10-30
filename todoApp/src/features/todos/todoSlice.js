import { createSelector, createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  filter: "all",
};

const todoSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: {
      // prepare callback keeps reducers pure (id generated outside)
      prepare: (text) => ({
        payload: { id: nanoid(), text: text.trim(), completed: false },
      }),
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
    },
    toggleTodo: (state, action) => {
      const todo = state.items.find((item) => item.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    },
    editTodo: (state, action) => {
      const { id, text } = action.payload;
      const todo = state.items.find((item) => item.id === id);
      if (todo && text.trim()) todo.text = text.trim();
    },
    deleteTodo: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    toggleAll: (state) => {
      const allDone = state.items.every((item) => item.completed);
      state.items.forEach((item) => (item.completed = !allDone));
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  addTodo,
  toggleTodo,
  editTodo,
  deleteTodo,
  toggleAll,
  clearCompleted,
  setFilter,
} = todoSlice.actions;

const selectItems = (state) => state.todos.items;
export const selectFilter = (state) => state.todos.filter;

export const selectVisibleTodos = createSelector(
  [selectItems, selectFilter],
  (items, filter) => {
    console.log("Items: ", items, "Filter: ", filter);
    if (filter === "active") return items.filter((item) => !item.completed);
    if (filter === "completed") return items.filter((item) => item.completed);
    return items;
  }
);

export const selectCounts = createSelector([selectItems], (items) => ({
  // console.log("Items: ", items);
  total: items.length,
  active: items.filter((item) => !item.completed).length,
  completed: items.filter((item) => item.completed).length,
}));

export default todoSlice.reducer;
