/**
 * Funciones requisito para la pregunta
 */

function rt() {
  return Math.random() * 1000;
}

function come(plato) {
  console.log('ñom ñom', plato);
}

function prendeParrilla() {
  console.log('prendeParrilla sync start');
  console.log('prendeParrilla async start');
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      console.log('prendeParrilla async resume');
      resolve({
        asaElPollo() {
          console.log('asaElPollo sync start');
          console.log('asaElPollo async start');
          const promise = new Promise((resolve) => {
            setTimeout(() => {
              console.log('asaElPollo async resume');
              resolve('pollo');
              console.log('asaElPollo async finish');
            }, rt());
          });
          console.log('asaElPollo sync finish');
          return promise;
        },
        asaLaCarne(cbCarne) {
          console.log('asaLaCarne sync start');
          console.log('asaLaCarne async start');
          const promise = new Promise((resolve) => {
            setTimeout(() => {
              console.log('asaLaCarne async resume');
              resolve('carne');
              console.log('asaLaCarne async finish');
            }, rt());
          });
          console.log('asaLaCarne sync finish');
          return promise;
        },
      });
      console.log('prendeParrilla async finish');
    }, rt());
  });
  console.log('prendeParrilla sync finish');
  return promise;
}

function preparaEnsaladas() {
  console.log('preparaEnsaladas sync start');
  console.log('preparaEnsaladas async start');
  const promise = new Promise((resolve) => {
    setTimeout(() => {
      console.log('preparaEnsaladas async resume');
      resolve('ensaladas');
      console.log('preparaEnsaladas async finish');
    }, rt());
  });
  console.log('preparaEnsaladas sync finish');
  return promise;
}

const plato = [];
function agregaAlPlato(comida) {
  plato.push(comida);
  if (plato.length === 3) {
    // come recibe un arreglo de alimentos listos
    come(plato);
  }
}

module.exports = {
  prendeParrilla,
  preparaEnsaladas,
  agregaAlPlato,
  come,
};