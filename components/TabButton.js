import React from "react";
import { Button, Icon, Text } from "native-base";

const TabButton = props => {
    return (
        <Button active={props.active} onPress={() => props.onPress()}>
            <Icon name={props.icon} />
            <Text>{props.title}</Text>
        </Button>
    );
};

export { TabButton };
