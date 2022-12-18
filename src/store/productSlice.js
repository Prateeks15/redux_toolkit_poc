// slice helps in storing redux store into smaller pieces for maintaining complexity

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const STATUSES = Object.freeze({
    IDLE: 'idle',
    ERROR: 'error',
    LOADING: 'loading',
});

//declare initialState

//add for adding items, remove for removing items
const productSlice = createSlice({
    name: 'product',
    initialState: {
        data: [],
        status: STATUSES.IDLE,
    },
    reducers: {
        // setProducts(state, action) {
        //     // do not do async calls in reducers becase reducer are sync   
        //     //    const res = await fetch('https://fakestoreapi.com/products');

        //     state.data = action.payload;
        // },
        // setStatus(state, action) {
        //     // do not do async calls in reducers becase reducer are sync   
        //     //    const res = await fetch('https://fakestoreapi.com/products');

        //     state.status = action.payload;
        // },

    } ,
    extraReducers: (builder) => {  //with async Thunk then extraReducers have to be made.. this is complex method 
        
        builder
        .addCase(fetchProducts.pending, (state, action) => {
            state.status = STATUSES.LOADING;
        })
        .addCase(fetchProducts.fulfilled, (state, action) => {
            state.data = action.payload
            state.status = STATUSES.IDLE
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            state.status = STATUSES.ERROR
            state.data = [];
        })
    }
});

//old way in redux is to create actions in separate file
//eg.  {type: action name, payload: data to be updated}

//new way createSlice method create action and its own reducers us.
export const { setProducts, setStatus } = productSlice.actions;
export default productSlice.reducer;

//Thunks 
// in redux toolkit no need to do applyMiddle in store i.e no need to declare it.
// thunk is a fn which returns a fn

// Below example is a basic example of custom crated thunk without the power of toolkit

// export function fetchProducts() {
//     return async function fetchProductThunk(dispatch, getState) {
//         dispatch(setStatus(STATUSES.LOADING))
//         try {
//             const res = await fetch('https://fakestoreapi.com/products');
//             const data = await res.json();

//             dispatch(setProducts(data));
//             dispatch(setStatus(STATUSES.IDLE))
//         } catch (e) {
//             console.log(e);
//             dispatch(setStatus(STATUSES.ERROR))
//         }
//     }
// }



// Below example if thunk created by a method provided by redux toolkit
//first param is identifer , 2nd is the async call fn
export const fetchProducts = createAsyncThunk('products/fetch', async () => {
    const res = await fetch('https://fakestoreapi.com/products');
    const data = await res.json();

    return data;
})