// This file is shared across the demos.

import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DraftsIcon from '@material-ui/icons/L';
import StarIcon from '@material-ui/icons/Star';
import SendIcon from '@material-ui/icons/Send';
import SearchIcon from '@material-ui/icons/Search';

const LibXListItem = (props) => {
  return (
    <ListItem button>
      <ListItemIcon>
        {props.children}
      </ListItemIcon>
      <ListItemText primary={props.text} />
    </ListItem>
  );
}

LibXListItem.propTypes = {
  children: PropTypes.any,
  text: PropTypes.text,
}

export const ViewIcons = (
  <div>
    <LibXListItem text="Search"><SearchIcon/></LibXListItem>
    <LibXListItem text="Links"></LibXListItem>
    <LibXListItem text="Search1"><SearchIcon/></LibXListItem>
    <LibXListItem text="Search1"><SearchIcon/></LibXListItem>
    <LibXListItem text="Search1"><SearchIcon/></LibXListItem>
    <ListItem button>
      <ListItemIcon>
        <StarIcon />
      </ListItemIcon>
      <ListItemText primary="Starred" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <SendIcon />
      </ListItemIcon>
      <ListItemText primary="Send mail" />
    </ListItem>
    <ListItem button>
      <ListItemIcon>
        <DraftsIcon />
      </ListItemIcon>
      <ListItemText primary="Drafts" />
    </ListItem>
  </div>
);