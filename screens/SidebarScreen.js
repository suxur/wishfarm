import React, { Component } from "react";
import { Image } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { Button, Container, Content, Icon, Left, ListItem, Text, View } from "native-base";
import { connect } from "react-redux";
import styles from "../constants/Styles";
import { Logout } from "../store/actions";

class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    pushPage(route) {
        this.props.navigation.navigate(route);
        this.props.navigation.navigate("DrawerClose");
    }

    render() {
        return (
            <Container>
                <Content style={styles.sidebar}>
                    <View>
                        <SafeAreaView
                            forceInset={{ top: "always", horizontal: "never" }}
                        >
                            <Image
                                source={require("../assets/images/logo.png")}
                                style={styles.sidebarLogo}
                            />
                            <DrawerItems {...this.props} />
                            <Button full transparent onPress={this.props.Logout}>
                                <Text>Logout</Text>
                            </Button>
                        </SafeAreaView>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default connect(null, { Logout })(Sidebar);
