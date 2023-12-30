import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    messages: [],
    message: [],
    isLoading: true,
    modalMode: false
}

export const messageSlice = createSlice({
    name: "messages",
    initialState,
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
            state.isLoading = false
        },
        setMessageDetail: (state, action) => {
            state.message = action.payload
            state.isLoading = false
        },
        deleteMessageDetail: (state, action) => {
            state.messages = state.messages.filter((message) => message.id !== action.payload.id)
            state.isLoading = false
            state.modalMode = false
        },
        startLoadingMessages: (state, action) => {
            state.isLoading = true
        },
        startModalMode: (state, action) => {
            state.modalMode = true
        },
        stopModalMode: (state, action) => {
            state.modalMode = false
        }
    }
})


export const { setMessages, setMessageDetail, deleteMessageDetail, startLoadingMessages, startModalMode, stopModalMode } = messageSlice.actions

export const selectMessages = (state) => state.messages.messages

export default messageSlice.reducer