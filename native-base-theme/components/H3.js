import variable from "./../variables/platform";

export default (variables = variable) => {
    const h3Theme = {
        color: variables.textColor,
        fontSize: variables.fontSizeH3,
        lineHeight: variables.lineHeightH3,
        fontFamily: variables.fontFamily,
    };

    return h3Theme;
};
