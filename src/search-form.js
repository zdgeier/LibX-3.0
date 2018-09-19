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

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Title must be at least 3 characters long.")
    .required("Title is required.")
});

const initialValues = {
  title: ""
  // releaseYear: "",
  // genre: "",
  // price: "12"
};

const onSubmit = (values, actions) => {
  // this could also easily use props or other
  // local state to alter the behavior if needed
  // this.props.sendValuesToServer(values)

  setTimeout(() => {
    alert(JSON.stringify(values, null, 2));
    actions.setSubmitting(false);
  }, 1000);
};

class TextFields extends React.Component {
  render() {
    return (
      <Formik
        validationSchema={validationSchema}
        initialValues={initialValues}
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
              disabled={isSubmitting || !dirty}
            >
              Submit
            </Button>
          </Form>
        )}
      />
    );
  }
}

export default withStyles(styles)(TextFields);