import React, {Component} from 'react';
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
    Thumbnail, Form, Item, Input, Grid, Col, Row,
    Separator
} from 'native-base';

export default class Settings extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <Button
                            transparent
                            onPress={() => this.props.navigation.navigate('DrawerOpen')}
                        >
                            <Icon name="menu"/>
                        </Button>
                    </Left>
                    <Body>
                    <Title>Settings</Title>
                    </Body>
                    <Right></Right>
                </Header>
                <Content keyboardShouldPersistTaps="always">

                    <Separator bordered noTopBorder/>
                    <ListItem icon>
                        <Left>
                            <Button style={{backgroundColor: "#FF9501"}}>
                                <Icon active name="md-time"/>
                            </Button>
                        </Left>
                        <Body>
                        <Text>Days to Grow?</Text>
                        </Body>
                        <Right>
                        </Right>
                    </ListItem>
                </Content>
            </Container>
        );
    }
}