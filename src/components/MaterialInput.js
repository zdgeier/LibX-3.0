import React from "react";
import PropTypes from 'prop-types';
import TextField from "@material-ui/core/TextField";

const MaterialInput = ({
    field: { /* value, */ ...fields },
    form: { touched, errors, ...rest },
    ...props
  }) => {
    return (
      <TextField
        {...props}
        {...fields}
        error={Boolean(touched[fields.name] && errors[fields.name])}
        helperText={touched[fields.name] && errors[fields.name]}
      />
    );
};

MaterialInput.propTypes = {
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

export default MaterialInput;