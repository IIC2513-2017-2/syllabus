const {
  prendeParrilla,
  preparaEnsaladas,
  agregaAlPlato,
  come,
} = require('./asado-promises-base');

const alimentosAsadosPromise = prendeParrilla()
  .then(async (parrillaEncendida) => {
    const polloPromise = parrillaEncendida.asaElPollo();
    return [await parrillaEncendida.asaLaCarne(), await polloPromise];
  });
(async () => come([await preparaEnsaladas(), ...await alimentosAsadosPromise]))();