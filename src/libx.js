import React from 'react';
import ReactDOM from 'react-dom';
import MainDrawer from './main-drawer';
import SettingsForm from "./settings-form";
import LinksForm from "./links-form";
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import LinksIcon from '@material-ui/icons/Link';
import SimpleForm from "./simple-form"
import xml2js from 'xml2js';

const searchFields = [
  { name: "keyword", label: "Keyword" },
  { name: "title", label: "Title" },
  { name: "journalTitle", label: "Journal Title" },
  { name: "author", label: "Author" },
  { name: "subject", label: "Subject" },
  { name: "isbn", label: "ISBN/ISSN" },
  { name: "callNumber", label: "Call Number" }
]

const submitSearch = (values, actions) => {
  var creating = browser.tabs.create({
    url: `https://catalog.lib.vt.edu/cgi-bin/koha/opac-search.pl?q=${values.keyword}`
  });
};

const settingsFields = [
  { name: "edition", label: "Edition" }
]

const submitSettings = (values, actions) => {
  fetch(values.edition).then((data) => {
    var parser = new xml2js.Parser();
    data.text().then((text) => {parser.parseString(text, (err, result) => {
      console.dir(result);
      console.log('Done');
    }) });
  })
};

class LibX extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      libxDescription: [
        {
          label: "Search",
          icon: SearchIcon,
          content: SimpleForm,
          descProps: {
            onSubmit: submitSearch, 
            fields: searchFields
          },
        },
        {
          label: "Links",
          icon: LinksIcon,
          content: LinksForm,
          descProps: {links: "test"},
        },
        {
          label: "Settings",
          icon: SettingsIcon,
          content: SimpleForm,
          descProps: {
            onSubmit: submitSettings, 
            fields: settingsFields
          },
        }
      ]
    }
  }

  updateLinks = (links) => {
    console.dir(links);
  }

  render() {
   return (
       <MainDrawer drawerDescription={this.state.libxDescription} title={"LibX"}/>
   )
  }
}

ReactDOM.render(<LibX/>, document.getElementById('app'));
