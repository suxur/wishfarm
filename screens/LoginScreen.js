import React, {Component} from 'react';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {Image, ImageBackground, StatusBar, ActivityIndicator} from 'react-native';
import {Container, Text, Form, Item, Input, Button, Content} from 'native-base';
import Notification from '../components/Notification';
import Layout from '../constants/Layout';
import styles from '../constants/Styles'
import {Login} from '../store/actions';

/**
 * Login Screen
 */
class LoginScreen extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: 'suxur@me.com',
            password: 'password'
            // email: undefined,
            // password: undefined
        };
    }

    login() {
        if (!this.state.email || !this.state.password) {
            Notification.show('Email or password cannot be empty!');
        } else {
            this.props.Login(this.state.email, this.state.password)
        }
    }

    _navigate(route) {
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: route,
            })
        );
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
                        <Image source={require("../assets/images/logo.png")} style={styles.logo}/>
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
                            <Button full warning disabled={this.props.loading} style={styles.button} onPress={() => this.login()}>
                                {this.buttonState()}
                            </Button>
                            <Button full light transparent disabled={this.props.loading} style={styles.button} onPress={() => this.props.navigation.navigate('Register')}>
                                <Text>Register</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </ImageBackground>
        );
    }

    buttonState() {
        if (this.props.loading) {
            return <ActivityIndicator size="small" color="#fffbfa"/>
        }

        return <Text>Login</Text>
    }
}

const mapStateToProps = ({app}) => {
    const {error, loading} = app;
    return {error, loading,};
};

export default connect(mapStateToProps, {Login})(LoginScreen);
