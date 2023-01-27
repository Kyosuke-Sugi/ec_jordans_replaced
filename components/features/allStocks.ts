import { createSlice } from "@reduxjs/toolkit";
import { supabase } from "../../lib/supabase-client";
import { AppDispatch } from "../../pages";
import { Stock } from "../../types";

interface postAllState {
    stock: [] | Stock[];
    page: number;
    limit: number;
    total: number;
    allTotal: number;
    keyword: string;
}

export const allStocks = createSlice({
    name: "allStocks",
    initialState: {
        stock: [],
        page: 1,
        limit: 15,
        total: 0,
        allTotal: 0,
        keyword: "",

    } as postAllState,
    reducers: {
        setTotal: (state, action) => {
            state.total = action.payload.length
        },
        setAllTotal: (state, action) => {
            state.allTotal = action.payload.length
        },
        setStock: (state, action) => {
            state.stock = action.payload
        },
        setKeyword: (state, action) => {
            state.keyword = action.payload
        },
        nextPage: (state) => {
            state.page = state.page + 1
        },
        prevPage: (state) => {
            state.page = state.page - 1
        },
        jumpPage: (state, action) => {
            state.page = action.payload
        }
    }
})

export const getPagingStocks = (page: number, limit: number) => {
    return async (dispatch: AppDispatch) => {
        const start = limit * (page - 1);
        const end = start + limit - 1;
        const { data } = await supabase.from("stocks").select(`*, items("*")`).range(start, end);
        dispatch(setStock(data))
    }
}

export const getAllData: any = () =>{
    return async (dispatch: AppDispatch) => {
        const res = await fetch(`/api/getStock`);
        const allData = await res.json();
        dispatch(setAllTotal(allData));
        dispatch(setTotal(allData))
    } 
}

export const getSearchResult = (keyword:string) => {
    return async (dispatch: AppDispatch) => {
        const res = await fetch(`/api/getStock`);
        const allData = await res.json();
        const result = allData?.filter((stock: Stock) => stock.items.name.toLowerCase().includes(keyword.toLowerCase()));
        dispatch(setKeyword(keyword));
        dispatch(setTotal(result));
        dispatch(setStock(result));
    } 
}

export const getSeriesResult = (series: string) => {
    return async (dispatch: AppDispatch) => {
        const res = await fetch(`/api/getStock`);
        const allData = await res.json();
        const result = allData?.filter((stock: Stock) => stock.items.series === series);
        dispatch(setKeyword(series));
        dispatch(setTotal(result));
        dispatch(setStock(result));
    }
}

export const { 
    setTotal, 
    setAllTotal,
    setStock, 
    setKeyword, 
    nextPage, 
    prevPage, 
    jumpPage 
} = allStocks.actions;
export default allStocks.reducer;
