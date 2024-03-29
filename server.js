var express = require('express');
var http = require('http');
var path = require('path');
var handlebars = require('express-handlebars')

// Routes
var index = require('./routes/index');
var about = require('./routes/about');
var project = require('./routes/project');
var projects = require('./routes/projects');
var landing = require('./routes/landing');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
/*app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser('IxD secret key'));
app.use(express.session());
app.use(app.router);*/
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', landing.view);
app.get('/about', about.view);
app.get('/projects', projects.view);
app.get('/:title', project.view);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});