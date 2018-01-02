import React, {Component} from 'react';
import {Alert, ListView, Image, ActivityIndicator} from 'react-native';
import {
    Text,
    View,
    Button,
    Icon,
    List,
    ListItem,
    Content,
    Form,
    Item,
    Input,
    Header,
    Body,
    H1,
    H3
} from 'native-base';
import firebase from 'firebase';
import GrowingWish from './GrowingWish'

export default class GrowingList extends Component {

    constructor(props) {
        super(props);

        this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.user = firebase.auth().currentUser;
        this.database = firebase.database().ref('user-wishes/' + this.user.uid);

        this.state = {
            loading: true,
            deleteRow: null,
            wishes: this.ds.cloneWithRows([]),
        };
    }

    componentDidMount() {
        this.listenForItems(this.database);
    }

    componentWillUnmount() {
        this.database.off();
    }

    listenForItems(itemsRef) {
        itemsRef.on('value', (snap) => {

            // get children as an array
            var items = [];
            snap.forEach((child) => {
                items.push({
                    name: child.val().name,
                    harvested: child.val().harvested,
                    created_at: child.val().created_at,
                    _key: child.key
                });
            });

            this.setState({
                loading: false,
                wishes: this.ds.cloneWithRows(items)
            });

        });
    }

    deleteRow(data, secId, rowId, rowMap) {
        Alert.alert(
            'Whoa there!',
            'You are about to delete this, are you sure?',
            [
                {
                    text: 'Cancel', onPress: () => {
                }, style: 'cancel'
                },
                {text: 'Delete', onPress: () => this.confirmDeleteRow(data, secId, rowId, rowMap)},
            ]
        )
    }

    confirmDeleteRow(data, secId, rowId, rowMap) {
        rowMap[`${secId}${rowId}`].props.closeRow();

        firebase.database().ref('/wishes/' + data._key).remove();
        firebase.database().ref('/user-wishes/' + this.user.uid + '/' + data._key).remove();
    }

    render() {
        if (this.state.wishes.getRowCount() > 0) {
            return (
                <Content keyboardShouldPersistTaps="always">
                    <ListItem itemDivider>
                        <Text>Growing!</Text>
                    </ListItem>
                    <List
                        dataSource={this.state.wishes}
                        disableRightSwipe={true}
                        renderRow={item => (<GrowingWish item={item}/>)}
                        renderLeftHiddenRow={() => null}
                        renderRightHiddenRow={(data, secId, rowId, rowMap) =>
                            <Button
                                full
                                danger
                                onPress={_ => this.deleteRow(data, secId, rowId, rowMap)}
                                style={styles.button}
                            >
                                <Icon active name="trash"/>
                            </Button>}
                        rightOpenValue={-75}
                    />
                </Content>
            );
        } else {
            return (
                <Content padder contentContainerStyle={styles.content}>
                    {this.loadingState()}
                </Content>
            );
        }
    }


    loadingState() {
        if (this.state.loading) {
            return <ActivityIndicator size="small" color="#25283d"/>
        }

        return (<View>
            <H1 style={styles.text}>No Wishes!</H1>
            <H3 style={styles.text}>Add some wishes to get growing!</H3>
            <Image source={require("../assets/images/barn.png")} style={styles.image}/>
            </View>
        )
    }
}

const styles = {
    content: {
        flex: 1,
        justifyContent: 'center'
    },
    image: {
        alignSelf: 'center'
    },
    button: {
        borderRadius: 0,
        flex: 1
    },
    header: {
        flex: 1,
    },
    text: {
        alignSelf: 'center',
        marginBottom: 15
    }
};
