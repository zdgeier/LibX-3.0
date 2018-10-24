import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const createTab = (href) => {
  browser.tabs.create({
    url: `${href}`
  });
}

const LinksForm = ({links}) => (
  <div className="LinksForm">
    {links.map((values, index) => 
        <Button key={index} onClick={() => createTab(values.href)}>{values.label}</Button>
    )}
  </div>
)

LinksForm.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape(
    {
      href: PropTypes.string,
      label: PropTypes.string
    }
  )),
};

export default LinksForm;