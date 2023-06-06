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
    }
});

// eslint-disable-next-line react-refresh/only-export-components
export const { getCount, setCount, addItemToList } = GroceryListSlice.actions;

export default GroceryListSlice.reducer;