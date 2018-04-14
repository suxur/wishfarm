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
import { ConfirmModal, EditModal } from "../components";

class GrowingList extends Component {
    state = {
        headerMargin: new Animated.Value(0),
        name: "",
        modalVisible: false,
        edit_modal: false,
        editwish: {},
        refreshing: false,
        rowToDelete: {}
    };

    constructor() {
        super();
        this.editWish = this.editWish.bind(this);
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
            modalVisible: true,
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
        this.setState({ modalVisible: false });
    }

    _onRefresh() {
        this.props.WishesFetch();
    }

    addWish() {
        if (this.state.name !== undefined) {
            this.props.WishAdd(this.state.name);
            this.setState({ name: "" });
            this.refs.AddWishInput.wrappedInstance.focus();
            setTimeout(() => {
                this.refs.GrowingContent._root.scrollToEnd();
            }, 50);
        }
    }

    editWish(wish) {
        this.setState({
            edit_modal: true,
            editwish: wish
        });
    }

    render() {
        if (this.list.getRowCount() > 0) {
            return (
                <Animated.View
                    style={{ flex: 1, marginTop: this.state.headerMargin }}
                >
                    <Container>
                        <Header searchBar rounded>
                            <Item>
                                <Icon name="leaf" />
                                <Input
                                    ref="AddWishInput"
                                    placeholder="Wish"
                                    onChangeText={name =>
                                        this.setState({ name })
                                    }
                                    value={this.state.name}
                                    onFocus={() => {
                                        Animated.timing(
                                            this.state.headerMargin,
                                            {
                                                toValue: -49,
                                                duration: 300
                                            }
                                        ).start();
                                    }}
                                    onEndEditing={() => {
                                        Animated.timing(
                                            this.state.headerMargin,
                                            {
                                                toValue: 0,
                                                duration: 300
                                            }
                                        ).start(() => {
                                            this.refs.GrowingContent._root.scrollToPosition(
                                                0
                                            );
                                        });
                                    }}
                                />
                            </Item>
                            <Button warning onPress={() => this.addWish()}>
                                <Icon name="add" />
                            </Button>
                        </Header>
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
                <H2>No Wishes!</H2>
                <Text> Add some wishes to get growing! </Text>
                <Image source={require("../assets/images/barn.png")} />
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
    const { growing } = wishes;

    return { error, loading, growing };
};

export default connect(mapStateToProps, { WishAdd, WishesFetch, WishDestroy })(
    GrowingList
);
