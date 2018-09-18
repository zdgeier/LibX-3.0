import React from 'react';
import ReactDOM from 'react-dom';
import MiniDrawer from 'mini-drawer';

class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {activeTab: 0};
  }

  /*
  componentDidMount() {
    // Get the active tab and store it in component state.
    browser.tabs.query({active: true}).then(tabs => {
      this.setState({activeTab: tabs[0]});
    });
  }
  */

  render() {
    /*
    const {activeTab, isOn} = this.state;
    return (
      <div>
        <h1>LibX</h1>
        <p>
          This is an example of a popup test UI in React.
        </p>
        <Button onClick={() => { this.setState({isOn: !this.state.isOn}) }}>{isOn ? "on" : "off" }</Button>
        <p>
          Active tab: {activeTab ? activeTab.url : '[waiting for result]'}
        </p>
        <Nested buttonlabel="hit me" />
      </div>
    );
    */
   return (
       <MiniDrawer></MiniDrawer>
   )
  }
}

ReactDOM.render(<Popup/>, document.getElementById('app'));
