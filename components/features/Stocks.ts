import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { ShoppingCart, Stock } from "../../types";

interface PostState {
    cart: [] | Stock[];
    localCart: [] | [{stock_id: any}];
    loading: boolean
}

export const getCart: any = createAsyncThunk("cart/getCart", async (id: number) => {
    return await fetch(`/api/getCart/${id}`).then((res) => res.json()) as ShoppingCart;
});

export const getLocalCart = () => {
    const data = JSON.parse(localStorage.getItem("shoppingCart") || "{}");
    addLocalCart(data[0]?.stock_id);
}


export const stockSlice = createSlice({
    name: "stocks",
    initialState: {
        cart: [],
        localCart: [],
        loading: false,
    } as PostState,
    reducers: {
        addLocalCart: (state, action) => {
            state.localCart = action.payload
        }, 
        deleteLocalCart: (state, action) => {
            state.localCart = action.payload
        },
    },
    extraReducers (builder) {
        builder
            .addCase(getCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(getCart.fulfilled, (state, action: PayloadAction<Stock[]>) => {
                state.loading = false;
                state.cart = action.payload;
            })
    },
})

export const { addLocalCart, deleteLocalCart } = stockSlice.actions;
export default stockSlice.reducer;
