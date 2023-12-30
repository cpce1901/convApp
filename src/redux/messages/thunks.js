import AsyncStorage from '@react-native-async-storage/async-storage';
import { setMessages, startLoadingMessages, setMessageDetail, deleteMessageDetail } from "./slice"
import { Alert } from 'react-native';


export const getMessages = () => {
    return async (dispatch, getState) => {
        const url = "https://www.convictionic.cl/messages/"
        dispatch(startLoadingMessages())
        try {
            const response = await fetch(url)
            const data = await response.json()
            dispatch(setMessages(data.reverse()))
        } catch (error) {
            Alert.alert("Mensajes", "No se ha podido actualizar los mensajes... ")
        }
    }
}

export const getMessageDetail = (id) => {
    const url = `https://www.convictionic.cl/messages/${id}/`
    return async (dispatch, getState) => {
        dispatch(startLoadingMessages())
        const response = await fetch(url)
        const data = await response.json()
        dispatch(setMessageDetail(data))
    }
}

export const deleteMessage = (id) => {
    const url = `https://www.convictionic.cl/messages/${id.id}/`
    return async (dispatch, getState) => {
        dispatch(startLoadingMessages())
        try {
            const response = await fetch(url, {
                method: "DELETE"
            })
            const data = await response.json()
        } catch {
            console.log("Error al eliminar")
        }
        dispatch(deleteMessageDetail(id))
    }
}