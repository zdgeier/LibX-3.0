import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
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

const getURL = (edition) => {
  if (edition.catalogs === undefined || edition.catalogs[4].scolar === undefined) {
    return null;
  }
  else {
    return edition.catalogs[4].scholar.url;
  }
}

const getSearchObject = (values) => {
  return Object.keys(values).map(i => {
    return ({searchType: i, searchTerms: values[i]})
  })
}

const getSearchFields = (catalogIndex, catalogs, labels) => {
  var currCatalog = catalogs[catalogIndex];
  var catalogOptions = currCatalog[Object.keys(currCatalog)[0]].options.split(";");

  return catalogOptions.map((option, i) => 
    <Field 
      key={i} 
      name={option} 
      label={labels[option]} 
      component={MaterialInput} />)
}

const getInitialSearchValues = (catalogIndex, catalogs) => {
  var currCatalog = catalogs[catalogIndex];
  var catalogOptions = currCatalog[Object.keys(currCatalog)[0]].options.split(";");
  console.dir(catalogOptions)

  var initialSearchValues = {}
  for(var i = 0; i < catalogOptions.length; i++) {
    initialSearchValues[catalogOptions[i]] = "";
  }
  console.dir(initialSearchValues)
  return initialSearchValues;
}

class SearchForm extends React.Component {
  render() {
    console.dir(this.props.catalogs)
    return (
      <div className="SearchForm">
        <Formik
          initialValues = {getInitialSearchValues(this.props.catalogIndex, this.props.catalogs)}
          onSubmit = {this.props.handleSubmit}
          render = {() => (
            <Form>
              {getSearchFields(this.props.catalogIndex, this.props.catalogs, this.props.searchoptionlabels)}
              <Button type="submit" className="btn btn-default">Submit</Button>
            </Form>
          )}
        />
      </div>
    );
  }
}

SearchForm.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  catalogs: PropTypes.array,
  searchoptions: PropTypes.array,
  searchoptionlabels: PropTypes.object,
  catalogIndex: PropTypes.number
}

const mapStateToProps = state => ({
  url: getURL(state.edition),
  catalogs: state.edition.catalogs,
  searchoptions: state.edition.searchoptions.searchoption,
  searchoptionlabels: state.edition.searchoptionlabels
})

export default connect(mapStateToProps)(withStyles(styles)(SearchForm));