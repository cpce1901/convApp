import { Alert } from "react-native"
import { setMobileToken, setMobileTokenId, startLoadingMobileToken, stopLoadingMobileToken } from "./slice"
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import Constants from 'expo-constants';
import { Platform } from 'react-native';

// Obtenemos el token desde expo
export const getMobileToken = (url) => {
    return async (dispatch, getState) => {
        dispatch(startLoadingMobileToken())
        try {
            let token;

            if (Platform.OS === 'android') {
                await Notifications.setNotificationChannelAsync('default', {
                    name: 'default',
                    importance: Notifications.AndroidImportance.MAX,
                    vibrationPattern: [0, 250, 250, 250],
                    lightColor: '#FF231F7C',
                });
            }

            if (Device.isDevice) {
                const { status: existingStatus } = await Notifications.getPermissionsAsync();
                let finalStatus = existingStatus;
                if (existingStatus !== 'granted') {
                    const { status } = await Notifications.requestPermissionsAsync();
                    finalStatus = status;
                }
                if (finalStatus !== 'granted') {
                    alert('Error, No existen los permisos para usar notificaciones, Por favor consedelos antes de continuar... ');
                    return;
                }
                token = await Notifications.getExpoPushTokenAsync({
                    projectId: Constants.expoConfig.extra.eas.projectId,
                });

            } else {
                Alert.alert('Para el uso de notifications debes usar un dispositivo físico... ');
                dispatch(stopLoadingMobileToken())
                return;
            }

            dispatch(saveMobileToken(token.data));
            
        } catch (error) {
            console.error(error);
            Alert.alert("Notificaciones", "No se ha logrado conseguir el token... ")
            dispatch(stopLoadingMobileToken())
        }
    }
}

// Si se invoca save, guardamos el token en el back y gauradamos en token en local y su ID
export const saveMobileToken = (token) => {
    const url = "https://www.convictionic.cl/mobile-token/"
    return async (dispatch, getState) => {
        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: Constants.expoConfig.extra.eas.projectId,
                    token: token
                })
            });

            const data = await response.json()
            if (data.id) {
                dispatch(setMobileTokenId(data.id))
                dispatch(setMobileToken(token))
                dispatch(stopLoadingMobileToken())
                Alert.alert("Notificaciones", "Activadas con exito... ")
            } else {
                dispatch(stopLoadingMobileToken())
                Alert.alert("Notificaciones", "Ya existe un id en el back... ")

            }
        } catch (error) {
            console.log(error)
        }
    }
}

// Si se invoca borra, eliminamos el token y eliminamos el token ID
export const deleteMobileToken = (id) => {
    return async (dispatch, getState) => {
        const url = `https://www.convictionic.cl/mobile-token/${id}/`
        dispatch(startLoadingMobileToken())
        try {
            const response = await fetch(url, {
                method: 'DELETE',
            });
            if (response.status == 200 || response.status == 201 || response.status == 204) {
                dispatch(setMobileToken(""))
                dispatch(setMobileTokenId(""))
                dispatch(stopLoadingMobileToken())
                Alert.alert("Notificaciones", "Desactivadas con exito... ")
            }
        } catch (error) {
            Alert.alert("Notificaciones", "No se han logrado desactivar las notificaciones... ")
            dispatch(stopLoadingMobileToken())
        }
    }
}





