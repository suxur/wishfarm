import React, {Component} from 'react';
import {Alert, Animated, ListView} from 'react-native';
import {
    Container,
    Text,
    View,
    Button,
    Toast,
    Content,
    Header,
    Title,
    Left,
    Body,
    Right,
    Icon,
    List,
    ListItem,
    Thumbnail, CheckBox, Form, Item, Input, Footer, FooterTab
} from 'native-base';

import HarvestList from '../Components/HarvestList';
import GrowingList from '../Components/GrowingList';

const styles = {
    button: {
        borderRadius: 0,
        flex: 1
    },
    header: {
        flex: 1,
    }
};

export default class ListPage extends Component {

    constructor(props) {
        super(props);

        // this.top = new Animated.Value(0);

        // this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.state = {
            // name: '',
            // wishes: this.ds.cloneWithRows(),
            tab: false
        };
    }

    pushPage(route) {

        this.props.navigation.navigate(route);
    }

    // componentWillReceiveProps(props) {
    //     this.setState({
    //         wishes: this.ds.cloneWithRows(props.wishes)
    //     });
    // }

    tab(tab) {
        if (tab === 'apps') {
            this.setState({
                tab: true
            });
        } else {
            this.setState({
                tab: false
            })
        }
    }

    render() {
        let view;

        if (this.state.tab) {
            view = <HarvestList/>
        } else {
            view = <GrowingList/>
        }

        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.screenProps.rootNavigation.navigate('DrawerOpen')}
                        >
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>WishFarm</Title>
                    </Body>
                    <Right>
                        <Button transparent onPress={() => this.pushPage('AddWish')}>
                            <Icon name="add"/>
                        </Button>
                    </Right>
                </Header>
                {view}
                <Footer>
                    <FooterTab>
                        <Button active={!this.state.tab} onPress={() => this.tab('navigate')}>
                            <Icon name="leaf"/>
                            <Text>Growing</Text>
                        </Button>
                        <Button active={this.state.tab} onPress={() => this.tab('apps')}>
                            <Icon name="nutrition"/>
                            <Text>Harvest</Text>
                        </Button>
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}
