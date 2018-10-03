import React from 'react';
import ReactDOM from 'react-dom';
import MainDrawer from './main-drawer';
import LinksForm from './links-form';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import LinksIcon from '@material-ui/icons/Link';
import SearchForm from './search-form';
import SettingsForm from './settings-form';
import xml2js from 'xml2js';

const submitSearch = (values) => {
  browser.tabs.create({
    url: `https://catalog.lib.vt.edu/cgi-bin/koha/opac-search.pl?q=${values.keyword}`
  });
};

const submitSettings = (values) => {
  fetch(values.edition).then((data) => {
    var parser = new xml2js.Parser();
    data.text().then((text) => {parser.parseString(text, (err, result) => {
      console.dir(result);
      console.log('Done');
    }) });
  })
};

const libxDescription = [
  {
    label: "Search",
    icon: SearchIcon,
    content: SearchForm,
    descProps: {
      onSubmit: submitSearch, 
    },
  },
  {
    label: "Links",
    icon: LinksIcon,
    content: LinksForm,
    descProps: {
      links: "test"
    },
  },
  {
    label: "Settings",
    icon: SettingsIcon,
    content: SettingsForm,
    descProps: {
      onSubmit: submitSettings, 
    },
  }
]

class LibX extends React.Component {
  constructor(props) {
    super(props);
  }

  updateLinks = (links) => {
    console.dir(links);
  }
 
  render() {
   return (
       <MainDrawer drawerDescription={libxDescription} title={"LibX"}/>
   )
  }
}

ReactDOM.render(<LibX/>, document.getElementById('app'));
