import React, { Component } from 'react';
import VotesCount from './VotesCount';
import VotesCountWithBonus from './VotesCountWithBonus';
import './App.css';

window.fetch = function fetch() {
  return new Promise(resolve => setTimeout(resolve, 1000));
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bonus: window.location.pathname === '/bonus',
    };
  }
  render() {
    return (
      <div>
        {this.state.bonus ? <VotesCountWithBonus /> : <VotesCount />}
      </div>
    );
  }
}

export default App;
