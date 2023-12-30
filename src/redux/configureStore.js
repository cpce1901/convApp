import { Tuple, combineReducers, configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistReducer } from "redux-persist";
import { messageSlice } from "./messages";
import { capacitorSlice } from "./capacitor";
import { mobileTokenSlice } from "./mobileToken";
import { settingsSlice } from "./settings";


const persistConfig = {
    key: "root",
    storage: AsyncStorage,
    whitelist: ["messages", "mobileToken", "settings"]
}

const rootReducer = combineReducers({
    messages: messageSlice,
    capacitor: capacitorSlice,
    mobileToken: mobileTokenSlice,
    settings: settingsSlice,

})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: () => new Tuple(thunk)
})
