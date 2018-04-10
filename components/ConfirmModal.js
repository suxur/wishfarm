import React from "react";
import Modal from "react-native-modal";
import { View } from "react-native";
import { Button, H2, Text } from "native-base";
import styles from "../constants/Styles";

const ConfirmModal = ({ children, visible, onAccept, onDecline }) => {
    return (
        <Modal isVisible={visible}>
            <View style={styles.modalContainer}>
                <H2>Whoa there!</H2>
                <Text style={styles.mb}>
                    You are about to delete this, are you sure?
                </Text>
                <Button block onPress={onAccept}>
                    <Text>Ok</Text>
                </Button>
                <Button transparent block onPress={onDecline}>
                    <Text>Close</Text>
                </Button>
            </View>
        </Modal>
    );
};

export { ConfirmModal };
