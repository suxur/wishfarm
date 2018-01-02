import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Body, Button, ListItem, Grid, Col} from 'native-base';
import moment from 'moment';
import firebase from 'firebase';
import ProgressBar from './ProgressBar';

export default class GrowingWish extends Component {
    constructor(props) {
        super(props);

        this.user = firebase.auth().currentUser;
    }

    harvest(wish) {
        wish.harvested = true;

        // Write the new post's data simultaneously in the posts list and the user's post list.
        let updates = {};
        updates['/wishes/' + wish._key] = wish;
        updates['/user-wishes/' + this.user.uid + '/' + wish._key] = wish;

        return firebase.database().ref().update(updates);
    }

    discard() {
        let { dispatch } = this.props;
        dispatch({type: 'DESTROY_WISH', wish: this.props.item});
    }

    getDays(date) {
        let now = moment();
        let created = moment(date);

        return now.diff(created, 'days');
    }

    render() {
        let wish = this.props.item;

        wish.days = this.getDays(wish.created_at);

        if (wish.days >= 30) {
            return (
                <ListItem style={styles.readyRow}>
                    <Body>
                    <Text style={styles.readyText}>Still want "{wish.name}"?</Text>
                    <Grid>
                        <Col>
                            <Button success style={styles.button} onPress={() => this.harvest(wish)}>
                                <Text style={styles.buttonFont}>Yes</Text>
                            </Button>
                        </Col>
                        <Col>
                            <Button warning style={styles.button2} onPress={() => this.discard()}>
                                <Text style={styles.buttonFont}>No</Text>
                            </Button>
                        </Col>
                    </Grid>
                    </Body>
                </ListItem>
            );
        } else {
            return (
                <ListItem style={styles.row}>
                    <Body>
                    <Text style={styles.text}>{wish.name}</Text>
                    <Text style={styles.note}>
                        {wish.days} Days
                    </Text>
                    <ProgressBar complete={wish.days}/>
                    </Body>
                </ListItem>
            );
        }
    }
}



let fontFamily = 'PatrickHand';

let styles = StyleSheet.create({
    row: {
        backgroundColor: '#FFFBFA',
        borderColor: '#25283D',
        paddingLeft: 15,
        marginLeft: 0
    },
    readyRow: {
        backgroundColor: '#FFFBFA',
        borderColor: '#25283D',
        paddingLeft: 15,
        marginLeft: 0
    },
    text: {
        color: 'black',
        fontFamily: fontFamily,
        marginLeft: 5,
        marginBottom: 10,
        fontSize: 18,
    },
    readyText: {
        color: 'black',
        fontFamily: fontFamily,
        marginBottom: 10,
        fontSize: 18,
        textAlign: 'center'
    },
    note: {
        fontFamily: fontFamily,
        position: 'absolute',
        right: 5,
        top: 12,
        fontSize: 14,
    },
    buttons: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    button: {
        alignSelf: 'flex-end',
        marginRight: 5,
        width: 80,
        justifyContent: 'center',
        height: 40,
    },
    buttonFont: {
        fontFamily: fontFamily,
    },
    button2: {
        alignSelf: 'flex-start',
        marginLeft: 5,
        width: 80,
        justifyContent: 'center',
        height: 40,
    }
});

