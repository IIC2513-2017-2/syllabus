import React, { Component } from 'react';
import VotesCountForm from './VotesCountForm';

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
    this.setState({ [event.target.name]: parseInt(event.target.value) });
  }
  
  toggleLoading(loading) {
    this.setState({ loading });
  }
  
  onSubmit(event) {
    this.toggleLoading(true);
    fetch('/votes', {
      method: 'post',
      body: JSON.stringify(this.state),
    })
      .then(() => this.toggleLoading(false))
      .catch(() => this.toggleLoading(false))
    event.preventDefault();
  }
  
  render() {
    return (
      <VotesCountForm
        onSubmit={this.onSubmit}
        onVotesChanged={this.onVotesChanged}
        loading={this.state.loading}
      />
    );
  }
}