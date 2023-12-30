import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    name: "Conviction IC",    
    statusNotify: false,
    bgColor: "#121212",
}

export const settingsSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        setName: (state, action) => {
            state.name = action.payload
        },
        setStatusNotify: (state, action) => {
            state.statusNotify = action.payload
        },
        setColor:(state, action) => {
            state.bgColor = action.payload
        }
    }
})


export const { setName, setStatusNotify, setColor } = settingsSlice.actions

export const selectsettings = (state) => state.settings.settings

export default settingsSlice.reducer