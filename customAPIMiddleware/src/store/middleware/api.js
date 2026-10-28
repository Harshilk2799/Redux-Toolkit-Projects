import axios from "axios";
import { apiCallBegan, apiCallSuccess, apiCallFailed } from "../action-type";

const api =
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    // Not our action? Pass it along untouched.
    if (action.type !== apiCallBegan.type) return next(action);
    console.log("action.payload: ", action.payload);
    const { url, onStart, onSuccess, onError } = action.payload;

    if (onStart) dispatch({ type: onStart });
    next(action);

    try {
      const response = await axios.get(url, {
        baseURL: "https://fakestoreapi.com",
      });
      dispatch(apiCallSuccess(response.data));
      if (onSuccess) dispatch({ type: onSuccess, payload: response.data });
    } catch (error) {
      dispatch(apiCallFailed(error.message));
      if (onError) dispatch({ type: onError, payload: error.message });
    }
  };

export default api;

export const loggerMiddleware = (store) => (next) => (action) => {
  console.group(action.type);
  console.log("store: ", store);
  console.log("Action Type: ", action.type);
  console.log("Prev State: ", store.getState());
  console.log("Action: ", action);
  const result = next(action);
  console.log("Next State: ", store.getState());
  console.groupEnd();
  return result;
};

// 1. store: Redux store ka reference. Isse store.getState() aur
// store.dispatch() mil jaate hain.

// 2. next: Middleware chain ka agla function. Agar aur middlewares
// hain to next unhe call karega, warna last mein next seedha reducer
// tak action pahunchata hai.

// 3. action: Jo action abhi dispatch hua hai (jaise { type: "ADD_USER", payload: ... }).

// 4. const result = next(action);
// Sabse important line. Yahan action aage pass hota hai, yaani reducer
// tak pahunchta hai aur state update hoti hai. Agar ye line na ho, to
// action beech mein hi atak jayega aur kabhi reducer tak nahi pahunchega.
