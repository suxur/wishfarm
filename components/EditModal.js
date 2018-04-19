import React from "react";
import Modal from "react-native-modal";
import { View, StyleSheet, DatePickerIOS, Platform } from "react-native";
import DatePicker from "react-native-datepicker";
import { Button, Form, Item, Label, Input, Text } from "native-base";
import old from "../constants/Styles";
import variable from "../native-base-theme/variables/platform";
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
                <Form style={styles.form}>
                    <Label>Name:</Label>
                    <Item regular style={[old.item, styles.input]}>
                        <Input
                            style={styles.item}
                            onChangeText={name => this.setState({ name })}
                            placeholder="Name"
                            value={wish.name}
                        />
                    </Item>
                    <Label>Added:</Label>
                    {Platform.OS === "ios" ? (
                        <DatePickerIOS date={date} onDateChange={setDate} />
                    ) : (
                        <DatePicker
                            style={styles.datePickerAndroid}
                            date={date}
                            mode="date"
                            onDateChange={setDate}
                        />
                    )}
                </Form>
                <Button block>
                    <Text>Update</Text>
                </Button>
                <Button block transparent onPress={onDecline}>
                    <Text>Cancel</Text>
                </Button>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    innerContainer: {
        borderRadius: 15,
        padding: Layout.gutter,
        backgroundColor: "white"
    },
    modalContainer: {
        borderRadius: 15,
        padding: Layout.gutter,
        backgroundColor: "white",
        justifyContent: "center",
        alignItems: "center"
    },
    form: {
        alignSelf: "stretch"
    },
    item: {
        borderWidth: variable.borderWidth * 2,
        borderColor: variable.inputBorderColor,
    },
    input: {
        justifyContent: "center",
        alignSelf: "stretch"
    },
    datePickerAndroid: {
        width: Layout.window.width - 49,
        backgroundColor: "#fff",
        alignSelf: "center",
        marginBottom: 30
    }
});

export { EditModal };
