// ---- Un semplicissimo server web -----------------------------------------------
const http = require('http');
const url = require('url');
const server = http.createServer(myServer);

var ledAcceso = true;
var modoLedCheckbox = 'checked';

function myServer(req, res) {

  console.log(`myServer() called --- req.method = ${req.method}`);

  if (req.method == "GET") { 
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(`
      <h1>La mia prima pagina web con NodeJS</h1>

      <form name="myForm" action="/" method="post">\
        <input type="checkbox" name="led1" value="acceso" ${modoLedCheckbox}> LED attivo<br>
        <input type="submit" value="Imposta"> \
      </form> \
    `);
  }
  else if (req.method == "POST") {

    var statoLed = '';
    req.on('data', function(rawData) {

      // converte i dati ricevuti dal messaggio POST in stringa
      var postData = rawData.toString();

      console.log(`POST received! formdata = ${postData}`);

      statoLed = postData.split("&")[0].split("=")[1];

    }).on('end', function() {

      if (statoLed === 'acceso') {
        console.log(`Stato LED = acceso`);
        modoLedCheckbox = 'checked';
        ledAcceso = true;
      }
      else {
        console.log(`Stato LED = spento`);
        modoLedCheckbox = '';
        ledAcceso = false;
      }
  
      res.writeHead(200, {'Content-type': 'text/html'});
      res.end(`
        <h1>La mia prima pagina web con NodeJS</h1>
  
        <form name="myForm" action="/" method="post">\
          <input type="checkbox" name="led1" value="acceso" ${modoLedCheckbox}> LED attivo<br>
          <input type="submit" value="Imposta"> \
        </form> \
      `);
  
    });

  }
}

// utilizziamo una funzionalità avanzata di NodeJS: le arrow function
server.listen(1337, 'localhost', () => {
  console.log('Server avviato. Collegarsi a http://localhost:1337 per vedere la pagina');
});
// --------------------------------------------------------------------------------

// ---- Johnny-Five ---------------------------------------------------------------
// Carichiamo la libreria 'johnny-five'
var five = require('johnny-five');

// Dichiariamo una scheda di tipo Arduino
var board = new five.Board();

// All'avvio della scheda accendiamo o spengiamo il LED
// collegato al pin 13 a seconda dello stato
board.on('ready', function() {
  var led = new five.Led(13);
  if (ledAcceso)
    led.on();
  else
    led.off();
});
// --------------------------------------------------------------------------------
