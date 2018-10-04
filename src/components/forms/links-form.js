import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const createTab = (href) => {
  browser.tabs.create({
    url: `${href}`
  });
}

const LinksForm = ({links}) => {
  {links.map((values, index) => {
    return (
      <Button key={index} onClick={() => createTab(values.href)}>{values.label}</Button>
    );
  })}
}

LinksForm.propTypes = {
  links: PropTypes.arrayOf(PropTypes.shape(
    {
      href: PropTypes.string,
      label: PropTypes.string
    }
  )),
};

export default LinksForm;