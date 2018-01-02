import React, {Component} from 'react';
import {Alert, ListView} from 'react-native';
import {
    Text,
    View,
    Button,
    Icon,
    List,
    ListItem,
    Content
} from 'native-base';
import {connect} from 'react-redux';

import HarvestWish from './HarvestWish'

const growing = [
    {
        name: 'Nintendo Switch',
        purchased: false
    },
    {
        name: 'Bed Sheets',
        purchased: false
    },
    {
        name: 'Puppy Dog',
        purchased: true
    }
];

export default class HarvestList extends Component {

    // constructor(props) {
    //     super(props);
    //
    //     this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //
    //     this.state = {
    //         wishes: this.ds.cloneWithRows(this.props.wishes),
    //     };
    // }
    //
    // deleteRow(secId, rowId, rowMap) {
    //     Alert.alert(
    //         'Whoa there!',
    //         'You are about to delete this, are you sure?',
    //         [
    //             {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
    //             {text: 'Delete', onPress: () => this.confirmDeleteRow(secId, rowId, rowMap)},
    //         ]
    //     )
    // }
    //
    // componentWillReceiveProps(props) {
    //     this.setState({
    //         wishes: this.ds.cloneWithRows(props.wishes)
    //     });
    // }
    //
    // confirmDeleteRow(secId, rowId, rowMap) {
    //     let {dispatch} = this.props;
    //     let wish = this.props.wishes[rowId];
    //     rowMap[`${secId}${rowId}`].props.closeRow();
    //     dispatch({type: 'DESTROY_WISH', wish: wish});
    // }

    render() {
        return (
            <Content keyboardShouldPersistTaps="always">
                <ListItem itemDivider>
                    <Text>Ready to Harvest!</Text>
                </ListItem>
                <List
                    dataArray={growing}
                    renderRow={item => (<HarvestWish item={item}/>)}
                />
            </Content>
        );
    }
}

// const styles = {
//     button: {
//         borderRadius: 0,
//         flex: 1
//     },
//     header: {
//         flex: 1,
//     }
// };

// function mapStateToProps(state) {
//     return {
//         wishes: state.wishes
//     }
// }

// export default connect(mapStateToProps)(GrowingList);