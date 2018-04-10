import React, {Component} from 'react';
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

import {connect} from "react-redux";
import styles from '../constants/Styles';
import {WishAdd} from '../store/actions';

class AddWish extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: undefined,
            price: undefined
        };
    }

    addWish() {
        if (this.state.name !== undefined) {
            this.props.WishAdd(this.state.name);
            this.props.navigation.goBack();
        }
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

export default connect(null, {WishAdd})(AddWish);
