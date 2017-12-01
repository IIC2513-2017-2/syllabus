import React, { Component } from 'react';

export default function VotesCountForm(props) {
  return (
    <div className="votes-count">
      <h1>Conteo de votos</h1>
      <form onSubmit={props.onSubmit}>
        <div>
          <label htmlFor="candidateA">
            Candidato A
            <input type="text" onChange={props.onVotesChanged} id="candidateA" name="candidateA" />
          </label>
          <label htmlFor="candidateB">
            Candidato B
            <input type="text" onChange={props.onVotesChanged} id="candidateB" name="candidateB" />
          </label>
          <input type="submit" value="Guardar" disabled={props.loading} />
          {props.loading && <div>Enviando...</div>}
        </div>
      </form>
    </div>
  );
};
