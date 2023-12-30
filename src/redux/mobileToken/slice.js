import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    mobileToken: "",
    mobileTokenId: "",
    isLoading: false,
}

export const mobileTokenSlice = createSlice({
    name: "mobileToken",
    initialState,
    reducers: {
        setMobileToken: (state, action) => {
            state.mobileToken = action.payload

        },
        setMobileTokenId: (state, action) => {
            state.mobileTokenId = action.payload
        },
        startLoadingMobileToken: (state, action) => {
            state.isLoading = true
        },
        stopLoadingMobileToken: (state, action) => {
            state.isLoading = false
        },
    }
})


export const { setMobileToken, startLoadingMobileToken, setMobileTokenId, stopLoadingMobileToken } = mobileTokenSlice.actions

export const selectMobileToken = (state) => state.mobileToken.mobileToken

export default mobileTokenSlice.reducer