import { useState, useEffect } from "react"
import { Text, StyleSheet, View, ActivityIndicator, FlatList, RefreshControl, Dimensions, Pressable } from "react-native"
import { useDispatch, useSelector } from "react-redux";
import CardMessage from "../../components/CardMessage"
import { getMessages } from "../../redux/messages/thunks";
import { Color } from "../../utills/Colors";
import Header from "../../components/Header";

export default function Messages() {
    const [refhesh, setRefresh] = useState(false)
    const dispatch = useDispatch()
    const { isLoading, messages, modalMode } = useSelector(state => state.messages)

    useEffect(() => {        
        dispatch(getMessages()) 
    }, [])

    return (
        <>
            <View style={styles.app}>

                <Header title={"Los mensajes de tu página aquí."}/>
                
                {isLoading ? (<ActivityIndicator size="large" color="#121212" />) :
                    (
                        <View style={styles.body}>
                            {messages.length > 0 ? (
                                <FlatList
                                    showsHorizontalScrollIndicator={false}
                                    showsVerticalScrollIndicator={false}
                                    data={messages}
                                    renderItem={({ item, index }) => <CardMessage data={item} isLastItem={index === messages.length - 1} />}
                                    keyExtractor={item => item.id}
                                    refreshControl={<RefreshControl refreshing={refhesh} onRefresh={() => { dispatch(getMessages()) }} />}
                                />
                            ) : (
                                <>
                                    <Pressable onPress={() => { dispatch(getMessages()) }}>
                                        <Text style={styles.textReloadButton}>No existen mensajes... </Text>
                                        <Text style={styles.textReloadButton}>Toca para recargar         👆</Text>
                                    </Pressable>
                                </>
                            )}
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
        borderTopLeftRadius: 50,
        borderTopRightRadius: 25,
        width: windowWidth * 0.95,
        height: windowsHeight * 0.7,
        justifyContent: "center",
        alignItems: "center",

    },
    textReloadButton: {
        textAlign: "center",
        fontSize: 14,
        textShadowColor: 'rgba(0, 0, 0, 0.10)',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 2,
        marginBottom: 10
    }
});

