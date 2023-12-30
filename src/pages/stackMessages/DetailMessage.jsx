import { useRoute } from "@react-navigation/native";
import { useEffect } from "react";
import { View, StyleSheet, Text, ActivityIndicator, Dimensions, Linking, Pressable } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Color } from "../../utills/Colors";
import Header from "../../components/Header";
import { changeDate } from "../../utills/Utills";
import { getMessageDetail } from "../../redux/messages";


export default function DetailMessage() {

    const { params: { id } } = useRoute()
    const dispatch = useDispatch()
    const { isLoading, messages, message } = useSelector(state => state.messages)
    const { statusNotify, bgColor } = useSelector(state => state.settings)
    new_created = changeDate(message.created)
    
    useEffect(() => {
        dispatch(getMessageDetail(id))
    }, []);


    return (
        <> 
            <View style={styles.app}>
                <Header title={"Los mensajes de tu página aquí."} />

                {isLoading ? (<ActivityIndicator size="large" color="#121212" />) :
                    (
                        <View style={styles.body}>
                            <Pressable
                                onPress={() => { Linking.openURL(`tel:${message.phone}`) }}
                                style={styles.details}>
                                <View style={styles.containerHeader}>
                                    <Text style={styles.created}>{new_created}</Text>
                                    <Text style={styles.name}>{message.name}</Text>
                                </View>
                                <Text style={styles.phone}>Teléfono: {message.phone}</Text>
                                <Text style={styles.email}>E-mail: {message.email}</Text>
                                <Text style={styles.address}>Dirección: {message.address}</Text>
                                <Text style={styles.detail}>Mensaje: {message.details}</Text>
                            </Pressable>
                        </View>
                    )
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
        position: "absolute",
        top: 0,
        height: "auto",
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
    containerHeader: {
        flexDirection: "row-reverse",
        justifyContent: "space-between",
        marginBottom: 10
    },
    name: {
        fontSize: 22,
        fontWeight: "bold",
    },
    phone: {
        fontSize: 14,
        color: "gray",
        letterSpacing: 0.5,
        marginBottom: 4
    },
    email: {
        fontSize: 14,
        color: "gray",
        letterSpacing: 0.5,
        marginBottom: 4
    },
    address: {
        fontSize: 14,
        color: "gray",
        letterSpacing: 0.5,
        marginBottom: 10
    },
    detail: {
        fontSize: 14,
        color: "gray",
        letterSpacing: 0.5,
        marginBottom: 4
    },
    created: {
        fontSize: 12,
        color: "gray",
        letterSpacing: 0.5,
        marginBottom: 4
    }
});
