import React, { Component } from 'react';
import Main from './Main';
import AutosuggestSearch from "./AutosuggestSearch";
import Typography from '@material-ui/core/Typography';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      edition: null,
    }
  }

  setEdition = (editionURL) => {
      this.setState({
          edition: editionURL,
      })
  };

  render() {
      if (this.state.edition === null) {
          return (
              <div>
                  <AutosuggestSearch onClick={this.setEdition}/>
                  <Typography paragraph>{this.state.edition}</Typography>
              </div>
          );
      }
      else {
          return (
              <div className="App">
                  <Main edition={this.state.edition} />
              </div>
          );
      }
  }
}

export default App;
