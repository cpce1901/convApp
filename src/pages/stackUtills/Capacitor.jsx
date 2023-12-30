import { Text, StyleSheet, View, Keyboard, Dimensions, KeyboardAvoidingView, ActivityIndicator } from "react-native"
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { around } from "../../utills/Utills";
import { Color } from "../../utills/Colors";
import CapacitorForm from "../../components/CapacitorForm";
import { getCapacitorCalculate } from "../../redux/capacitor";
import Greatings from "../../components/Greatings";
import NameCompany from "../../components/NameCompany";
import * as Yup from 'yup';


export default function Capacitor() {

    const dispatch = useDispatch()
    const { statusNotify, bgColor } = useSelector(state => state.settings)
    const { isLoading, kvar } = useSelector(state => state.capacitor)

    function handlerCalculate(inputs) {
        const { active_power, power_factor, power_factor_need } = inputs
        dispatch(getCapacitorCalculate(active_power, power_factor, power_factor_need))
        Keyboard.dismiss()
    }

    const kvar_calculated = around(kvar)

    return (
        <>
            <View style={styles.app}>
                <View style={[styles.header, { backgroundColor: bgColor }]}>
                    <NameCompany />
                    <View>
                        <Greatings />
                        <Text style={styles.title}>Cálculo de KVAR.</Text>
                        <Text style={styles.title}>Trifásico</Text>
                    </View>
                    <View style={styles.Containerkvar}>
                        <Text style={styles.kvar}>{kvar_calculated}</Text>
                        <Text style={styles.kvar}>KVAR</Text>
                    </View>

                </View>

                {isLoading ? <ActivityIndicator size="large" color="#121212" /> : <KeyboardAvoidingView
                    style={styles.body}
                >
                    <View style={styles.details}>
                        <Formik
                            validationSchema={
                                Yup.object({
                                    active_power: Yup.number()
                                        .required("Requerido")
                                        .test('is-float', 'Debe ser un número decimal', value => (value !== null && value % 1 !== 0) ? (value + '') : (value === null ? true : value + '.0')),
                                    power_factor: Yup.number()
                                        .required("Requerido")
                                        .test('is-float', 'Debe ser un número decimal', value => (value !== null && value % 1 !== 0) ? (value + '') : (value === null ? true : value + '.0')),
                                    power_factor_need: Yup.number()
                                        .required("Requerido")
                                        .test('is-float', 'Debe ser un número decimal', value => (value !== null && value % 1 !== 0) ? (value + '') : (value === null ? true : value + '.0')),
                                })
                            }
                            onSubmit={(input) => handlerCalculate(input)}
                            initialValues={{ power_factor_need: "", power_factor: "", active_power: "" }}
                            keyboardShouldPersistTaps="handled">
                            <CapacitorForm />
                        </Formik>

                    </View>
                </KeyboardAvoidingView>
                }
            </View>
        </>
    )
}

const windowWidth = Dimensions.get("window").width;
const windowsHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    app: {
        flex: 1,
        backgroundColor: Color.secondary,
        justifyContent: "center",
        alignItems: "center",

    },
    header: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: windowsHeight * 0.35,
        justifyContent: "center",
        alignItems: "left",
    },
    body: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "transparent",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: windowWidth * 0.95,
        height: windowsHeight * 0.7,
        justifyContent: "center",
        alignItems: "center",

    },
    details: {
        marginTop: 55,
        width: windowWidth * 0.85,
        backgroundColor: "white",
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        marginBottom: 20,
        shadowColor: Color.third,
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        paddingLeft: 30
    },
    Containerkvar: {
        position: "absolute",
        top: 110,
        right: 40,
        alignSelf: "center",
        color: "white",
        fontSize: 32
    },
    kvar: {

        alignSelf: "flex-end",
        color: "white",
        fontSize: 32
    },
    form: {

        position: "relative",
        borderWidth: 10,
        paddingVertical: 10,
        paddingHorizontal: 50
    }
});
