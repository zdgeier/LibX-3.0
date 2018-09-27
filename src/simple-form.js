import React, { Children } from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, FastField as Field } from "formik";
import TextField from "./search-text-field";
import Button from "@material-ui/core/Button";

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
  render() {
    const fields = this.props.fields.map((field) => 
      <Field key={field.name} name={field.name} label={field.label} component={TextField} />
    );
    const initValues = {};
    this.props.fields.forEach(f => initValues[f.name] = "");

    return (
      <Formik
        onSubmit={this.props.onSubmit}
        initialValues={initValues}
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
  onSubmit: PropTypes.func.isRequired,
  fields: PropTypes.array
}

export default withStyles(styles)(SimpleForm);