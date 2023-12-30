import { StyleSheet, View, Dimensions, ActivityIndicator } from "react-native"
import * as Notifications from 'expo-notifications';
import { Color } from "../../utills/Colors";
import Header from "../../components/Header";
import ToggleButton from "../../components/ToggleButton";
import { useSelector } from "react-redux";
import ChangeBgColor from "../../components/ChangeBgColor";

Notifications.setNotificationHandler({
    handleNotification: async () => ({
        // if we are in the app, will show a notification or not
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
    }),
});

export default function Notification() {    
    const { isLoading, mobileToken, mobileTokenId } = useSelector(state => state.mobileToken)
    const { statusNotify, bgColor } = useSelector(state => state.settings)
    
    return (
        <>
            <View style={styles.app}>
                <Header title={"Configuración Notificaciones."}/>

                <View style={styles.body}>
                    {isLoading ? <ActivityIndicator size="large" color="#121212" /> :
                        <View style={styles.details}>
                            <ToggleButton features={"Notifications"} />
                            <ChangeBgColor features={"Change BG Color"}/>
                        </View>
                    }
                </View>
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
    body: {
        position: "absolute",
        bottom: 0,
        backgroundColor: "transparent",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        width: windowWidth * 0.95,
        height: windowsHeight * 0.7,
        justifyContent: "center",
        alignItems: "center",

    },
    details: {
        flex: 1,
        justifyContent: "space-evenly",
        position: "absolute",
        top: 0,    
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
    }
});








