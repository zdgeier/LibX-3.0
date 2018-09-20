import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import SearchForm from "./search-form";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
  }

  generateContent(selectedContent) {
    switch(selectedContent) {
      case "Search":
        return (
          <SearchForm className="SearchForm"></SearchForm>
        );
    }
  }

  render() {
    const {selectedContent} = this.props;
    return (
      <div className="main-content">
        {this.generateContent(selectedContent)}
      </div>
    );
  }
}

MainContent.propTypes = {
  selectedContent: PropTypes.any
};


export default MainContent;