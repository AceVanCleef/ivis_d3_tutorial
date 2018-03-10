/** Fill in your code here */
/** Tutorials used:
	1. http://learnjsdata.com/getting_started.html
*/
/* Quote: "src/analysis.js would be where your analysis code goes." */
const http = require('http');

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});