import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "./search-text-field";
import { Formik, Form, FastField as Field } from "formik";
import Button from "@material-ui/core/Button";
import * as Yup from "yup";

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
    console.log(xmlDoc.responseText);
}

const onSubmit = (values, actions) => {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
        myFunction(this);
        }
    };
    xhttp.open("GET", "http://libx.org/editions/13/F3/13F32FF9/config.xml", true);
    xhttp.send();
};

class TextFields extends React.Component {
  render() {
    return (
      <Formik
        onSubmit={onSubmit}
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

export default withStyles(styles)(TextFields);