import React from "react";
import { withStyles } from "@material-ui/core/styles";
import TextField from "./search-text-field";
import { Formik, Form, FastField as Field } from "formik";
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

const onSubmit = (values, actions) => {
  var creating = browser.tabs.create({
    url: `https://catalog.lib.vt.edu/cgi-bin/koha/opac-search.pl?q=${values.keyword}`
  });
  fetch("http://libx.org/editions/vt/config.xml").then((data) => {
    console.dir(data);
  })
};

class TextFields extends React.Component {
  render() {
    return (
      <Formik
        onSubmit={onSubmit}
        render={({ errors, dirty, isSubmitting }) => (
          <Form>
            <Field name="keyword" label="Keyword" component={TextField} />
            <Field name="title" label="Title" component={TextField} />
            <Field name="journal-title" label="Journal Title" component={TextField} />
            <Field name="author" label="Author" component={TextField} />
            <Field name="subject" label="Subject" component={TextField} />
            <Field name="isbn" label="ISBN/ISSN" component={TextField} />
            <Field name="call-number" label="Call Number" component={TextField} />

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