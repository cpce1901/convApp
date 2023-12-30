import { Text, StyleSheet } from "react-native";

const TitlePage = (props) => {

    const { title } = props;
    return (
        <>
            <Text style={styles.title}>{title}</Text>
        </>
    )
}

export default TitlePage;

const styles = StyleSheet.create({
    title: {
        fontSize: 16,
        fontWeight: "bold",
        color: "white",
        paddingLeft: 30
    }
});

