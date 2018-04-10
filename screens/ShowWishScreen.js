import React, {Component} from 'react';
import firebase from 'firebase';
import moment from 'moment';
import {
    H1,
    H2,
    Container,
    Text,
    Button,
    Content,
    Header,
    Title,
    Left,
    Body,
    Right,
    Icon,
} from 'native-base';

class ShowWishScreen extends Component {

    constructor(props) {
        super(props);

        const {wish} = this.props.navigation.state.params;

        this.state = {
            name: wish.name,
            days: wish.days.toString(),
            created_at: moment(wish.created_at).format("dddd, MMMM Do YYYY, h:mm:ss a"),
            wish: wish,
        };
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
                    <Title>{this.state.name}</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.props.navigation.navigate('EditWishScreen', {wish: this.state.wish})}>
                            <Text>Edit</Text>
                        </Button>
                    </Right>
                </Header>
                <Content padder keyboardShouldPersistTaps="always">
                    <H1>Name: {this.state.name}</H1>
                    <H2>Days Passed: {this.state.days}</H2>
                    <Text>{this.state.created_at}</Text>
                </Content>
            </Container>
        );
    }
}

export default ShowWishScreen;
