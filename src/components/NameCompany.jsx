import { Text, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const NameCompany = () => {    
    const { name } = useSelector(state => state.settings)
    return(
        <>
            <Text style={styles.tag}>{name}</Text>
        </>
    )
}

export default NameCompany;


const styles = StyleSheet.create({
    
    tag: {
        position: "absolute",
        top: 50,
        fontSize: 25,
        fontWeight: "bold",
        color: "white",
        paddingLeft: 30,
    }
    
});