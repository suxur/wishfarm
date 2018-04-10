import React, { Component } from "react";
import { StyleSheet } from "react-native";
import { H2, Text, Body, Button, ListItem, Grid, Col, View } from "native-base";
import moment from "moment";
import { connect } from "react-redux";
import ProgressBar from "./ProgressBar";
import ConfirmModal from "./ConfirmModal";
import styles from "../constants/Styles";
import { WishSave, WishDestroy } from "../store/actions";

class GrowingWish extends Component {
    state = {
        wish: this.props.item,
        modalVisible: false
    };

    harvest(wish) {
        wish.harvested = true;
        this.props.WishSave(wish);
    }

    deleteRow() {
        this.setState({ modalVisible: true });
    }

    _confirmDeleteRow() {
        this._dismissModal();
        this.props.WishDestroy(this.state.wish._key);
    }

    _dismissModal() {
        this.setState({ modalVisible: false });
    }

    render() {
        let wish = this.props.item;

        if (wish.days >= 30) {
            return (
                <ListItem style={styles.row}>
                    <Body>
                        <Text style={styles.rowReadyTitleText}>
                            Still want "{wish.name}"?
                        </Text>
                        <Grid>
                            <Col>
                                <Button
                                    success
                                    style={styles.rowReadyYesButton}
                                    onPress={() => this.harvest(wish)}
                                >
                                    <Text>Yes</Text>
                                </Button>
                            </Col>
                            <Col>
                                <Button
                                    warning
                                    style={styles.rowReadyNoButton}
                                    onPress={this.deleteRow.bind(this)}
                                >
                                    <Text>No</Text>
                                </Button>
                            </Col>
                        </Grid>
                    </Body>
                    <ConfirmModal
                        visible={this.state.modalVisible}
                        onAccept={this._confirmDeleteRow.bind(this)}
                        onDecline={this._dismissModal.bind(this)}
                    >
                        <H2>Whoa there!</H2>
                        <Text style={styles.mb}>
                            You are about to delete this, are you sure?
                        </Text>
                    </ConfirmModal>
                </ListItem>
            );
        } else {
            const { row, title, note } = s;
            return (
                <ListItem style={row} onPress={() => this.props.onPress(wish)}>
                    <Body>
                        <View style={s.row_text}>
                            <Text style={title}>{wish.name}</Text>
                            <Text style={note}>{wish.days} Days</Text>
                        </View>
                        <ProgressBar complete={wish.days} />
                    </Body>
                </ListItem>
            );
        }
    }
}

const s = StyleSheet.create({
    row: {
        backgroundColor: "#fffbfa",
        borderColor: "#25283d",
        paddingLeft: 15,
        marginLeft: 0
    },
    row_text: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 5
    },
    title: {
        fontSize: 18
    },
    note: {
        fontSize: 14
    },
    rowPurchased: {
        backgroundColor: "#e9e9e9",
        borderColor: "#25283d",
        paddingLeft: 15,
        marginLeft: 0
    },
    rowPurchasedTitleText: {
        textDecorationLine: "line-through",
        textDecorationStyle: "solid"
    },
    rowReadyTitleText: {
        fontSize: 18,
        marginBottom: 10,
        textAlign: "center"
    },
    rowReadyYesButton: {
        alignSelf: "flex-end",
        marginRight: 5,
        width: 80,
        justifyContent: "center",
        height: 40
    },
    rowReadyNoButton: {
        alignSelf: "flex-start",
        marginLeft: 5,
        width: 80,
        justifyContent: "center",
        height: 40
    }
});

export default connect(null, { WishSave, WishDestroy })(GrowingWish);
