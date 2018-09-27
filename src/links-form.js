import React from "react";
import PropTypes from 'prop-types';

class LinksForm extends React.Component {
  render() {
    return (
      <div>
        {this.props.links}
      </div>
    );
  }
}

LinksForm.propTypes = {
  links: PropTypes.string,
};

export default LinksForm;