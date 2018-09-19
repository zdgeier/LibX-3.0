import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import SearchForm from "./search-form";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {database: "Addison"};
  }

  handleDrawerOpen () {
    this.setState({ open: true });
  }

  handleDrawerClose () {
    this.setState({ open: false });
  }

  render() {
    const { classes, theme } = this.props;
    return (
      <div className="main-content">
        <SearchForm className="SearchForm"></SearchForm>
      </div>
    );
  }
}

MainContent.propTypes = {
  classes: PropTypes.any,
  theme: PropTypes.any,
}

export default MainContent;