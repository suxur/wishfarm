import React, {Component} from 'react';
import {StyleSheet, Image, ImageBackground} from 'react-native';
import * as firebase from 'firebase';
import Notification from '../Components/Notification';
import Layout from '../constants/Layout';
import {
    Container,
    Text,
    View,
    Form,
    Item,
    Label,
    Input,
    Button,
    Toast,
    Content, StyleProvider
} from 'native-base';

export default class Register extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: undefined,
            password: undefined,
            password_confirmation: undefined
        };
    }

    register() {
        let vm = this;

        if (!this.state.email) {
            Notification.show('Email cannot be empty!');
        } else if (!this.state.password) {
            Notification.show('Password cannot be empty!');
        } else if (this.state.password !== this.state.password_confirmation) {
            Notification.show('Passwords do not match!');
        } else {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode);
                console.log(errorMessage);

            });
        }
    }

    render() {
        return (
            <ImageBackground
                source={require("../assets/images/background-day.png")}

                style={{width: Layout.window.width, height: Layout.window.height}}
            >
                <Container>
                    <Content padder contentContainerStyle={styles.content}>
                        <Image source={require("../assets/logo.png")} style={styles.logo }/>
                        <Form style={styles.form}>
                            <Item regular style={styles.item}>
                                <Input
                                    onChangeText={email => this.setState({email})}
                                    autoCapitalize="none"
                                    placeholder="Email"
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
                                    returnKeyType="next"
                                    keyboardAppearance="dark"
                                    onSubmitEditing={() => {
                                        this.refs.PasswordConfirmInput._root.focus();
                                    }}
                                />
                            </Item>
                            <Item regular style={styles.item}>
                                <Input
                                    ref="PasswordConfirmInput"
                                    onChangeText={password_confirmation => this.setState({password_confirmation})}
                                    secureTextEntry
                                    placeholder="Confirm Password"
                                    returnKeyType="go"
                                    keyboardAppearance="dark"
                                    onSubmitEditing={() => this.register()}
                                />
                            </Item>
                            <Button full warning style={styles.button} onPress={() => this.register()}>
                                <Text style={styles.input}>Register</Text>
                            </Button>
                            <Button full light transparent style={styles.button} onPress={() => this.props.navigation.goBack()}>
                                <Text>Login</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </ImageBackground>
        );
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
