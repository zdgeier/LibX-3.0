import React from 'react';
import ReactDOM from 'react-dom';
import MiniDrawer from 'mini-drawer';

class Popup extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
   return (
       <MiniDrawer> </MiniDrawer>
   )
  }
}

ReactDOM.render(<Popup/>, document.getElementById('app'));
