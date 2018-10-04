import React from "react";
import PropTypes from 'prop-types';
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, FastField as Field } from "formik";
import Button from "@material-ui/core/Button";
import MaterialInput from "../input/MaterialInput";

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

const submitSearch = (values) => {
  browser.tabs.create({
    url: `https://catalog.lib.vt.edu/cgi-bin/koha/opac-search.pl?q=${values.keyword}`
  });
};

const initialSearchValues = {
  keyword: "",
  title: "",
  journalTitle: "",
  author: "",
  subject: "",
  isbn: "",
  callNumber: ""
}

class SearchForm extends React.Component {
  render() {
    return (
      <Formik
        onSubmit={this.props.onSubmit}
        initialValues={initialSearchValues}
        render={({ errors, dirty, isSubmitting }) => (
          <Form>
            <Field name="keyword" label="Keyword" component={MaterialInput} />
            <Field name="title" label="Title" component={MaterialInput} />
            <Field name="journalTitle" label="Journal Title" component={MaterialInput} />
            <Field name="author" label="Author" component={MaterialInput} />
            <Field name="subject" label="Subject" component={MaterialInput} />
            <Field name="isbn" label="ISBN/ISSN" component={MaterialInput} />
            <Field name="callNumber" label="Call Number" component={MaterialInput} />
            <Button
              type="submit"
              className="btn btn-default">Submit</Button>
          </Form>
        )}
      />
    );
  }
}

SearchForm.propTypes = {
  onSubmit: PropTypes.func,
  initValues: PropTypes.object,
  fields: PropTypes.array
}

export default withStyles(styles)(SearchForm);