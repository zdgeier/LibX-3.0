// This file is shared across the demos.

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

const LibXListItem = ({onClick, description, children}) => (
  <ListItem button onClick={() => onClick(description)}>
    <ListItemIcon>
      {children}
    </ListItemIcon>
    <ListItemText primary={description.label} />
  </ListItem>
);

LibXListItem.propTypes = {
  onClick: PropTypes.func,
  description: PropTypes.object,
  children: PropTypes.any
}


class ViewIcons extends React.Component {
  render () {
    return (
      <div>
        {this.props.drawerDescription.map((desc, index) => {
          return (
            <LibXListItem key={index} description={desc} onClick={this.props.onClick}>
              <desc.icon/>
            </LibXListItem>
          );
        })}
      </div>
    );
  }
}

ViewIcons.propTypes = {
  drawerDescription: PropTypes.array,
  listSelectHandler: PropTypes.func,
  onClick: PropTypes.func
}

export default ViewIcons;