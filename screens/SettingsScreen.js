import React, {Component} from 'react';
import {
    Container,
    Text,
    Button,
    Content,
    Header,
    Title,
    Left,
    Body,
    Right,
    Icon,
    ListItem,
    Separator
} from 'native-base';

class SettingsScreen extends Component {
    static navigationOptions = {
        title: "Settings",
        drawerIcon: <Icon name="cog" active={true} style={{color: "#fffbfa"}}/>,
    };

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

export default SettingsScreen;