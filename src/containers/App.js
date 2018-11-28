import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import MainDrawer from './MainDrawer';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import LinksIcon from '@material-ui/icons/Link';
import CatalogSearch from './forms/CatalogSearch';
import LinksForm from './forms/LinksForm';
import Settings from './forms/SettingsForm';

class App extends React.Component {
  static propTypes = {
    edition: PropTypes.object.isRequired
  }

  render() {
    if (!("name" in this.props.edition)) {
      return (
        <div className='App'>
          <MainDrawer title='No edition'>
            <Settings title='Settings' icon={<SettingsIcon/>}/>
          </MainDrawer>
        </div>
      );
    }
    else {
      return (
        <div className='App'>
          <MainDrawer title='LibX'>
            <CatalogSearch title='Search' icon={<SearchIcon/>}/>
            <LinksForm title='Links' icon={<LinksIcon/>}/>
            <Settings title='Settings' icon={<SettingsIcon/>}/>
          </MainDrawer>
        </div>
      );
    }
  }
}

const mapStateToProps = state => ({ 
  edition: state.edition
})

export default connect(
  mapStateToProps
)(App)
