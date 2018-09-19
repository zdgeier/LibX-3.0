import React from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";
import { mailFolderListItems, otherMailFolderListItems } from "./tileData";
import { FormControl } from "@material-ui/core";

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
      <div className="content">
        <TextField
          id="keyword"
          label="Keyword"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="title"
          label="Title"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="journal-title"
          label="Journal Title"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="author"
          label="Author"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="subject"
          label="Subject"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="isbn"
          label="ISBN/ISSN"
          type="search"
          className={classes.textField}
          margin="normal"
        />
        <TextField
          id="call-number"
          label="Call Number"
          type="search"
          className={classes.textField}
          margin="normal"
        />
      </div>
    );
  }
}

export default MainContent;