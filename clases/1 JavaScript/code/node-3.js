const http = require('http');
const getData = require('./get-data');

let id = 1;

const server = http.createServer((req, res) => {
  const currentId = id;
  id += 1;
  console.log(`${currentId} - ${new Date().toISOString()}`);
  
  getData((err, data) => {
    res.end(data);
    console.log(`${currentId} - ${new Date().toISOString()}`);
  });
  
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`);
});