import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import MainDrawer from '../components/MainDrawer';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import LinksIcon from '@material-ui/icons/Link';
import SearchForm from '../components/forms/SearchForm';
import ActiveLinks from './ActiveLinks';
import Settings from './Settings';

class App extends React.Component {
  static propTypes = {
    edition: PropTypes.string.isRequired
  }

  render() {
    return (
      <div className='App'>
        <MainDrawer title={this.props.edition}>
          <SearchForm title='Search' icon={<SearchIcon/>}/>
          <ActiveLinks title='Links' icon={<LinksIcon/>}/>
          <Settings title='Settings' icon={<SettingsIcon/>}/>
        </MainDrawer>
      </div>
   )
  }
}

const mapStateToProps = state => ({ 
  edition: state.edition
})

export default connect(
  mapStateToProps
)(App)
