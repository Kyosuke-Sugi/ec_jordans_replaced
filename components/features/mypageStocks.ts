import { AnyAction, createSlice, Dispatch } from "@reduxjs/toolkit";
import { FavoriteItem } from "../../types";

interface myStockState {
    fav: [] | FavoriteItem;
    settlement: [] | any[];
    usedItemList: [] | any[];
}

export const myStockSlice = createSlice({
    name: "myStocks",
    initialState: {
        fav: [],
        settlement: [],
        usedItemList: []
    } as myStockState,
    reducers: {
        setFavData: (state, action) => {
            state.fav = action.payload
        },
        setSettlementData: (state, action) => {
            state.settlement = action.payload
        },
        setUsedItemList: (state, action) => {
            state.usedItemList = action.payload
        }
    }
})

export const getFav: any = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const res = await fetch(`/api/myPage/getFavoriteItems`);
        const data = await res.json();
        dispatch(setFavData(data))
    }
}
export const getSettlement: any = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const res = await fetch(`/api/getOrderItems/orderItems`);
        const data = await res.json();
        dispatch(setSettlementData(data))
    }
}
export const getUsedItems: any = () => {
    return async (dispatch: Dispatch<AnyAction>) => {
        const res = await fetch(`/api/myPage/getUsedItems`);
        const data = await res.json();
        dispatch(setUsedItemList(data))
    }
}



export const { setFavData, setSettlementData, setUsedItemList } = myStockSlice.actions;
export default myStockSlice.reducer;
