import React, {Component} from 'react';
import {ActivityIndicator, Image, ImageBackground} from 'react-native';
import {connect} from 'react-redux';
import {NavigationActions} from 'react-navigation';
import {
    Container,
    Text,
    Form,
    Item,
    Input,
    Button,
    Content
} from 'native-base';
import Layout from '../constants/Layout';
import styles from '../constants/Styles';
import {Register} from '../store/actions';

class RegisterScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: undefined,
            password: undefined,
            password_confirmation: undefined
        };
    }

    register() {
        this.props.Register(this.state.email, this.state.password, this.state.password_confirmation);
    }

    _renderButtonText() {
        if (this.props.loading) {
            return <ActivityIndicator size="small" color="#fffbfa"/>
        }

        return <Text>Register</Text>
    }

    _goBack() {
        this.props.navigation.dispatch(
            NavigationActions.back()
        );
    }

    render() {
        return (
            <ImageBackground
                source={require("../assets/images/background-day.png")}
                style={{width: Layout.window.width, height: Layout.window.height}}
            >
                <Container>
                    <Content padder contentContainerStyle={styles.content}>
                        <Image source={require("../assets/images/logo.png")} style={styles.logo}/>
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
                            <Button full warning disabled={this.props.loading} style={styles.button} onPress={() => this.register()}>
                                {this._renderButtonText()}
                            </Button>
                            <Button full light transparent disabled={this.props.loading} style={styles.button} onPress={() => this._goBack()}>
                                <Text>Login</Text>
                            </Button>
                        </Form>
                    </Content>
                </Container>
            </ImageBackground>
        );
    }
}

const mapStateToProps = ({app}) => {
    const {error, loading} = app;
    return {error, loading};
};

export default connect(mapStateToProps, {Register})(RegisterScreen);
