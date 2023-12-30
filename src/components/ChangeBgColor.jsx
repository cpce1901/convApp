import { View, Text, StyleSheet, Pressable } from "react-native"
import { Color } from "../utills/Colors";
import { useDispatch, useSelector } from "react-redux";
import { setColor } from "../redux/settings/slice";
import { useState } from "react";


const ChangeBgColor = (props) => {
    const [currentColorIndex, setCurrentColorIndex] = useState(0);
    const { statusNotify, bgColor } = useSelector(state => state.settings)
    const dispatch = useDispatch()
    const { features } = props
    const objectColors = Object.keys(Color).filter(key => key !== "secondary");
    const bgColors = objectColors

    handlerChangeColor = () => {

        const nextColorIndex = (currentColorIndex + 1) % bgColors.length;
        const nextColor = bgColors[nextColorIndex];

        dispatch(setColor(Color[nextColor]));
        setCurrentColorIndex(nextColorIndex);
    }

    return (
        <View style={styles.containerNoti}>
            <Text style={styles.text}>{features}</Text>
            <Pressable
                style={[styles.changeButton, { backgroundColor: bgColor }]}
                onPress={handlerChangeColor}>
                <Text style={styles.textButton}>Change</Text>
            </Pressable>
        </View>
    )
}

export default ChangeBgColor;


const styles = StyleSheet.create({
    containerNoti: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    text: {
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: "bold",
    },
    changeButton: {
        padding: 5,
        borderRadius: 5,
        elevation: 4,
    }, textButton: {
        color: "white"
    }
});