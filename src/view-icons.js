// This file is shared across the demos.

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import LinkIcon from '@material-ui/icons/Link';

class ViewIcons extends React.Component {
  LibXListItem = (children, text) => {
    return (
      <ListItem button onClick={this.props.listSelectHandler(text)}>
        <ListItemIcon>
          {children}
        </ListItemIcon>
        <ListItemText primary={text} />
      </ListItem>
    );
  }

  render () {
    return (
      <p>hello</p>
    );
  }
}

ViewIcons.propTypes = {
  listSelectHandler: PropTypes.func
}

export default ViewIcons;