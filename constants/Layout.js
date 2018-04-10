import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const height = Dimensions.get("window").height;

export default {
    window: {
        width,
        w_half: width / 2,
        height,
        h_half: height / 2
    },
    isSmallDevice: width < 375,
    gutter: 15,
};
