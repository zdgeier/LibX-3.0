import { connect } from 'react-redux'
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { isArray } from 'util';

const createTab = (href) => {
  browser.tabs.create({
    url: `${href}`
  });
}

const LinksForm = ({links}) => {
  if (!isArray(links)) {
    links = new Array(links);
  }

  return (
    <div className="LinksForm">
      {links.map((values, index) => 
          <Button key={index} onClick={() => createTab(values.href)}>{values.label}</Button>
      )}
    </div>
  );
}

LinksForm.propTypes = {
  links: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.shape({
        href: PropTypes.string,
        label: PropTypes.string
    })),
    PropTypes.object
  ])
};

const mapStateToProps = state => ({
  links: state.edition.links.url
})

export default connect(
  mapStateToProps
)(LinksForm)