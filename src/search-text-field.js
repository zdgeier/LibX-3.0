import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
//import TextField from "./TextField";
import { pure } from "recompose";
import FormControl1 from "@material-ui/core/FormControl";

import FormLabel from "@material-ui/core/FormLabel";

// const TextField = pure(TextField1);
const FormControl = pure(FormControl1);

const inputLabelProps = {
  component: pure(FormLabel)
};

const MaterialInput = ({
  field: { /* value, */ ...fields },
  form: { touched, errors, ...rest },
  ...props
}) => {
  // console.log(rest);
  // console.log({ value });
  console.log({ fields });
  return (
    <TextField
      {...props}
      {...fields}
      //value={rest.values[props.name]}
      //InputLabelProps={inputLabelProps}
      //component={FormControl}
      // value={rest.values[props.name]}
      error={Boolean(touched[fields.name] && errors[fields.name])}
      //label={(touched[field.name] && errors[field.name]) || label}
      helperText={touched[fields.name] && errors[fields.name]}
    />
  );
};

MaterialInput.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string,
    value: PropTypes.any,
    onChange: PropTypes.func,
    onBlur: PropTypes.func
  }).isRequired,
  form: PropTypes.shape({
    touched: PropTypes.object,
    errors: PropTypes.object
    // the rest of the formik bag too
  }).isRequired,
  label: PropTypes.string.isRequired
};

export default MaterialInput;
