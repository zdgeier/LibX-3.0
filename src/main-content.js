import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";
import SearchForm from "./search-form";
import SettingsForm from "./settings-form";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
    this.generateContent = this.generateContent.bind(this);
  }

  generateContent(contentName) {
    switch(contentName) {
      case "Search":
        return (<SearchForm />);
      case "Settings":
        return (<SettingsForm />);
    }
  }

  render() {
    return (
      <div className="main-content">
        {this.props.selectedContent}
        {this.generateContent(this.props.selectedContent)}
      </div>
    );
  }
}

MainContent.propTypes = {
  selectedContent: PropTypes.any
};


export default MainContent;