import React, { Component } from "react";
import {
    ActivityIndicator,
    Animated,
    Image,
    ListView,
    RefreshControl,
    StyleSheet
} from "react-native";
import {
    Button,
    Container,
    Content,
    H2,
    Header,
    Icon,
    Input,
    Item,
    List,
    ListItem,
    Text,
    View
} from "native-base";
import { connect } from "react-redux";
import GrowingWish from "./GrowingWish";
import old from "../constants/Styles";
import Layout from "../constants/Layout";
import { WishAdd, WishDestroy, WishesFetch } from "../store/actions";
import { AddWishHeader, ConfirmModal, EditModal } from "../components";

class GrowingList extends Component {
    state = {
        headerMargin: new Animated.Value(0),
        name: "",
        modal_visible: false,
        edit_modal: false,
        editwish: {},
        refreshing: false,
        rowToDelete: {}
    };

    constructor() {
        super();

        this.editWish = this.editWish.bind(this);
        this.hideHeader = this.hideHeader.bind(this);
        this.showHeader = this.showHeader.bind(this);
    }

    componentWillMount() {
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.createDataSource(nextProps);
    }

    createDataSource({ growing }) {
        const ds = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });

        this.list = ds.cloneWithRows(growing);
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

    editWish(wish) {
        this.setState({
            edit_modal: true,
            editwish: wish
        });
    }

    hideHeader() {
        Animated.timing(this.state.headerMargin, {
            toValue: -49,
            duration: 300
        }).start();
    }

    showHeader() {
        Animated.timing(this.state.headerMargin, {
            toValue: 0,
            duration: 300
        }).start(() => {
            if (typeof this.refs.GrowingContent !== "undefined") {
                this.refs.GrowingContent._root.scrollToPosition(0);
            }
        });
    }

    render() {
        if (this.list.getRowCount() > 0) {
            return (
                <Animated.View style={styles.container_list}>
                    <Container>
                        <AddWishHeader
                            onFocus={this.hideHeader}
                            onEndEditing={this.showHeader}
                            list={this.refs.GrowingContent}
                        />
                        <Content
                            keyboardShouldPersistTaps="always"
                            refreshControl={
                                <RefreshControl
                                    refreshing={this.state.refreshing}
                                    onRefresh={this._onRefresh.bind(this)}
                                />
                            }
                            ref="GrowingContent"
                        >
                            <ListItem itemDivider>
                                <Text>Growing</Text>
                            </ListItem>
                            <List
                                dataSource={this.list}
                                disableRightSwipe
                                renderRow={item => (
                                    <GrowingWish
                                        item={item}
                                        onPress={this.editWish}
                                    />
                                )}
                                renderLeftHiddenRow={() => null}
                                renderRightHiddenRow={(
                                    data,
                                    secId,
                                    rowId,
                                    rowMap
                                ) => (
                                    <Button
                                        full
                                        danger
                                        onPress={_ =>
                                            this.deleteRow(
                                                data,
                                                secId,
                                                rowId,
                                                rowMap
                                            )
                                        }
                                        style={old.rowButton}
                                    >
                                        <Icon active name="trash" />
                                    </Button>
                                )}
                                rightOpenValue={-75}
                            />
                        </Content>
                        <EditModal
                            visible={this.state.edit_modal}
                            wish={this.state.editwish}
                            onDecline={() => {
                                this.setState({
                                    edit_modal: false
                                });
                            }}
                        />
                        <ConfirmModal
                            visible={this.state.modal_visible}
                            onAccept={this._confirmDeleteRow.bind(this)}
                            onDecline={this._dismissModal.bind(this)}
                        />
                    </Container>
                </Animated.View>
            );
        } else {
            return (
                <Animated.View style={this.styles.container_list}>
                    <Container>{this.loadingState()}</Container>
                </Animated.View>
            );
        }
    }

    loadingState() {
        if (this.props.loading) {
            return (
                <Content padder contentContainerStyle={old.content}>
                    <ActivityIndicator size="small" color="#25283d" />;
                </Content>
            );
        }

        return (
            <View style={{ flex: 1 }}>
                <AddWishHeader
                    onFocus={this.hideHeader}
                    onEndEditing={this.showHeader}
                />
                <Content padder>
                    <View style={styles.container_empty}>
                        <H2>No Wishes!</H2>
                        <Text> Add some wishes to get growing! </Text>
                        <Image source={require("../assets/images/barn.png")} />
                    </View>
                </Content>
            </View>
        );
    }

}

const styles = StyleSheet.create({
    container_empty: {
        alignItems: "center",
        height: Layout.window.h_half,
        justifyContent: "center"
    },
    container_list: {
        flex: 1
    }
});

const mapStateToProps = ({ app, wishes }) => {
    const { error, loading } = app;
    const { growing } = wishes;

    return { error, loading, growing };
};

export default connect(mapStateToProps, { WishAdd, WishesFetch, WishDestroy })(
    GrowingList
);
