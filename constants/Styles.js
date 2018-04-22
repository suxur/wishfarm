import { StyleSheet } from "react-native";
import Variables from "../native-base-theme/variables/platform";
import Layout from "./Layout";

let fontFamily = "PatrickHand";

const styles = StyleSheet.create({
    header: {
        backgroundColor: "#25283d"
    },
    headerButton: {
        justifyContent: "center"
    },
    buttonFont: {
        color: "#FFFBFA",
        paddingTop: 0,
        height: "auto"
    },
    headerBody: {
        flex: 3
    },
    listHeader: {
        backgroundColor: "#00BC84"
    },
    listHeaderText: {
        color: "#fffbfa",
        fontFamily
    },
    font: {
        fontFamily
    },
    headerTitle: {
        color: "#fffbfa",
        fontFamily,
        fontSize: 25
    },
    input: {
        height: "auto",
        fontFamily
    },

    button: {
        marginBottom: Layout.gutter
    },
    content: {
        flex: 1,
        justifyContent: "center"
    },
    item: {
        marginBottom: Layout.gutter
    },
    logo: {
        alignSelf: "center",
        marginBottom: Layout.gutter
    },
    emptyText: {
        alignSelf: "center",
        marginBottom: 15
    },
    emptyImage: {
        alignSelf: "center"
    },
    rowButton: {
        borderRadius: 0,
        flex: 1,
        height: "100%"
    },
    modalButtonContainer: {
        alignItems: "center",
        flexDirection: "row"
    },
    modalContainer: {
        borderRadius: 15,
        padding: Layout.gutter,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    row: {
        backgroundColor: "#fffbfa",
        borderColor: "#25283d",
        paddingLeft: 15,
        marginLeft: 0
    },
    rowPurchased: {
        backgroundColor: "#e9e9e9",
        borderColor: "#25283d",
        paddingLeft: 15,
        marginLeft: 0
    },
    rowPurchasedTitleText: {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid"
    },
    rowTitleText: {
        fontSize: 18,
        marginLeft: 5
    },
    rowNoteText: {
        position: "absolute",
        right: 0,
        top: 5,
        fontSize: 14
    },
    rowReadyTitleText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center"
    },
    rowReadyYesButton: {
        alignSelf: "flex-end",
        marginRight: 5,
        width: 80,
        justifyContent: "center",
        height: 40
    },
    rowReadyNoButton: {
        alignSelf: "flex-start",
        marginLeft: 5,
        width: 80,
        justifyContent: "center",
        height: 40
    },
    sidebar: {
        backgroundColor: Variables.grayBase
    },
    sidebarLogo: {
        width: 150,
        height: 33,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 20
        // resizeMode: "center"
    },
    sidebarIcon: {
        color: Variables.grayLighter,
        fontSize: 18,
        width: 30,
        alignSelf: "center"
    },
    sidebarText: {
        color: Variables.grayLighter,
        fontSize: 24,
        marginLeft: 0
    },
    mr: {
        marginRight: Layout.gutter
    },
    mb: {
        marginBottom: Layout.gutter
    }
});

export default styles;
