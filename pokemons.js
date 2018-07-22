console.log("Iniciando funciones - mQ");

var express = require('express');
var  nano    = require('nano')('http://mQ:passwd@localhost:5984');
var app = express();
var db_name = "pokemon";
 var db      = nano.use(db_name);
var bodyParser = require('body-parser');
var https = require('https');
var fs = require('fs');
var options = {
  key: fs.readFileSync('/var/www/mQ/ssl/private.mq.key'),
  cert: fs.readFileSync('/var/www/mQ/ssl/certificate.mq.pem')
};

var httpsServer = https.createServer(options, app);
httpsServer.listen(9073);
app.all('/*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  res.setHeader("Content-Type", "text/json");
    next();
});

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

function generarid() {
    return ("0000" + (Math.random()*Math.pow(36,4) << 0).toString(36)).slice(-4)
}
// para routes: /pokemons/:pokemon
app.get("/pokemons", function(request,response) {
  db.list({limit:20, include_docs: true}, function(err, body) {
  if (!err) {

    response.send(JSON.stringify(body.rows, null, 3));
  }
});

});



app.get("/", function(request,response) {
      response.send("KeetUp // ¿Qué haces aqui?");
});

console.log("KeetUp Pokemons funcionando sin problemas en 9073");
