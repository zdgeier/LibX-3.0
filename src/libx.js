import React from 'react';
import ReactDOM from 'react-dom';
import MainDrawer from './main-drawer';
import SearchForm from "./search-form";
import SettingsForm from "./settings-form";
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';

const libxDescription = [
  {
    label: "Search",
    icon: SearchIcon,
    content: SearchForm,
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    content: SettingsForm,
  }
];

class LibX extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   return (
       <MainDrawer drawerDescription={libxDescription} title={"LibX"}> </MainDrawer>
   )
  }
}

ReactDOM.render(<LibX/>, document.getElementById('app'));
