import { useEffect, useState } from "react";
import { View, Switch, Text, StyleSheet } from "react-native";
import { Color } from "../utills/Colors";
import { useDispatch, useSelector } from "react-redux";
import { setStatusNotify } from "../redux/settings/slice";
import { deleteMobileToken, getMobileToken } from "../redux/mobileToken/thunks";


const ToggleButton = (props) => {
    const { features } = props
    const { statusNotify } = useSelector(state => state.settings)
    const { isLoading, mobileToken, mobileTokenId } = useSelector(state => state.mobileToken)
    const dispatch = useDispatch()

    const [onLoad, setOnLoad] = useState(true)
    const [prevStatusNotify, setPrevStatusNotify] = useState(false);
   
    const onToggleSwitch = () => {
        const newStatus = !statusNotify;
        dispatch(setStatusNotify(newStatus));
    };

    useEffect(() => {

        if (!onLoad && prevStatusNotify !== null) {
            if (statusNotify && !prevStatusNotify) {
                dispatch(getMobileToken())
            } else if (!statusNotify && prevStatusNotify && mobileTokenId) {
                dispatch(deleteMobileToken(mobileTokenId))
            }
        }
        setPrevStatusNotify(statusNotify);
        setOnLoad(false)
    }, [statusNotify]);

    return (
        <View style={styles.containerNoti}>
            <Text style={styles.text}>{features}</Text>
            <Switch
                trackColor={{ false: Color.secondary, true: Color.fourth }}
                thumbColor={statusNotify ? Color.primary : Color.secondary}
                ios_backgroundColor="#3e3e3e"
                onValueChange={onToggleSwitch}
                value={statusNotify}
            />
        </View>
    )
}

export default ToggleButton


const styles = StyleSheet.create({
    containerNoti: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "flex-start"
    },
    text: {
        paddingVertical: 10,
        fontSize: 18,
        fontWeight: "bold",
    }
});
