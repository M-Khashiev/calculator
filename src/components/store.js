import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  counter: 0,
}


const reducer = (state = initialState, action) => {
console.log(action.type)

  switch (action.type) {
    case "increment":
      return { counter: state.counter + 1 };
    case "decrement":
      return { counter: state.counter - 1 };
    default:
      return state;
  }
};

export const store = configureStore({
  reducer
});
