import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
import Button from "@material-ui/core/Button";
import MaterialInput from "../../components/MaterialInput";
import Scholar from '../../util/catalog/factory/scholar';
import { Select, MenuItem } from "@material-ui/core";

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

const getInitialSearchValues = (catalogOptions) => {
  console.dir(catalogOptions)
  var initialSearchValues = {catalogIndex: 0}
  for(var i = 0; i < catalogOptions.length; i++) {
    initialSearchValues[catalogOptions[i].value] = "";
  }
  console.dir(initialSearchValues)
  return initialSearchValues;
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {catalogIndex: 0}
  }

  handleChange = (event, values, setFieldValue) => {
    console.dir(values)
    console.dir(setFieldValue)
    for (var value in values) {
      setFieldValue(value, "", true);
    }
    this.setState({catalogIndex: event.target.value})
  }

  submitSearch = (values) => {
    console.dir(values)
  }

  render() {
    console.dir(this.props.catalogs)
    return (
      <div className="SearchForm">
        <Formik
          initialValues = {getInitialSearchValues(this.props.searchoptions)}
          onSubmit = {this.submitSearch}
          render = {({ values, setFieldValue }) => (
            <Form>
              <Select
                  value = {this.state.catalogIndex}
                  onChange = {(event) => this.handleChange(event, values, setFieldValue)}
                  inputProps={{
                    name: 'catalog',
                    id: 'catalog-select',
                  }}>
                {this.props.catalogs.map((value, index) => 
                  <MenuItem key={index} value={index}>{Object.values(value)[0].name}</MenuItem>
                )}
              </Select>
              {getSearchFields(this.state.catalogIndex, this.props.catalogs, this.props.searchoptionlabels)}
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