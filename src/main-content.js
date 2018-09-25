import React from "react";
import PropTypes from "prop-types";
import TextField from "@material-ui/core/TextField";

class MainContent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.dir(this.props);
    const DrawerComponent = this.props.selectedContent.content;
    return (
      <div className="main-content">
        {this.props.selectedContent.label}
        <DrawerComponent/>
      </div>
    );
  }
}

MainContent.propTypes = {
  selectedContent: PropTypes.any,
  drawerDescription: PropTypes.any
};


export default MainContent;