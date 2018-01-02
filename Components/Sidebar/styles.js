import variable from "../../native-base-theme/variables/platform";

const styles = {
    background: {
        backgroundColor: variable.grayBase
    },
    logo: {
        width: 150,
        height: 33,
        alignSelf: "center",
        marginTop: 40,
        marginBottom: 20,
        resizeMode: "center"
    },
    icon: {
        color: variable.grayLighter,
        fontSize: 18,
        width: 30,
        alignSelf: 'center'
    },
    text: {
        color: variable.grayLighter,
        fontSize: 24,
        marginLeft: 0
    }
};

export default styles;
