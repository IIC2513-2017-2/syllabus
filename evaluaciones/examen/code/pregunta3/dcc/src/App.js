import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import FruitsStore from './FruitsStore';

const fruits = [
  {
    name: 'Duraznos',
    description: '¡Obvio! ¡Tienen cuesco! Esta dulce y jugosa fruta de verano te refrescará y te entregará energía...',
    price: 2100,
  },
  {
    name: 'Manzanas',
    description: 'Muchos creen que la manzana es mejor que HP, Dell o Samsung, pero además...',
    price: 1200,
  },
  {
    name: 'Peras',
    description: 'Las peras son la fruta más mediocre que existe. Sí, no son malas, pero en cualquier aspecto en que las compares con otras terminarán estando a lo más en segundo lugar...',
    price: 1500,
  },
];

class App extends Component {
  render() {
    return (
      <FruitsStore fruits={fruits} />
    );
  }
}

export default App;
