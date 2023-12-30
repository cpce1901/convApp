import { View, StyleSheet, Dimensions } from "react-native"
import NameCompany from "./NameCompany";
import Greatings from "./Greatings";
import TitlePage from "./TitlePage";
import { useDispatch, useSelector } from "react-redux";
import { StatusBar } from 'expo-status-bar';

const Header = (props) => {
    const { title } = props
    const { statusNotify, bgColor } = useSelector(state => state.settings)

    return (

        <View style={[styles.header, { backgroundColor: bgColor }]}>
            <StatusBar style={bgColor === "#121212" ? "light" : "dark"} />
            <NameCompany />
            <View>
                <Greatings />
                <TitlePage title={title} />
            </View>
        </View>

    )
}

export default Header;

const windowWidth = Dimensions.get("window").width;
const windowsHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
    header: {
        position: "absolute",
        top: 0,
        width: "100%",
        height: windowsHeight * 0.35,
        justifyContent: "center",
        alignItems: "left",
    }
});