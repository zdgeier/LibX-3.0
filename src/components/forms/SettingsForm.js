import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, FastField as Field } from "formik";
import Button from "@material-ui/core/Button";
import MaterialInput from "../input/MaterialInput";
import { fetchEdition } from "../../actions"

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

const handleSubmit = values => {
  console.log("Settings submit");
  console.dir(values);
  fetchEdition(values.edition);
}

const SettingsForm = ({ onSubmit }) => (
  <Formik
    onSubmit={onSubmit}
    initialValues={initialSettingsValues}
    render={({ errors, dirty, isSubmitting }) => (
      <Form>
        <Field name="edition" label="Edition" component={MaterialInput} />
        <Button
          type="submit"
          className="btn btn-default">Submit</Button>
      </Form>
    )}
  />
)

const initialSettingsValues = {
  edition: ""
}

/*
class SettingsForm extends React.Component {
  render() {
    return (
      <Formik
        onSubmit={handleSubmit}
        initialValues={initialSettingsValues}
        render={({ errors, dirty, isSubmitting }) => (
          <Form>
            <Field name="edition" label="Edition" component={MaterialInput} />
            <Button
              type="submit"
              className="btn btn-default">Submit</Button>
          </Form>
        )}
      />
    );
  }
}

SettingsForm.propTypes = {
  onSubmit: PropTypes.func,
  initValues: PropTypes.object,
  fields: PropTypes.array,
  onClick: PropTypes.func
}
*/
SettingsForm.propTypes = {
  //changeEdition: PropTypes.func
  onSubmit: PropTypes.func
}

export default withStyles(styles)(SettingsForm);