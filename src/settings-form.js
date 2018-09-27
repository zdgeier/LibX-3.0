import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import TextField from "./search-text-field";
import { Formik, Form, FastField as Field } from "formik";
import Button from "@material-ui/core/Button";
import xml2js from 'xml2js';

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

function myFunction(xml) {
  console.log(xml.responseText);
}

const initialValues = {
  edition: "",
}

class TextFields extends React.Component {
  onSubmit = (values, actions) => {
    fetch(values.edition).then((data) => {
      var parser = new xml2js.Parser();
      data.text().then((text) => {parser.parseString(text, (err, result) => {
        console.dir(result);
        console.log('Done');
      }) });
    })
  };

  render() {
    return (
      <Formik
        onSubmit={this.onSubmit}
        initialValues={initialValues}
        render={({ errors, dirty, isSubmitting }) => (
          <Form>
            <Field name="edition" label="Edition" component={TextField} />
            <Button
              type="submit"
              className="btn btn-default"
              disabled={isSubmitting || !dirty}>Submit</Button>
          </Form>
        )}
      />
    );
  }
}

TextFields.propTypes = {
  onSubmit: PropTypes.func.isRequired,
}

export default withStyles(styles)(TextFields);