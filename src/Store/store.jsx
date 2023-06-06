import { configureStore } from "@reduxjs/toolkit";
import GroceryListReducer from "./GroceryListSlice";

export const store = configureStore({
    reducer: {
        groceryList: GroceryListReducer,
    }
});