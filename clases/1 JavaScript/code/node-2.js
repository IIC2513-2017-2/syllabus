const http = require('http');

let id = 1;

const server = http.createServer((req, res) => {
  const currentId = id;
  id += 1;
  console.log(`${currentId} - ${new Date().toISOString()}`);
  res.end('Hello World!');
  console.log(`${currentId} - ${new Date().toISOString()}`);
});

server.listen(3000, () => {
  console.log(`Server running at http://localhost:3000/`);
});