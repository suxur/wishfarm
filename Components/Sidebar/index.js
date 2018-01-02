import React, {Component} from 'react';
import {AsyncStorage, Image} from 'react-native';
import {
    Container,
    Text,
    View,
    Button,
    Content,
    Icon,
    List,
    ListItem,
    Left,
    Right,
    Badge
} from "native-base";
import {NavigationActions} from 'react-navigation';
import firebase from 'firebase';

import styles from "./styles";

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [
        NavigationActions.navigate({routeName: 'AuthNavigator'}),
    ]
});

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }

    pushPage(route) {
        this.props.navigation.navigate(route);
        // const rootNavigation = this.props.screenProps.rootNavigation;
        // rootNavigation.navigate(route);
        this.props.navigation.navigate("DrawerClose");
    }

    logout() {
        let vm = this;
        firebase.auth().signOut().then(function() {
            // Sign-out successful.
            const rootNavigation = vm.props.screenProps.rootNavigation;
            rootNavigation.dispatch(resetAction);
        }).catch(function(error) {
            // An error happened.
        });
    }

    render() {

        return (
            <Container>
                <Content style={styles.background}>
                    <Image source={require("../../assets/logo.png")} style={[
                        styles.logo
                    ]}/>
                    <ListItem
                        button
                        noBorder
                        onPress={() => this.props.navigation.navigate('List')}
                    >
                        <Left>
                            <Icon
                                active
                                name="leaf"
                                style={styles.icon}
                            />
                            <Text style={styles.text}>
                                Farm
                            </Text>
                        </Left>
                    </ListItem>
                    {/*<ListItem*/}
                    {/*button*/}
                    {/*noBorder*/}
                    {/*onPress={() => this.pushPage('Profile')}*/}
                    {/*>*/}
                    {/*<Left>*/}
                    {/*<Icon*/}
                    {/*active*/}
                    {/*name="contact"*/}
                    {/*style={styles.icon}*/}
                    {/*/>*/}
                    {/*<Text style={styles.text}>*/}
                    {/*Profile*/}
                    {/*</Text>*/}
                    {/*</Left>*/}
                    {/*</ListItem>*/}
                    {/*<ListItem*/}
                    {/*button*/}
                    {/*noBorder*/}
                    {/*onPress={() => this.pushPage('Settings')}*/}
                    {/*>*/}
                    {/*<Left>*/}
                    {/*<Icon*/}
                    {/*active*/}
                    {/*name="options"*/}
                    {/*style={styles.icon}*/}
                    {/*/>*/}
                    {/*<Text style={styles.text}>*/}
                    {/*Settings*/}
                    {/*</Text>*/}
                    {/*</Left>*/}
                    {/*</ListItem>*/}
                    <ListItem
                        button
                        noBorder
                        onPress={() => this.logout()}
                    >
                        <Left>
                            <Icon
                                active
                                name="log-out"
                                style={styles.icon}
                            />
                            <Text style={styles.text}>
                                Logout
                            </Text>
                        </Left>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}
