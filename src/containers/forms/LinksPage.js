import { connect } from 'react-redux'
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { isArray } from 'util';
import { ListItem, ListItemText, List } from '@material-ui/core';

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  }
});

const createTab = (href) => {
  browser.tabs.create({
    url: `${href}`
  });
}

const LinksPage = (props) => {
  var links = props.links;
  if (!isArray(props.links)) {
    links = new Array(props.links);
  }

  return (
    <div className="LinksForm">
      <List>
        {links.map((values, index) => 
            <ListItem 
              key={index} 
              button
              component="a"
              className={props.classes.button}
              onClick={() => createTab(values.href)}>
              <ListItemText primary={values.label}/>
            </ListItem>
        )}
      </List>
    </div>
  );
}

LinksPage.propTypes = {
  links: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.shape({
          href: PropTypes.string,
          label: PropTypes.string
      })),
      PropTypes.object
    ]),
  classes: PropTypes.object
};

const mapStateToProps = state => ({
  links: state.edition.links.url
})

export default connect(
  mapStateToProps
)(withStyles(styles)(LinksPage))