# Web Blinking Led
Un semplice circuito costruito e programmato con Arduino, NodeJs e Johnny-Five e controllato da una pagina HTML.

In questo tutorial molte cose saranno date per scontate. Per chi è ai primi passi si suggerisce di provare prima il tutorial [Blinking Led](https://github.com/coderdojofirenze/j5-blinkingled) sempre presente nella [pagina GitHub](https://github.com/coderdojofirenze) del coderdojo di Firenze.


## Setup iniziale

Per realizzare questo tutorial si suppone di avere a disposizione una scheda Arduino Uno. Sul PC usato per controllare la scheda devono essere installati la IDE di Arduino e NodeJS. 

Fare riferimento a quanto riportato nel capitolo "Setup" del tutorial [Blinking Led](https://github.com/coderdojofirenze/j5-blinkingled/blob/master/doc/blinkingled.md) per indicazioni su come installare questo software.

## Inizializzazione del progetto NodeJS

Inizializziamo il progetto NodeJS con il comando `npm init`. Nel campo *description* scrivere per esempio "Un led lampeggiante controllato da una pagina web", e indicare come entry point `index.js`.

## Realizzazione di un semplice web server

NodeJS mette a disposizione moltissime funzionalità "prefabbricate" che possono essere utilizzate degli sviluppatori per realizzare funzionalità anche complesse senza bisogno di partire da zero.

Per questo, per esempio, realizzare un **web server** (un software che serve pagine web a client che ne facciano richiesta, tipicamente un browser come Firefox o Google Chrome) è veramente facile. Tutto il codice che dobbiamo scrivere è il seguente:

```javascript
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

server.listen(1337, 'localhost', () => {
    console.log('Server avviato. Collegarsi a http://localhost:1337 per vedere la pagina');
});
```

Apriamo quindi un file di nome `index.js` nella directory del nostro progetto e scriviamoci il codice riportato sopra.

Una volta finito, salviamo ed eseguiamo il codice con il comando `node index.js`. Come si può vedere il codice rimane in esecuzione. Aprire un browser e collegarsi all'URL `http://localhost:1337` e osservare il risultato. Apparirà una pagina bianca con il testo da noi inserito.

Abbiamo realizzato il nostro primo server web con meno di 15 linee di codice! Cliccare Ctrl-C sulla finestra dove si è lanciato il comando `node index.js` per interrompere l'esecuzione

      