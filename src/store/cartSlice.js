// slice helps in storing redux store into smaller pieces for maintaining complexity

const { createSlice } = require("@reduxjs/toolkit");

//declare initialState

//add for adding items, remove for removing items
const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        add(state, action) {
           // in old redux or norml redux we return new state array
           //eg return [...state, action.payload]
           
           //we are updating the same state not creating new its a part of createSlice in redux toolkit
           // but createSlice internally return new staate array

         state.push(action.payload);
        },
        remove(state, action) {
            return state.filter(item => item.id !== action.payload)
        },
    }
});

//old way in redux is to create actions in separate file
//eg.  {type: action name, payload: data to be updated}

//new way createSlice method create action and its own reducers us.
export const { add ,remove } = cartSlice.actions;
export default cartSlice.reducer;