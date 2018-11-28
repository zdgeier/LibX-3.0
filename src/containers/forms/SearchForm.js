import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import { Formik, Field, Form } from "formik";
import Button from "@material-ui/core/Button";
import MaterialInput from "../../components/MaterialInput";
import { Select, MenuItem, OutlinedInput } from "@material-ui/core";


import Scholar from '../../util/catalog/factory/scholar'
import Bookmarklet from '../../util/catalog/factory/bookmarklet'

const CatalogFactory = (catalogName, url, searchoptions) => {
    console.dir({catalogName, url, searchoptions})
    switch (catalogName) {
        case 'scholar':
            return new Scholar(url);
        case 'bookmarklet':
            return new Bookmarklet(url, searchoptions);
    }
}

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
  select: {
    margin: theme.spacing.unit,
  },
  searchField: {
    margin: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  }
});

const getSearchObject = (values) => {
  return Object.keys(values).map(i => {
    return ({searchType: i, searchTerms: values[i]})
  })
}

const getInitialSearchValues = (catalogOptions) => {
  var initialSearchValues = {catalogIndex: 0}
  for(var i = 0; i < catalogOptions.length; i++) {
    initialSearchValues[catalogOptions[i].value] = "";
  }
  return initialSearchValues;
}

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {catalogIndex: 0}
  }

  getSearchFields = () => {
    var currCatalog = this.props.catalogs[this.state.catalogIndex];
    var catalogOptions = currCatalog[Object.keys(currCatalog)[0]].options.split(";");
  
    return catalogOptions.map((option, i) => 
      <Field 
        key={i} 
        name={option} 
        className={this.props.classes.searchField}
        label={this.props.searchoptionlabels[option]} 
        variant="outlined"
        component={MaterialInput} />)
  }

  handleChange = (event, values, setFieldValue) => {
    for (var value in values) {
      setFieldValue(value, "", true);
    }
    this.setState({catalogIndex: event.target.value})
  }

  submitSearch = (values) => {
    var currCatalog = this.props.catalogs[this.state.catalogIndex];
    var catalogName = Object.keys(currCatalog)[0];
    var url = currCatalog[Object.keys(currCatalog)[0]].url;
    var m = CatalogFactory(catalogName, url, this.props.searchoptions);
    browser.tabs.create({
      url: m.makeAdvancedSearch(getSearchObject(values))
    });
  }

  render() {
    console.dir(this.props.catalogs)
    return (
      <div>
        <Formik
          initialValues = {getInitialSearchValues(this.props.searchoptions)}
          onSubmit = {this.submitSearch}
          render = {({ values, setFieldValue }) => (
            <Form>
              <Select
                  value = {this.state.catalogIndex}
                  onChange = {(event) => this.handleChange(event, values, setFieldValue)}
                  className={this.props.classes.select}
                  input={
                    <OutlinedInput
                      name="catalog"
                      id="catalog-select"
                    />
                  }
                  inputProps={{
                    name: 'catalog',
                    id: 'catalog-select',
                  }}>
                {this.props.catalogs.map((value, index) => 
                  <MenuItem key={index} value={index}>{Object.values(value)[0].name}</MenuItem>
                )}
              </Select>
              <br/>
              {this.getSearchFields()}
              <br/>
              <Button type="submit" variant="outlined" className={this.props.classes.button}>Submit</Button>
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
  catalogIndex: PropTypes.number,
  classes: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
  catalogs: state.edition.catalogs,
  searchoptions: state.edition.searchoptions.searchoption,
  searchoptionlabels: state.edition.searchoptionlabels
})

export default connect(mapStateToProps)(withStyles(styles)(SearchForm));