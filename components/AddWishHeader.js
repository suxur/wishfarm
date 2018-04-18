import React, { Component } from "react";
import { Animated } from "react-native";
import { Button, Header, Icon, Input, Item } from "native-base";
import { connect } from "react-redux";
import { WishAdd } from "../store/actions";

class AddWishHeaderComponent extends Component {
    state = {
        name: "",
        headerMargin: new Animated.Value(0)
    };

    addWish() {
        if (this.state.name !== undefined) {
            this.props.WishAdd(this.state.name);
            this.setState({ name: "" });
            this.refs.AddWishInput.wrappedInstance.focus();
            setTimeout(() => {
                if (typeof this.props.list !== "undefined") {
                    this.props.list._root.scrollToEnd();
                }
            }, 50);
        }
    }

    render() {
        return (
            <Header searchBar rounded>
                <Item>
                    <Icon name="leaf" />
                    <Input
                        ref="AddWishInput"
                        placeholder="I wish I had a..."
                        onChangeText={name => this.setState({ name })}
                        value={this.state.name}
                        onFocus={this.props.onFocus}
                        onEndEditing={this.props.onEndEditing}
                    />
                    <Button warning onPress={() => this.addWish()}>
                        <Icon name="add" />
                    </Button>
                </Item>
            </Header>
        );
    }
}

const AddWishHeader = connect(null, { WishAdd })(AddWishHeaderComponent);

export { AddWishHeader };
