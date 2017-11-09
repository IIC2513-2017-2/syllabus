doSomething()
  .then((value) => {
    console.log(value);
    return value + 1;
  })
  .catch((reason) => {
    console.log(reason);
    return 10;
  })
  .then((value) => {
    console.log(value);
  });
  
  
function doSomething() {
  return new Promise((resolve, reject) => {
    if (Math.random() > 0.5) {
      return resolve(5);
    }
    const error = new Error('Ups!');
    return reject(error);
  });
}
