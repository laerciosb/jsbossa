var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var expressValidator = require('express-validator');

const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./docs/swagger.json');

var db = require('./config/db');
var settings = require('./config/settings');
var connectRoles = require('./config/connect_roles');
var passport = require('./config/passport');
var expressSession = require('express-session');
var routesVersioning = require('express-routes-versioning')();

var sessions = require('./routes/sessions');
var users = require('./routes/users');
var roles = require('./routes/roles');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(expressValidator());
app.use(expressSession({
  secret: '3026e4356ecd343ce3f6b4d18e2b3316',
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(connectRoles.middleware());

// allow cross origin requests
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// By default, accept-version headers are used for versioning,
// below middleware overrrides it by setting req.version
app.use(function(req, res, next) {
  req.version = req.headers['accept-version'] || '1.0.0';
  next();
});

// app.use('/api/videos', routesVersioning({"1.0.0" : videos, "2.0.0" : videosSub}));
app.use('/api/auth', sessions);
app.use('/api/users', users);
app.use('/api/roles', roles);

app.use('/api/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// error handler response
app.use(function(err, req, res, next) {
  if (app.get('env') !== 'development') delete err.stack;
  return res.status(err.status).json({
    error: {
      message: err.message,
      status: err.status,
      stack: err.stack
    }
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});


module.exports = app;
