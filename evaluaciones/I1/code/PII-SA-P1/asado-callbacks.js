/**
 * Funciones requisito para la pregunta
 */

function rt() {
  return Math.random() * 1000;
}

function come(plato) {
  console.log('ñom ñom', plato);
}

function prendeParrilla(cb) {
  console.log('prendeParrilla sync start');
  console.log('prendeParrilla async start');
  setTimeout(
    () => {
      console.log('prendeParrilla async resume');
      cb({
        asaElPollo(cbPollo) {
          console.log('asaElPollo sync start');
          console.log('asaElPollo async start');
          setTimeout(() => {
            console.log('asaElPollo async resume');
            cbPollo('pollo');
            console.log('asaElPollo async finish');
          }, rt());
          console.log('asaElPollo sync finish');
        },
        asaLaCarne(cbCarne) {
          console.log('asaLaCarne sync start');
          console.log('asaLaCarne async start');
          setTimeout(() => {
            console.log('asaLaCarne async resume');
            cbCarne('carne');
            console.log('asaLaCarne async finish');
          }, rt());
          console.log('asaLaCarne sync finish');
        },
      });
      console.log('prendeParrilla async finish');
    },
    rt()
  );
  console.log('prendeParrilla sync finish');
}

function preparaEnsaladas(cb) {
  console.log('preparaEnsaladas sync start');
  console.log('preparaEnsaladas async start');
  setTimeout(() => {
    console.log('preparaEnsaladas async resume');
    cb('ensaladas');
    console.log('preparaEnsaladas async finish');
  }, rt());
  console.log('preparaEnsaladas sync finish');
}

const plato = [];
function agregaAlPlato(comida) {
  plato.push(comida);
  if (plato.length === 3) {
    // come recibe un arreglo de alimentos listos
    come(plato);
  }
}

/**
 * Código de la pregunta
 */
prendeParrilla((parrillaEncendida) => {
  // asaElPollo entrega un polloAsado asíncronamente
  parrillaEncendida.asaElPollo((polloAsado) => {
    agregaAlPlato(polloAsado);
  });
  // asaLaCarne entrega carneAsada asíncronamente
  parrillaEncendida.asaLaCarne((carneAsada) => {
    agregaAlPlato(carneAsada);
  });
});

// preparaEnsaladas entrega ensalada asíncronamente
preparaEnsaladas((ensaladas) => {
  agregaAlPlato(ensaladas);
});
