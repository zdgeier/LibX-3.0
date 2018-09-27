import React, { Children } from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, FastField as Field } from "formik";
import Button from "@material-ui/core/Button";
import MaterialField from "@material-ui/core/TextField";

const MaterialInput = ({
  field: { /* value, */ ...fields },
  form: { touched, errors, ...rest },
  ...props
}) => {
  return (
    <MaterialField
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

const styles = theme => ({
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

class SimpleForm extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      initValues: props.initValues
    };
  }

  render() {
    const fields = this.props.fields.map((field) => 
      <Field key={field.name} name={field.name} label={field.label} component={MaterialInput} />
    );
    return (
      <Formik
        onSubmit={this.props.onSubmit}
        initialValues={this.state.initValues}
        render={({ errors, dirty, isSubmitting }) => (
          <Form>
            {fields}
            <Button
              type="submit"
              className="btn btn-default">Submit</Button>
          </Form>
        )}
      />
    );
  }
}

SimpleForm.propTypes = {
  onSubmit: PropTypes.func,
  initValues: PropTypes.object,
  fields: PropTypes.array
}

export default withStyles(styles)(SimpleForm);