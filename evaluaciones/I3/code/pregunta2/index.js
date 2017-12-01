// respuesta

function Person(firstName, lastName, weight, height) {
  this.getFirstName = () => firstName;
  this.getLastName = () => lastName;
}

Person.prototype.getFullName = function getFullName() {
  return `${this.getFirstName()} ${this.getLastName()}`;
}

const [addParticipant, showParticipants] = (() => {
  const participants = [];
  function addParticipant(person) {
    participants.push(person);
  }
  
  function showParticipants() {
    return participants.map(p => `${p.getFullName()} is going`).join('; ');
  }
  return [addParticipant, showParticipants];
})();


// pregunta
const assert = require('assert');

const p1 = new Person('John', 'Doe');
const p2 = new Person('Jane', 'Doe');

assert(p1.getFirstName() === 'John');
assert(p2.getLastName() === 'Doe');
assert(p1.getFullName() === 'John Doe');

// cumpliendo hasta aquí tienes 1.5 puntos

assert(p1.getFirstName !== p2.getFirstName);
assert(p1.getFullName === p2.getFullName);

// cumpliendo hasta aquí tienes 1 punto adicional

// luego de crear las personas no es posible cambiar sus nombres,
// así que esto por ejemplo:
p1.firstName = 'Other';
assert(p1.getFirstName() === 'John'); // sigue siendo válido

// cumpliendo hasta aquí tienes 1.5 puntos adicionales

addParticipant(p1);
assert(showParticipants() === 'John Doe is going');
addParticipant(p2);
assert(showParticipants() === 'John Doe is going; Jane Doe is going');

// cumpliendo hasta aquí tienes 1 punto adicional

// no hay código alguno que se pueda agregar
// (salvo sobreescribir la función showParticipants)
// que permita alterar lo que muestra showParticipants,
// salvo llamadas a addParticipant()

// cumpliendo hasta aquí tienes 1 punto adicional


