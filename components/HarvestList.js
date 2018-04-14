import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import {
    ActivityIndicator,
    Image,
    ListView,
    RefreshControl,
    StyleSheet
} from "react-native";
import {
    H1,
    H2,
    H3,
    Text,
    View,
    Button,
    Icon,
    List,
    ListItem,
    Content
} from "native-base";
import old from "../constants/Styles";
import { WishesFetch, WishDestroy } from "../store/actions";
import HarvestWish from "./HarvestWish";
import { ConfirmModal } from "../components";
import Layout from "../constants/Layout";

class HarvestList extends Component {
    state = {
        modal_visible: false,
        rowToDelete: {}
    };

    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ harvest }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        const sorted = _.sortBy(harvest, ["purchased", "created_at"]);
        console.log(sorted);

        this.list = ds.cloneWithRows(sorted);
    }

    deleteRow(data, secId, rowId, rowMap) {
        this.setState({
            modal_visible: true,
            rowToDelete: {
                data,
                secId,
                rowId,
                rowMap
            }
        });
    }

    _confirmDeleteRow() {
        this._dismissModal();
        let { data } = this.state.rowToDelete;
        this.props.WishDestroy(data._key);
    }

    _dismissModal() {
        let { secId, rowId, rowMap } = this.state.rowToDelete;
        rowMap[`${secId}${rowId}`].props.closeRow();
        this.setState({ modal_visible: false });
    }

    _onRefresh() {
        this.props.WishesFetch();
    }

    render() {
        if (this.list.getRowCount() > 0) {
            return (
                <Content
                    keyboardShouldPersistTaps="always"
                    refreshControl={
                        <RefreshControl
                            refreshing={this.props.loading}
                            onRefresh={this._onRefresh.bind(this)}
                        />
                    }
                >
                    <ListItem itemDivider>
                        <Text>Ready to Harvest!</Text>
                    </ListItem>
                    <List
                        dataSource={this.list}
                        renderRow={item => <HarvestWish item={item} />}
                        renderLeftHiddenRow={() => null}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) => (
                            <Button
                                full
                                danger
                                onPress={_ =>
                                    this.deleteRow(data, secId, rowId, rowMap)
                                }
                                style={old.rowButton}
                            >
                                <Icon active name="trash" />
                            </Button>
                        )}
                        rightOpenValue={-75}
                    />
                    <ConfirmModal
                        visible={this.state.modal_visible}
                        onAccept={this._confirmDeleteRow.bind(this)}
                        onDecline={this._dismissModal.bind(this)}
                    >
                        <H2>Whoa there!</H2>
                        <Text style={old.mb}>
                            You are about to delete this, are you sure?
                        </Text>
                    </ConfirmModal>
                </Content>
            );
        } else {
            return (
                <Content padder contentContainerStyle={old.content}>
                    {this.loadingState()}
                </Content>
            );
        }
    }

    loadingState() {
        if (this.props.loading) {
            return <ActivityIndicator size="small" color="#25283d" />;
        }

        return (
            <View style={styles.container_empty}>
                <H2>Nothing to harvest!</H2>
                <Image source={require("../assets/images/corn.png")} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container_empty: {
        alignItems: "center",
        height: Layout.window.h_half,
        justifyContent: "space-around"
    }
});

const mapStateToProps = ({ app, wishes }) => {
    const { error, loading } = app;
    const { harvest } = wishes;

    return { error, loading, harvest };
};

export default connect(mapStateToProps, { WishesFetch, WishDestroy })(
    HarvestList
);
