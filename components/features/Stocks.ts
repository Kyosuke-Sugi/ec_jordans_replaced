import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// export const getCart: any = (id: any) => {
//     return async (dispatch: any) => {
//         const res = await fetch(`/api/getCart/${id}`);
//         const data = await res.json();
//         console.log(data);
//         dispatch(setCart(data));
//     }
// }

export const getCart: any = createAsyncThunk("cart/getCart", async (id: any) => {
    return await fetch(`/api/getCart/${id}`).then((res) => res.json());
});

export const getLocalCart: any = () => {
    const data = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
    addLocalCart(data[0]?.stock_id);
}

export const stockSlice = createSlice({
    name: "stocks",
    initialState: {
        cart: [],
        localCart: [],
        loading: false,
    },
    reducers: {
        addLocalCart: (state, action) => {
            state.localCart = action.payload
        }, 
        deleteLocalCart: (state, action) => {
            state.localCart = action.payload
        },
    },
    extraReducers: {
        [getCart.pending]: (state) => {
            state.loading = true;
        },
        [getCart.fulfilled]: (state, action) => {
            state.loading = false;
            state.cart = action.payload;
        },
    },
})

export const { addLocalCart, deleteLocalCart } = stockSlice.actions;
export default stockSlice.reducer;
