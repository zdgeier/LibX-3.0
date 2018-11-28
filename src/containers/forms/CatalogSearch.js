import React from "react";
import PropTypes from 'prop-types';
import { connect } from 'react-redux'
import { withStyles } from "@material-ui/core/styles";
import Select from "@material-ui/core/Select";
import SearchForm from './SearchForm';
import MenuItem from "@material-ui/core/MenuItem";

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

class CatalogSearch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {catalogIndex: 0};
  }

  submitSearch = (values) => {
    console.dir(values)
  }

  handleChange = (event) => {
    this.setState({catalogIndex: event.target.value})
  }

  render() {
    return (
      <div>
        <Select
          value = {this.state.catalogIndex}
          onChange = {this.handleChange}
          inputProps={{
            name: 'catalog',
            id: 'catalog-select',
          }}>
          {this.props.catalogs.map((value, index) => 
            <MenuItem key={index} value={index}>{Object.values(value)[0].name}</MenuItem>
          )}
        </Select>
        <SearchForm catalogIndex={this.state.catalogIndex} handleSubmit={this.submitSearch}/>
      </div>
    );
  }
}

CatalogSearch.propTypes = {
  values: PropTypes.object,
  handleSubmit: PropTypes.func,
  catalogs: PropTypes.array,
  searchoptionlabels: PropTypes.object
}

const mapStateToProps = state => ({
  catalogs: state.edition.catalogs,
  searchoptions: state.edition.searchoptions.searchoption,
  searchoptionlabels: state.edition.searchoptionlabels
})

export default connect(mapStateToProps)(withStyles(styles)(CatalogSearch));