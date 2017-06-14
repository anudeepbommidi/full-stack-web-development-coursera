var express = require('express'),
    config = require('./config'),
    path = require('path'),
    favicon = require('serve-favicon'),
    logger = require('morgan'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    passport = require('passport');

var mongoose = require('mongoose');

mongoose.connect(config.mongoUrl);  
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {

  console.log('Correctly connected to the server.');
  
});    

var index = require('./routes/index'),
    users = require('./routes/users'),
    dishRouter = require('./routes/dishRouter'),
    leaderRouter = require('./routes/leaderRouter'),
    promotionRouter = require('./routes/promotionRouter'),
    favoriteRouter = require('./routes/favoriteRouter');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

//passport config
require('./authenticate/passport')(app);

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/dishes', dishRouter);
app.use('/leadership', leaderRouter);
app.use('/promotions', promotionRouter);
app.use('/favorites', favoriteRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.json({
      message: err.message,
      error: err.status
  });
});

module.exports = app;
