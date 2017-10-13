const {
  prendeParrilla,
  preparaEnsaladas,
  agregaAlPlato,
  come,
} = require('./asado-promises-base');

prendeParrilla()
  .then((parrillaEncendida) => {
    parrillaEncendida.asaElPollo().then(agregaAlPlato);
    parrillaEncendida.asaLaCarne().then(agregaAlPlato);
  });
preparaEnsaladas().then(agregaAlPlato);