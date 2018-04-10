import React, {Component} from "react";
import moment from "moment";
import {connect} from "react-redux";
import {NavigationActions} from "react-navigation";
import {
    Body,
    Button,
    Container,
    Content,
    Form,
    H1,
    H2,
    Header,
    Icon,
    Input,
    Item,
    Left,
    Right,
    Text,
    Title
} from "native-base";
import {WishSave} from "../store/actions";
import styles from "../constants/Styles";

const resetAction = NavigationActions.reset({
    index: 0,
    actions: [NavigationActions.navigate({ routeName: "List" })]
});

class EditWishScreen extends Component {
    constructor(props) {
        super(props);

        const { wish } = this.props.navigation.state.params;

        this.state = {
            name: wish.name,
            days: wish.days.toString(),
            created_at: moment(wish.created_at).format(
                "dddd, MMMM Do YYYY, h:mm:ss a"
            ),
            wish
        };
    }

    updateWish() {
        this.state.wish.name = this.state.name;
        this.props.WishSave(this.state.wish);
        this.props.navigation.dispatch(resetAction);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.goBack()}
                        >
                            <Icon name="arrow-back" />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Edit Wish</Title>
                    </Body>
                    <Right />
                </Header>
                <Content padder keyboardShouldPersistTaps="always">
                    <Form>
                        <Item regular style={styles.item}>
                            <Input
                                autoFocus
                                onChangeText={name => this.setState({ name })}
                                placeholder="Name"
                                value={this.state.name}
                            />
                        </Item>
                    </Form>
                    <Button block onPress={() => this.updateWish()}>
                        <Text>Update</Text>
                    </Button>
                </Content>
            </Container>
        );
    }
}

export default connect(null, { WishSave })(EditWishScreen);
