import React from "react";
import Modal from "react-native-modal";
import { View, StyleSheet, DatePickerIOS } from "react-native";
import { Button, Form, Item, Label, Input, Text } from "native-base";
import old from "../constants/Styles";
import Layout from "../constants/Layout";

const setDate = () => {};

const EditModal = ({ wish, visible, onAccept, onDecline }) => {
    let date = new Date();

    if (wish) {
        date = new Date(wish.created_at);
    }

    return (
        <Modal isVisible={visible}>
            <View style={styles.modalContainer}>
                <Form>
                    <Label>Name:</Label>
                    <Item regular style={[old.item, styles.input]}>
                        <Input
                            onChangeText={name => this.setState({ name })}
                            placeholder="Name"
                            value={wish.name}
                        />
                    </Item>
                    <Label>Added:</Label>
                    <DatePickerIOS date={date} onDateChange={setDate} />
                </Form>
                {/*<Button block onPress={() => this.updateWish()}>*/}
                <Button block>
                    <Text>Update</Text>
                </Button>
                <Button block transparent onPress={onDecline}>
                    <Text>Cancel</Text>
                </Button>
                {/*<View style={styles.modalButtonContainer}>*/}
                {/*<Button style={styles.mr} small light onPress={onDecline}>*/}
                {/*<Text>Close</Text>*/}
                {/*</Button>*/}
                {/*<Button small onPress={onAccept}>*/}
                {/*<Text>Ok</Text>*/}
                {/*</Button>*/}
                {/*</View>*/}
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        borderRadius: 15,
        padding: Layout.gutter,
        backgroundColor: "white"
        // justifyContent: "center",
        // alignItems: "center"
    },
    input: {
        justifyContent: "center",
        alignSelf: "stretch"
    }
});

export { EditModal };
