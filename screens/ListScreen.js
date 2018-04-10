import React, { Component } from "react";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {
    Container,
    Header,
    Title,
    Left,
    Body,
    Right,
    Footer,
    FooterTab
} from "native-base";

import HarvestList from "../components/HarvestList";
import GrowingList from "../components/GrowingList";
import { WishesFetch } from "../store/actions";
import { HeaderButton, TabButton } from "../components";

class ListScreenComponent extends Component {
    state = {
        tab: "growing"
    };

    constructor() {
        super();

        this.showWish = this.showWish.bind(this);
    }

    componentWillMount() {
        this.props.WishesFetch();
    }

    switchTab(tab) {
        this.setState({ tab });
    }

    showWish(wish) {
        this.props.navigation.dispatch(
            NavigationActions.navigate({
                routeName: "ShowWishScreen",
                params: { wish }
            })
        );
    }

    renderView() {
        if (this.state.tab === "harvest") {
            return <HarvestList />;
        }

        return <GrowingList onPress={this.showWish} />;
    }

    render() {
        return (
            <Container>
                <Header>
                    <Left>
                        <HeaderButton icon="menu" route="DrawerOpen" />
                    </Left>
                    <Body>
                        <Title>WishFarm</Title>
                    </Body>
                    <Right>
                    </Right>
                </Header>
                {this.renderView()}
                <Footer>
                    <FooterTab>
                        <TabButton
                            title="Growing"
                            icon="leaf"
                            active={this.state.tab === "growing"}
                            onPress={() => this.switchTab("growing")}
                        />
                        <TabButton
                            title="Harvest"
                            icon="nutrition"
                            active={this.state.tab === "harvest"}
                            onPress={() => this.switchTab("harvest")}
                        />
                    </FooterTab>
                </Footer>
            </Container>
        );
    }
}

const mapStateToProps = ({ app }) => {
    const { error, loading } = app;
    return { error, loading };
};

const ListScreen = connect(mapStateToProps, { WishesFetch })(
    ListScreenComponent
);

export { ListScreen };
