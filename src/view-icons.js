// This file is shared across the demos.

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SettingsIcon from '@material-ui/icons/Settings';
import SearchIcon from '@material-ui/icons/Search';
import LinkIcon from '@material-ui/icons/Link';
import InfoIcon from '@material-ui/icons/Info';
import CodeIcon from '@material-ui/icons/Code';

const LibXListItem = ({onClick, text, children}) => (
  <ListItem button onClick={() => onClick(text)}>
    <ListItemIcon>
      {children}
    </ListItemIcon>
    <ListItemText primary={text} />
  </ListItem>
);

LibXListItem.propTypes = {
  onClick: PropTypes.func,
  text: PropTypes.string,
  children: PropTypes.any
}


class ViewIcons extends React.Component {
  render () {
    return (
      <div>
        <LibXListItem text="Search" onClick={this.props.onClick}>
          <SearchIcon/>
        </LibXListItem>
        <LibXListItem text="Links" onClick={this.props.onClick}>
          <LinkIcon/>
        </LibXListItem>
        <LibXListItem text="Settings" onClick={this.props.onClick}>
          <SettingsIcon/>
        </LibXListItem>
        <LibXListItem text="About" onClick={this.props.onClick}>
          <InfoIcon />
        </LibXListItem>
        <LibXListItem text="Developer" onClick={this.props.onClick}>
          <CodeIcon />
        </LibXListItem>
      </div>
    );
  }
}

ViewIcons.propTypes = {
  listSelectHandler: PropTypes.func,
  onClick: PropTypes.func
}

export default ViewIcons;