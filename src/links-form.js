import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

const createTab = (href) => {
  browser.tabs.create({
    url: `${href}`
  });
}
class LinksForm extends React.Component {
  render() {
    console.log("links");
    console.dir(this.props.links);
    return (
      <div className="LinksForm">
        {this.props.links.map((values, index) => {
          return (
            <Button key={index} onClick={() => createTab(values.href)}>{values.label}</Button>
          );
        })}
      </div>
    );
  }
}

LinksForm.propTypes = {
  links: PropTypes.array,
};

export default LinksForm;