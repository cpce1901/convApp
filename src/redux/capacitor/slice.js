import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    kvar: 0,
    isLoading: false,
}

export const capacitorSlice = createSlice({
    name: "capacitor",
    initialState,
    reducers: {
        setCapacitorCalculate: (state, action) => {
            state.kvar = action.payload
            state.isLoading = false
            
        },
        startLoadingCapacitor: (state, action) => {
            state.isLoading = true
        },
        setResetCapacitor: (state, action) => {
            state.kvar = 0
        }
    }
})


export const { startLoadingCapacitor, setCapacitorCalculate, setResetCapacitor } = capacitorSlice.actions

export const selectCapacitor = (state) => state.capacitor.capacitor

export default capacitorSlice.reducer