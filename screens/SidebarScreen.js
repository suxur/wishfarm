import React, { Component } from "react";
import { Image } from "react-native";
import { DrawerItems, SafeAreaView } from "react-navigation";
import { Container, Content, Icon, Left, ListItem, View } from "native-base";
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
                        </SafeAreaView>
                    </View>
                </Content>
            </Container>
        );
    }
}

export default connect(null, { Logout })(Sidebar);
