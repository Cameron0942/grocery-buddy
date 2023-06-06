import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    count: 10,
    items: [],
};

export const GroceryListSlice = createSlice({
    name: 'groceryList',
    initialState,
    reducers: {
        getCount: (state) => {
            return state.count;
        },
        setCount: (state, action) => {
            state.count = action.payload;
        },
        addItemToList: (state, action) => {
            state.items.push(action.payload);
        },
        removeItemFromList: (state, action) => {
            //find the first item in the index that matches the payload string
            const itemIndex = state.items.findIndex(item => item === action.payload);
            if (itemIndex !== -1) {
              state.items.splice(itemIndex, 1);
            }
          },
        editItemFromList: (state, action) => {
            //something
        },
    }
});

// eslint-disable-next-line react-refresh/only-export-components
export const { getCount, setCount, addItemToList, removeItemFromList } = GroceryListSlice.actions;

export default GroceryListSlice.reducer;