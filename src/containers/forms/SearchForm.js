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
  Y: "",
  t: "",
  a: "",
  d: "",
  i: "",
  c: ""
}


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

const getSearchFields = (values, catalogs, labels) => {
  var currCatalog = catalogs[values.catalog];
  var catalogOptions = currCatalog[Object.keys(currCatalog)[0]].options.split(";");

  return catalogOptions.map((option, i) => 
    <Field 
      key={i} 
      name={option} 
      label={labels[option]} 
      component={MaterialInput} />)
}

class SearchForm extends React.Component {
  getInitialSearchValues = () => {
    var initialSearchValues = {}
    initialSearchValues.catalog = 0;
    for(var i = 0; i < this.props.searchoptions.length; i++) {
      initialSearchValues[this.props.searchoptions[i].value] = "";
    }
    return initialSearchValues;
  }

  submitSearch = (values) => {
    var m = new Scholar(this.props.url);
    browser.tabs.create({
      url: m.makeAdvancedSearch(getSearchObject(values))
    });
  };
  
  render() {
    return (
      <Formik
        onSubmit={this.submitSearch}
        initialValues={this.getInitialSearchValues()}
        render={({ values }) => (
          <Form>
            <Field 
              name="catalog" 
              label="Catalog" 
              component={MaterialSelect}>
              {this.props.catalogs.map((value, index) => 
                <MenuItem key={index} value={index}>{Object.values(value)[0].name}</MenuItem>
              )}
            </Field>
            {getSearchFields(values, this.props.catalogs, this.props.searchoptionlabels)}
            <Button type="submit" className="btn btn-default">Submit</Button>
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
  catalogs: state.edition.catalogs,
  searchoptions: state.edition.searchoptions.searchoption,
  searchoptionlabels: state.edition.searchoptionlabels
})

export default connect(
  mapStateToProps
)(withStyles(styles)(SearchForm));