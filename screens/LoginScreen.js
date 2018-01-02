import {connect} from 'react-redux';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Image, ImageBackground, StatusBar, AsyncStorage, ActivityIndicator} from 'react-native';
import {Container, Text, View, Form, Item, Label, Input, Button, Toast, Content, StyleProvider} from 'native-base';
import Notification from '../Components/Notification';
import * as firebase from 'firebase';
import Layout from '../constants/Layout';

export default class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            // email: undefined,
            email: 'suxur@me.com',
            // password: undefined
            password: 'password',
            loading: false
        };
    }

    async componentWillMount() {
        // try {
        //     await AsyncStorage.getItem('user').then((user) => {
        //         user = JSON.parse(user);
        //         if (user) {
        //             this.props.navigation.navigate('Drawer');
        //         }
        //     })
        // } catch (e) {
        //
        // }

        // Check if user is logged in... go to app.
        // if (this.props.user) {
        //     this.props.navigation.navigate('Drawer');
        // }
    }

    login() {
        let vm = this;
        this.setState({loading: true});

        if (!this.state.email || !this.state.password) {
            Notification.show('Email or password cannot be empty!');
        } else {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
                .then(function (user) {
                    vm.push('Drawer');
                    vm.setState({loading: false});
                })
                .catch(function (error) {
                    Notification.show(error.message);
                    vm.setState({loading: false});
                });
        }
    }

    push(route) {
        this.props.navigation.navigate(route);
    }

    render() {
        return (
            <ImageBackground
                source={require("../assets/images/background-night.png")}
                style={{width: Layout.window.width, height: Layout.window.height}}
            >
                <StatusBar barStyle="light-content"/>
                <Container>
                    <Content padder contentContainerStyle={styles.content}>
                        <Image source={require("../assets/logo.png")} style={styles.logo}/>
                        <Form style={styles.form}>
                            <Item regular style={styles.item}>
                                <Input
                                    onChangeText={email => this.setState({email})}
                                    autoCapitalize="none"
                                    placeholder="Email"
                                    value={this.state.email}
                                    returnKeyType="next"
                                    keyboardType="email-address"
                                    keyboardAppearance="dark"
                                    onSubmitEditing={() => {
                                        this.refs.PasswordInput._root.focus();
                                    }}
                                />
                            </Item>
                            <Item regular style={styles.item}>
                                <Input
                                    ref="PasswordInput"
                                    onChangeText={password => this.setState({password})}
                                    secureTextEntry
                                    placeholder="Password"
                                    value={this.state.password}
                                    returnKeyType="go"
                                    keyboardAppearance="dark"
                                    onSubmitEditing={() => this.login()}
                                />
                            </Item>
                            <Button full warning disabled={this.state.loading} style={styles.button} onPress={() => this.login()}>
                                {this.buttonState()}
                            </Button>
                            <Button full light transparent disabled={this.state.loading} style={styles.button} onPress={() => this.push('Register')}>
                                <Text>Register</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </ImageBackground>
        );
    }

    buttonState() {
        if (this.state.loading) {
            return <ActivityIndicator size="small" color="#fffbfa"/>
        }

        return <Text>Login</Text>
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    logo: {
        alignSelf: 'center',
        marginBottom: Layout.gutter,
    },
    item: {
        marginBottom: Layout.gutter,
    },
    button: {
        marginBottom: Layout.gutter,
    }
});
