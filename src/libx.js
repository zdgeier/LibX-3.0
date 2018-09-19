import React from 'react';
import ReactDOM from 'react-dom';
import MainDrawer from './main-drawer';

class LibX extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   return (
       <MainDrawer> </MainDrawer>
   )
  }
}

ReactDOM.render(<LibX/>, document.getElementById('app'));
