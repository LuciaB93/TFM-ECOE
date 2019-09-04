var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./routes/index');
var rest = require('./routes/rest');
var templates = require('./routes/templates');
var app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());


// Allow CORS (Cross-Origin Requests)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, DELETE');
  if('OPTIONS' === req.method) {
    res.sendStatus(200);
  } else {
    console.log(`${req.ip} ${req.method} ${req.url}`);
    next();
  }
  });

app.use(express.json());
//app.use('/', routes);
//app.use('/templates', templates);
//app.use('/rest', rest);
app.use('/', rest);


app.use('/', express.static(__dirname + './index'));



// Init the server
var puerto = 3000;
app.listen(puerto, function() {
  console.log("Servidor está escuchando en el puerto " + puerto);
});

module.export = app;


