import { Text, Button, TextInput, StyleSheet, Dimensions, View } from 'react-native';
import { Formik, useField, useFormikContext } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setResetCapacitor } from "../redux/capacitor/slice";
import { Color } from '../utills/Colors';

const CustomInput = ({ fieldname, ...props }) => {
    const [field, meta] = useField(fieldname)
    return (
        <>
            <TextInput
                onChangeText={field.onChange(fieldname)}
                onBlur={field.onBlur(fieldname)}
                value={String(field.value)}
                {...props}
            />
            {
                meta.error && meta.touched && (
                    <Text style={{ color: "red" }}>{meta.error}</Text>
                )
            }
        </>

    )
}

const CapacitorForm = (props) => {
    const { stylesForm } = props
    const dispatch = useDispatch()
    const { handleChange, submitForm, resetForm, values } = useFormikContext()
    const handleResetForm = () => {
        dispatch(setResetCapacitor())
        resetForm()
    };
    return (
        <View>
            <Text style={styles.text}>Potencia activa KW</Text>
            <CustomInput fieldname={"active_power"} keyboardType="numeric" style={styles.input} placeholder="KW" cursorColor={Color.primary} />

            <Text style={styles.text}>Factor de potencia existente</Text>
            <CustomInput fieldname={"power_factor"} keyboardType="numeric" style={styles.input} placeholder="FP" cursorColor={Color.primary} />

            <Text style={styles.text}>Factor de potencia deseado</Text>
            <CustomInput fieldname={"power_factor_need"} keyboardType="numeric" style={styles.input} placeholder="FP" cursorColor={Color.primary} />

            <View style={styles.containerButton}>
                <Button title="Consultar" onPress={submitForm} color={Color.primary} />
                <Button title="Reset" onPress={handleResetForm} color={Color.third} />
            </View>
        </View>
    )

}

export default CapacitorForm;

const windowWidth = Dimensions.get("window").width;
const windowsHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    text: {
        alignSelf: "flex-start",
        fontSize: 16,
        color: "gray",
        fontWeight: "700",
        marginBottom: 12
    },
    input: {
        position: "relative",
        width: "auto",
        borderWidth: 1,
        borderRadius: 5,
        borderColor: Color.fourth,
        borderBottomColor: Color.fourth,
        paddingVertical: 1,
        paddingHorizontal: 10,
        marginBottom: 12

    },
    containerButton: {
        gap: 25,
        marginTop: 12
    }
});