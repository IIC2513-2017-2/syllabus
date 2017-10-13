const {
  prendeParrilla,
  preparaEnsaladas,
  agregaAlPlato,
  come,
} = require('./asado-promises-base');

const promesaDeAlimentosAsados = prendeParrilla()
  .then((parrillaEncendida) => {
    const promesaDePolloAsado = parrillaEncendida.asaElPollo();
    return parrillaEncendida.asaLaCarne()
      .then(carneAsada =>
        promesaDePolloAsado
          .then(polloAsado => [polloAsado, carneAsada])
      );
  });
preparaEnsaladas()
  .then(ensalada =>
    promesaDeAlimentosAsados
      .then(alimentosAsados => alimentosAsados.concat(ensalada))
  )
  .then(come);