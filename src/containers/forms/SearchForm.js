// TODO: Expand react store to include search entries

import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import { Formik, Form, FastField as Field } from "formik";
import Button from "@material-ui/core/Button";
import { Persist } from '../../components/PersistStorage';
import MenuItem from "@material-ui/core/MenuItem";
import MaterialInput from "../../components/MaterialInput";
import MaterialSelect from "../../components/MaterialSelect";
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
  catalog: 0,
  keyword: "",
  title: "",
  journalTitle: "",
  author: "",
  subject: "",
  isbn: "",
  callNumber: ""
}

const getURL = (edition) => {
  if (edition.catalogs === undefined || edition.catalogs[4].scolar === undefined) {
    return null;
  }
  else {
    return edition.catalogs[4].scholar.url;
  }
}

class SearchForm extends React.Component {
  submitSearch = (values) => {
    var m = new Scholar(this.props.url);
    console.dir(values)
    browser.tabs.create({
      url: m.makeAdvancedSearch(values)
    });
  };
  
  render() {
    return (
      <Formik
        onSubmit={this.submitSearch}
        initialValues={initialSearchValues}
        render={({ errors, dirty, isSubmitting }) => (
          <Form>
            <Field 
              name="catalog" 
              label="Catalog" 
              component={MaterialSelect}>
              {this.props.catalogs.map((value, index) => 
                <MenuItem key={index} value={index}>{Object.values(value)[0].name}</MenuItem>
              )}
            </Field>
            <Field name="Y" label="Keyword" component={MaterialInput} />
            <Field name="t" label="Title" component={MaterialInput} />
            <Field name="jt" label="Journal Title" component={MaterialInput} />
            <Field name="a" label="Author" component={MaterialInput} />
            <Field name="s" label="Subject" component={MaterialInput} />
            <Field name="i" label="ISBN/ISSN" component={MaterialInput} />
            <Field name="cn" label="Call Number" component={MaterialInput} />
            <Button type="submit" className="btn btn-default">Submit</Button>
            <Persist name="search-form"/>
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
  url: PropTypes.string,
  catalogs: PropTypes.array
}

const mapStateToProps = state => ({
  url: getURL(state.edition),
  catalogs: state.edition.catalogs
})

export default connect(
  mapStateToProps
)(withStyles(styles)(SearchForm));