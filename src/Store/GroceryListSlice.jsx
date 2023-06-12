import { createSlice } from "@reduxjs/toolkit";

// items: [
//     {
//         id: //some id
//         item: //item name
//         completed: //marked completed or not
//     }
// ]

const initialState = {
    count: 10,
    items: [],
};

export const GroceryListSlice = createSlice({
    name: 'groceryList',
    initialState,
    reducers: {
        getList: (state) => {
            return state.items;
        },
        setCount: (state, action) => {
            state.count = action.payload;
        },
        addItemToList: (state, action) => {
            //add item name to list, add id that is the same as its position in the array, and if it;s been completed or not
            const newItem = { ...action.payload, id: state.items.length, completed: false };
            state.items.push(newItem);
          },
        removeItemFromList: (state, action) => {
            //find item by id
            const itemIndex = state.items.findIndex(item => item.id === action.payload.id);
            //if item is found
            if (itemIndex !== -1) {
                //remove that item from array
              state.items.splice(itemIndex, 1);
              //re-index all remaining items in array
              state.items.forEach((item, index) => {
                item.id = index; // Update the index of each item
              });
            }
            console.log(state.items)
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
    }
});

// eslint-disable-next-line react-refresh/only-export-components
export const { getList, setCount, addItemToList, removeItemFromList, clearList, toggleComplete } = GroceryListSlice.actions;

export default GroceryListSlice.reducer;