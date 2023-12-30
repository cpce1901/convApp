import { useNavigation } from "@react-navigation/native";
import { Pressable, Modal, TouchableOpacity } from "react-native";
import { View, StyleSheet, Text, Dimensions } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { changeDate } from "../utills/Utills";
import { useDispatch, useSelector } from "react-redux";
import { startModalMode, stopModalMode } from "../redux/messages/slice";
import { deleteMessage } from "../redux/messages";
import { Color } from "../utills/Colors";

export default function CardMessage(props) {

    const { navigate } = useNavigation()
    const { id, name, phone, created } = props.data

    const { isLoading, messages, message, modalMode } = useSelector(state => state.messages)
    const dispatch = useDispatch()

    new_created = changeDate(created)

    const containerStyle = props.isLastItem ? { ...styles.card, marginBottom: 30 } : styles.card;

    return (
        <>
            <Pressable
                onPress={() => navigate("DetailMessage", { id })}
                onLongPress={() => { dispatch(startModalMode()) }}
                style={containerStyle}>
                <View style={styles.inCard}>

                    <View style={styles.icon}>
                        <MaterialCommunityIcons name="email-outline" size={32} color="black" />
                    </View>

                    <View style={styles.containerText}>
                        <Text style={styles.cardTitle}>{name}</Text>
                        <Text style={styles.cardPhone}>Teléfono: {phone}</Text>
                    </View>

                </View>
                <Text style={styles.cardDate}>{new_created}</Text>
            </Pressable>

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalMode}>
                <View style={styles.modal}>
                    <View style={styles.modalView}>
                        <Text>¿Deseas eliminar el mensaje de: </Text>
                        <Text>{name} ?</Text>
                        <View style={styles.modalButtons}>
                            <TouchableOpacity style={styles.modalButtonBack} onPress={() => { dispatch(stopModalMode()) }}>
                                <Text style={styles.ModalTextButton}>Volver</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modalButtonOk} onPress={() => { dispatch(deleteMessage({id})) }}>
                                <Text style={styles.ModalTextButton}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </>
    )
}

const windowWidth = Dimensions.get("window").width;
const styles = StyleSheet.create({
    card: {
        alignSelf: "center",
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
    inCard: {
        alignItems: "center",
        flexDirection: "row",
        marginTop: 5,
        marginBottom: 40
    },
    icon: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f6f9ff",
        width: 50,
        height: 50,
        borderRadius: 25,
        elevation: 1
    },
    containerText: {
        marginLeft: 10
    },
    cardTitle: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 2,
    },
    cardPhone: {
        fontSize: 14,
        color: "gray",
        letterSpacing: 0.5
    },
    cardDate: {
        alignSelf: "flex-end",
        marginEnd: 20,
        fontStyle: "italic",
        fontSize: 12

    },
    modal: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.35)',
        justifyContent: "center",
        alignItems: "center",
    }
    ,
    modalView: {
        height: "80%",
        width: "80%",
        borderRadius: 5,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f6f9ff",
        elevation: 10,
        gap: 8
    },
    modalButtons: {
        flexDirection: "row",
        gap: 20,
        justifyContent: "space-around",
        margin: 30
    },
    modalButtonBack: {
        backgroundColor: Color.primary,
        borderRadius: 8,
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    modalButtonOk: {
        backgroundColor: Color.fourth,
        borderRadius: 8,
        paddingHorizontal: 25,
        paddingVertical: 10,
    },
    ModalTextButton: {
        color: "white"
    }
});