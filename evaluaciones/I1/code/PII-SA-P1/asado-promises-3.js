const {
  prendeParrilla,
  preparaEnsaladas,
  agregaAlPlato,
  come,
} = require('./asado-promises-base');

Promise.all([
  prendeParrilla()
    .then((parrillaEncendida) => {
      return Promise.all([
        parrillaEncendida.asaElPollo(),
        parrillaEncendida.asaLaCarne(),
      ]);
    }),
  preparaEnsaladas(),
])
  .then(([[pollo, carne], ensaladas]) => come([pollo, carne, ensaladas]));