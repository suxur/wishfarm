import React, { Component } from "react";
import { Button, Icon } from "native-base";
import { withNavigation } from "react-navigation";

class HeaderButtonComponent extends Component {
    render() {
        return (
            <Button
                transparent
                onPress={() => this.props.navigation.navigate(this.props.route)}
            >
                <Icon name={this.props.icon} />
            </Button>
        );
    }
}

const HeaderButton = withNavigation(HeaderButtonComponent);

export { HeaderButton };
