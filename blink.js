const http = require('http');

const server = http.createServer(myServer);
var ledAttivo = true;

function myServer(req, res) {

  if (req.method == "GET") { 
    res.writeHead(200, {'Content-type': 'text/html'});
    res.end(`
      <h1>La mia prima pagina web con NodeJS</h1>

      <form name="myForm" action="/" method="post">\
        <input type="checkbox" name="led1" value="attivo" ${ledAttivo ? 'checked' : ''}> LED attivo<br>
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

      if (statoLed === 'attivo') {
        console.log(`Stato LED = attivo`);
        ledAttivo = true;
      }
      else {
        console.log(`Stato LED = inattivo`);
        ledAttivo = false;
      }
  
      res.writeHead(200, {'Content-type': 'text/html'});
      res.end(`
        <h1>La mia prima pagina web con NodeJS</h1>
  
        <form name="myForm" action="/" method="post">\
          <input type="checkbox" name="led1" value="attivo" ${ledAttivo ? 'checked' : ''}> LED attivo<br>
          <input type="submit" value="Imposta"> \
        </form> \
      `);
  
    });
  }
}

server.listen(1337, 'localhost', () => {
    console.log('Server avviato. Collegarsi a http://localhost:1337 per vedere la pagina');
});

// ---- Johnny-Five ---------------------------------------------------------------
// Carichiamo la libreria 'johnny-five'
var five = require('johnny-five');

// Dichiariamo una scheda di tipo Arduino
var board = new five.Board();

board.on('ready', function() {
  // All'avvio della scheda accendiamo o spengiamo il LED
  // collegato al pin 13 a seconda dello stato
  var led = new five.Led(13);
  if (ledAttivo)
    led.blink(500);
  else
    led.off();

  // Successivamente controlliamo ogni 500 ms se il led
  // è cambiato di stato
  this.loop(500, () => {
    // aggiorna lo stato del led
    if (ledAttivo)
      led.blink(500);
    else
      led.off();
  });
  
});

