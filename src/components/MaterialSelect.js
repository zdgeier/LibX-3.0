import React from "react";
import PropTypes from 'prop-types';
import Select from "@material-ui/core/Select";

const MaterialSelect = ({
    field: { /* value, */ ...fields },
    form: { touched, errors, ...rest },
    ...props
  }) => {
    return (
      <Select
        {...props}
        {...fields}
        error={Boolean(touched[fields.name] && errors[fields.name])}
      />
    );
};

MaterialSelect.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object
  }).isRequired,
  label: PropTypes.string.isRequired
};

export default MaterialSelect;