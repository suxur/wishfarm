import React, { Component } from "react";
import { connect } from "react-redux";
import { ActivityIndicator, StyleSheet } from "react-native";
import { Container } from "native-base";
import firebase from "firebase";
import { Route } from "../store/actions";

class LoadingComponent extends Component {
    static navigationOptions = {
        header: false
    };

    state = {
        loading: true
    };

    componentWillMount() {
        // this.props.Reset();
        const vm = this;

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                vm.props.Route("AppNav");
            } else {
                vm.props.Route("AuthNav");
            }
        });
    }

    render() {
        return (
            <Container style={styles.container}>
                <ActivityIndicator />
            </Container>
        );
    }
}

const mapStateToProps = state => ({});

const LoadingScreen = connect(mapStateToProps, {
    Route
})(LoadingComponent);

export { LoadingScreen };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#ffffff"
    }
});
