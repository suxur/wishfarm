import React, {Component} from 'react';
import {Text, Body, ListItem, Right, CheckBox} from 'native-base';
import {connect} from 'react-redux';
import styles from '../constants/Styles';
import {WishSave} from '../store/actions';

class HarvestWish extends Component {

    _togglePurchase(wish) {
        wish.purchased = !wish.purchased;
        this.props.WishSave(wish);
    }

    render() {
        let wish = this.props.item;

        if (wish.purchased) {
            return (
                <ListItem style={styles.rowPurchased}>
                    <Body>
                    <Text style={styles.rowPurchasedTitleText}>{wish.name}</Text>
                    </Body>
                    <Right>
                        <CheckBox checked={wish.purchased} onPress={() => this._togglePurchase(wish)}/>
                    </Right>
                </ListItem>
            )
        } else {
            return (
                <ListItem style={styles.row}>
                    <Body>
                    <Text style={styles.rowTitleText}>{wish.name}</Text>
                    </Body>
                    <Right>
                        <CheckBox checked={wish.purchased} onPress={() => this._togglePurchase(wish)}/>
                    </Right>
                </ListItem>
            );
        }
    }
}

export default connect(null, {WishSave})(HarvestWish);
