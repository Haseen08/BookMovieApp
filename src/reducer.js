import React, { useReducer } from "react";

// Defining the initial state and the reducer
export const initialState = {
    buttonBookShow : false
};
export const reducer = (state, action) => {
  switch (action) {
    case "add":
      return state;
    case "reset":
      return 0;
    default:
      throw new Error("Unexpected action");
  }
};