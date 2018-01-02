import React, {Component} from 'react';
import {
    Container,
    Text,
    View,
    Button,
    Toast,
    Content,
    Header,
    Title,
    Left,
    Body,
    Right,
    Icon,
    List,
    ListItem,
    Thumbnail, Form, Item, Input, Grid, Col, Row
} from 'native-base';


export default class Profile extends Component {

    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button transparent onPress={() => this.props.navigation.goBack()}>
                            <Icon name="arrow-back"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Profile</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content padder keyboardShouldPersistTaps="always">
                    <Text>Profile</Text>
                </Content>
            </Container>
        );
    }
}