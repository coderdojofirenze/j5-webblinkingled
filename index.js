const http = require('http');
const url = require('url');

const server = http.createServer(myServer);

function myServer(req, res) {
  const pathName = url.parse(req.url, true).pathname;
  if (pathName === '/') {
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end('<h1>La mia prima pagina web con NodeJS</h1>');
  }
}

// utilizziamo una funzionalità avanzata di NodeJS: le arrow function
server.listen(1337, 'localhost', () => {
    console.log('Server avviato. Collegarsi a http://localhost:1337 per vedere la pagina');
});
