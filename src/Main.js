import React, { Component } from 'react';
import MiniDrawer from "./MiniDrawer";
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import LinksIcon from '@material-ui/icons/Link';
import AutosuggestSearch from "./AutosuggestSearch";

const Lorem = (temp) => {
    return (
        <div>
            <AutosuggestSearch/>
            <Typography paragraph> Lorem {temp} </Typography>
        </div>
    );
};

const Ipsum = (temp) => {
    return (
        <Typography paragraph> Ipsum {temp} </Typography>
    );
};

const Dolor = (temp) => {
    return (
        <Typography paragraph> Dolor {temp} </Typography>
    );
};

const pages = [
    {icon: <SearchIcon />, title: 'Search', pageContent: Lorem},
    {icon: <LinksIcon />, title: 'Links', pageContent: Ipsum},
    {icon: <SettingsIcon />, title: 'Settings', pageContent: Dolor},
];

const listItems = pages.map((page) => {
    return {icon: page.icon, text: page.title};
});

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedPage: 0,
        }
    }

    drawerOnClick = (index) => {
        this.setState({
            edition: this.state.edition,
            selectedPage: index,
        });
    };

    render() {
        return (
            <MiniDrawer
                drawerOnClick={this.drawerOnClick}
                listItems={listItems}
            >
                {new pages[this.state.selectedPage].pageContent(1)}
            </MiniDrawer>
        );
    }
}

export default Main;
