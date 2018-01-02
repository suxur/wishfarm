import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import firebase from 'firebase';
import {
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
    Form,
    Item,
    Input,
} from 'native-base';

import Layout from '../constants/Layout';

export default class AddWish extends Component {

    constructor(props) {
        super(props);

        this.user = firebase.auth().currentUser;

        this.state = {
            name: undefined,
            price: undefined
        };
    }

    addWish() {
        if (this.state.name !== undefined) {
            this.writeWish(this.user.uid, this.state.name);
            this.props.navigation.goBack();
        }
    }

    writeWish(uid, name) {
        let wishData = {
            uid: uid,
            name: name,
            harvested: false,
            created_at: new Date()
        };

        // Get a key for a new Post.
        let newWishKey = firebase.database().ref().child('wishes').push().key;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        let updates = {};
        updates['/wishes/' + newWishKey] = wishData;
        updates['/user-wishes/' + uid + '/' + newWishKey] = wishData;

        return firebase.database().ref().update(updates);
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
                    <Title>Add Wish</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content padder keyboardShouldPersistTaps="always">
                    <Form>
                        <Item regular style={styles.item}>
                            <Input
                                autoFocus={true}
                                onChangeText={name => this.setState({name})}
                                placeholder="Name"
                            />
                        </Item>
                    </Form>
                    <Button block onPress={() => this.addWish()}>
                        <Text>Add</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    item: {
        marginBottom: Layout.gutter,
    }
});
