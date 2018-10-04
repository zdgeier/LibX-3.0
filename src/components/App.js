import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainDrawer from './main-drawer';
import LinksForm from './forms/links-form';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import LinksIcon from '@material-ui/icons/Link';
import SearchForm from './forms/search-form';
import SettingsForm from './forms/settings-form';
import xml2js from 'xml2js';
import ActiveLinks from '../containers/ActiveLinks';

const submitSearch = (values) => {
  browser.tabs.create({
    url: `https://catalog.lib.vt.edu/cgi-bin/koha/opac-search.pl?q=${values.keyword}`
  });
};

class App extends React.Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.object)
  }

  /*
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
  */

  render() {
    return (
      <div className='App'>
        <MainDrawer>
          <SearchForm/>
          <ActiveLinks links={this.props.links} />
          <SettingsForm/>
        </MainDrawer>
      </div>
   )
  }
}

export default App
