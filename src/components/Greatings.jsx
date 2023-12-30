import { useEffect, useState } from "react";
import { Text, StyleSheet } from "react-native";
import { getGreatings } from "../utills/Utills";

const Greatings = () => {
    const [greatings, setGreatings] = useState("")
    useEffect(() => {
        setGreatings(getGreatings())
    }, [])
    return (
        <>
            <Text style={styles.greatings}>{greatings}</Text>
        </>
    )
}

export default Greatings;

const styles = StyleSheet.create({
    greatings: {
        fontSize: 14,
        color: "white",
        paddingLeft: 30,
        marginBottom: 10
    }
});