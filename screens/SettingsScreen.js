import React, { Component } from "react";
import { StyleSheet, TextInput } from "react-native";
import {
    Body,
    Container,
    Content,
    Header,
    Icon,
    Left,
    List,
    ListItem,
    Right,
    Switch,
    Text,
    Title,
    Toast
} from "native-base";
import { connect } from "react-redux";
import { HeaderButton } from "../components";
import {
    DisablePushNotifications,
    EnablePushNotifications,
    SaveDays,
    UpdateDays
} from "../store/actions";

class SettingsScreen extends Component {
    static navigationOptions = {
        title: "Settings",
        drawerIcon: <Icon name="cog" active style={{ color: "#fffbfa" }} />
    };

    state = {
        language: null,
        days: "30"
    };

    togglePushNotifications(value) {
        if (value) {
            this.props.EnablePushNotifications().then(successful => {
                console.log(successful);
                if (!successful) {
                    Toast.show({
                        text: "Unable to turn on push notifications",
                        position: "top",
                        type: "danger"
                    });
                }
            });
        } else {
            this.props.DisablePushNotifications();
        }
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <HeaderButton icon="menu" route="DrawerOpen" />
                    </Left>
                    <Body>
                        <Title>Settings</Title>
                    </Body>
                    <Right />
                </Header>
                <Content keyboardShouldPersistTaps="always">
                    <List>
                        <ListItem itemDivider>
                            <Text>App Settings</Text>
                        </ListItem>
                        <ListItem icon>
                            <Body>
                                <Text>Days to Grow?</Text>
                            </Body>
                            <Right>
                                <TextInput
                                    placeholder="Days"
                                    onChangeText={days =>
                                        this.props.UpdateDays(days)
                                    }
                                    onEndEditing={() =>
                                        this.props.SaveDays(this.props.days)
                                    }
                                    autoCapitalize="none"
                                    maxLength={2}
                                    value={this.props.days}
                                    caretHidden
                                    selectTextOnFocus
                                    keyboardType="numeric"
                                    returnKeyType="done"
                                    style={style.input}
                                />
                            </Right>
                        </ListItem>
                        <ListItem icon>
                            <Body>
                                <Text>Push Notifications</Text>
                            </Body>
                            <Right>
                                <Switch
                                    value={this.props.push_notifications}
                                    onValueChange={value =>
                                        this.togglePushNotifications(value)
                                    }
                                />
                            </Right>
                        </ListItem>
                        <ListItem itemDivider>
                            <Text>Info</Text>
                        </ListItem>
                        <ListItem icon>
                            <Body>
                                <Text>Version</Text>
                            </Body>
                            <Right>
                                <Text>1.0.0</Text>
                            </Right>
                        </ListItem>
                    </List>
                </Content>
            </Container>
        );
    }
}

const style = StyleSheet.create({
    input: {
        fontSize: 17,
        fontFamily: "Raleway"
    }
});

const mapStateToProps = ({ settings }) => {
    const { days, push_notifications } = settings;
    return { days, push_notifications };
};

export default connect(mapStateToProps, {
    SaveDays,
    UpdateDays,
    EnablePushNotifications,
    DisablePushNotifications
})(SettingsScreen);
