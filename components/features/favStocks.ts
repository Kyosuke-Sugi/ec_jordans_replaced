import { createSlice } from "@reduxjs/toolkit";

export const favStockSlice = createSlice({
    name: "favStocks",
    initialState: {
        fav: []
    },
    reducers: {
        setFavData: (state, action) => {
            state.fav = action.payload
        },
    }
})

export const getFav: any = () => {
    return async (dispatch: any) => {
        const res = await fetch(`/api/myPage/getFavoriteItems`);
        const data = await res.json();
        console.log(data);
        dispatch(setFavData(data))
    }
}

export const { setFavData } = favStockSlice.actions;
export default favStockSlice.reducer;
