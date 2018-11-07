// TODO: Expand react store to include search entries

import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, FastField as Field } from "formik";
import Button from "@material-ui/core/Button";
import MaterialInput from "../../components/MaterialInput";
import Scholar from '../../util/catalog/factory/scholar';

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

const initialSearchValues = {
  keyword: "",
  title: "",
  journalTitle: "",
  author: "",
  subject: "",
  isbn: "",
  callNumber: ""
}

const getURL = (edition) => {
  if (edition.catalogs == undefined) {
    return null;
  }
  else {
    return edition.catalogs[4].scholar.url;
  }
}

class SearchForm extends React.Component {
  submitSearch = (values) => {
    var m = new Scholar(this.props.url);
    browser.tabs.create({
      url: m.makeKeywordSearch(values.keyword)
    });
  };
  
  render() {
    return (
      <Formik
        onSubmit={this.submitSearch}
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
  fields: PropTypes.array,
  url: PropTypes.string
}

const mapStateToProps = state => ({
  url: getURL(state.edition)
})

export default connect(
  mapStateToProps
)(withStyles(styles)(SearchForm));