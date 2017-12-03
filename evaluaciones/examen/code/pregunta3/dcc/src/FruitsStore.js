import React, { Component } from 'react';

export default class FruitsStore extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cart: [],
    };
  }
  
  addToCart(fruit) {
    this.setState(prevState => {
      const cart = prevState.cart.concat(fruit);
      return { cart, total: cart.reduce((acc, fruit) => fruit.price + acc, 0) };
    });
  }

  render() {
    return (
      <div id="container">
        <nav>
          <ul>
            <li>
              <a href="">Inicio</a>
            </li>
            <li>
              <a href="">Frutas</a>
            </li>
            <li>
              <a href="">Verduras</a>
            </li>
          </ul>
        </nav>
        <main>
          <h1>Frutas</h1>
          <ul>
            {this.props.fruits.map((fruit) => {
              return (
                <li>
                  <h2>{fruit.name} <span className="price">${fruit.price}</span></h2>
                  <p>{fruit.description}</p>
                  <a href="javascript:void(0)" onClick={() => this.addToCart(fruit)}>Agregar</a>
                </li>
              );
            })}
          </ul>
        </main>
        <div id="cart">
          <h2>Carro</h2>
          <ul>
            {this.state.cart.length
              ? this.state.cart.map(fruit => <li>{fruit.name}</li>)
              : 'No hay frutas agregadas'}
          </ul>
          <strong>Total: ${this.state.total}</strong>
        </div>
      </div>
    );
  }
}