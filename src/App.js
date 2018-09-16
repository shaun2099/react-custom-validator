import React, { Component } from 'react';
import { RequiredText } from './demo/RequiredTest';
import './App.css';

class App extends Component {
  render() {
    return (
      <div>
        <header>
          <h1>Welcome to React</h1>
        </header>
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <RequiredText />
      </div>
    );
  }
}

export default App;
