//setup
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var logger         = require('morgan');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var fs             = require('fs');
var stylus         = require('stylus');


function compile(str, path){
  return stylus(str).set('filename', path);
}

//connect
mongoose.connect('mongodb://localhost/dev-app');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'database connection error:'));

//configure
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(stylus.middleware(
  {
   src: __dirname + '/public',
   compile: compile 
  }
));
app.use(express.static(__dirname + '/public'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

// dynamically include routes
fs.readdirSync(__dirname + '/controllers').forEach(function (file) {
  if(file.substr(-3) == '.js') {
      route = require(__dirname + '/controllers/' + file);
      route.controller(app);
  }
});

//listen
db.once('open', function callback () {
    var port = app.get('port');
    app.listen(port, function(){
        console.log("listening on port " + port);
    });
});