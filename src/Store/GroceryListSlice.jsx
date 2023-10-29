import { createSlice } from "@reduxjs/toolkit";

// items: [
//     {
//         id: //some id
//         item: //item name
//         completed: //marked completed or not
//     }
// ]

const initialState = {
  items: [],
};

export const GroceryListSlice = createSlice({
  name: "groceryList",
  initialState,
  reducers: {
    getList: (state) => {
      return state;
    },
    addItemToList: (state, action) => {
      const newItem = {
        ...action.payload,
        id: state.items.length,
        completed: false,
      };
      return {
        ...state,
        items: [...state.items, newItem],
      };
    },
    removeItemFromList: (state, action) => {
      const filteredItems = state.items.filter(
        (item) => item.id !== action.payload.id
      );

      // Update item IDs
      const updatedItems = filteredItems.map((item, index) => ({
        ...item,
        id: index,
      }));
      return {
        ...state,
        items: updatedItems,
      };
    },
    toggleComplete: (state, action) => {
      //find index and set state.items[index] to payload value
      const index = state.items.findIndex(
        (item) => item.id === action.payload.id
      );
      state.items[index].completed = action.payload.completed;
    },
    clearList: (state) => {
      state.items = [];
    },
  },
});

// eslint-disable-next-line react-refresh/only-export-components
export const {
  getList,
  addItemToList,
  removeItemFromList,
  clearList,
  toggleComplete,
} = GroceryListSlice.actions;

export default GroceryListSlice.reducer;
