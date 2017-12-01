import React, { Component } from 'react';

export default class VotesCount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      candidateA: 0,
      candidateB: 0,
    };
    this.onVotesChanged = this.onVotesChanged.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  
  onVotesChanged(event) {
    this.setState({ [event.target.name]: +event.target.value });
  }
  
  onSubmit(event) {
    fetch('/votes', {
      method: 'post',
      body: JSON.stringify(this.state),
    });
    event.preventDefault();
  }
  
  render() {
    return (
      <div className="votes-count">
        <h1>Conteo de votos</h1>
        <form onSubmit={this.onSubmit}>
          <div>
            <label htmlFor="candidateA">
              Candidato A
              <input type="text" onChange={this.onVotesChanged} id="candidateA" name="candidateA" />
            </label>
            <label htmlFor="candidateB">
              Candidato B
              <input type="text" onChange={this.onVotesChanged} id="candidateB" name="candidateB" />
            </label>
            <input type="submit" value="Guardar" />
          </div>
        </form>
      </div>
    );
  }
}