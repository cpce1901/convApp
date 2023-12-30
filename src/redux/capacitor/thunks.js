import { Alert } from "react-native"
import { setCapacitorCalculate, startLoadingCapacitor } from "./slice"

export const getCapacitorCalculate = (active_power, power_factor, power_factor_need) => {
    const url = `https://www.convictionic.cl/capacitor/trifasico/${active_power}/${power_factor}/${power_factor_need}/`
    return async (dispatch, getState) => {
        dispatch(startLoadingCapacitor())
        try {
            const response = await fetch(url)
            const data = await response.json()
            dispatch(setCapacitorCalculate(data.KVAR))
        } catch (error) {
            console.error(error);
            Alert.alert("Error al consultar", "Debes ingresar valores validos... ")
        }

    }
}

