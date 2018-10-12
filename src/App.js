import React, { Component } from 'react';
import './App.css';
// import Life from './pages/demo/Life';

class App extends Component {
  render() {
    return (
      <div className="App">
        {this.props.children}
      </div>
    );
  }
}

export default App;
