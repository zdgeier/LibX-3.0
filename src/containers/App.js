import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainDrawer from '../components/main-drawer';
import LinksForm from '../components/forms/links-form';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import LinksIcon from '@material-ui/icons/Link';
import SearchForm from '../components/forms/search-form';
import SettingsForm from '../components/forms/settings-form';
import xml2js from 'xml2js';
import ActiveLinks from './ActiveLinks';
import Settings from './Settings';
import { fetchEdition } from '../actions';

const submitSearch = (values) => {
  browser.tabs.create({
    url: `https://catalog.lib.vt.edu/cgi-bin/koha/opac-search.pl?q=${values.keyword}`
  });
};

class App extends React.Component {
  static propTypes = {
    links: PropTypes.arrayOf(PropTypes.object),
  }

  render() {
    return (
      <div className='App'>
        <MainDrawer title='LibX'>
          <SearchForm title="Search" icon={<SearchIcon/>} onSubmit={submitSearch}/>
          <ActiveLinks title="Links" icon={<LinksIcon/>}/>
          <Settings title="Settings" icon={<SettingsIcon/>} onSubmit={this.submitSettings}/>
        </MainDrawer>
      </div>
   )
  }
}

export default App
