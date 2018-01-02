import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Text, Body, ListItem, Right, CheckBox} from 'native-base';

export default class HarvestWish extends Component {
    render() {
        let wish = this.props.item;

        return (
            <ListItem style={styles.row}>
                <Body>
                    <Text style={styles.text}>{wish.name}</Text>
                </Body>
                <Right>
                    <CheckBox checked={wish.purchased}/>
                </Right>
            </ListItem>
        );
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
    text: {
        color: 'black',
        fontFamily: fontFamily,
        marginLeft: 5,
        fontSize: 18
    },
    note: {
        fontFamily: fontFamily,
        position: 'absolute',
        right: 5,
        top: 12,
        fontSize: 14,
    }
});