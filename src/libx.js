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

class LibX extends React.Component {
  constructor(props) {
    super(props);

    const editionHit = localStorage.getItem("links");
    if (editionHit) {
      console.log("hit");
      console.dir(editionHit);
      this.state = {links: JSON.parse(editionHit)};
      return;
    }

    this.state = {
      links: [
        {
          href: "test",
          label: "hi"
        }
      ]
    }
  }

  storeItem = ({item, key}) => {
    localStorage.setItem(key, JSON.stringify(item));
    this.setState({links: item});
  }

  submitSettings = (values) => {
    const editionHit = localStorage.getItem(values.edition);
    if (editionHit) {
      this.setState({links: editionHit});
      return;
    }

    fetch(values.edition).then((data) => {
      var parser = new xml2js.Parser({mergeAttrs: true, explicitArray: false});
      data.text().then((text) => {
        parser.parseString(text, (err, result) => {
        console.dir(result);
        this.storeItem({item: result.edition.links.url, key: "links"});
        //this.setState({links: result.edition.links.url});
      }) });
    })
  };
 
  render() {
    return (
      <MainDrawer title={"LibX"}>
        <SearchForm title="Search" icon={<SearchIcon/>} onSubmit={submitSearch} />
        <LinksForm title="Links" icon={<LinksIcon/>} links={this.state.links} />
        <SettingsForm title="Settings" icon={<SettingsIcon/>} onSubmit={this.submitSettings} />
      </MainDrawer>
   )
  }
}

ReactDOM.render(<LibX/>, document.getElementById('app'));
