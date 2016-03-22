var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var home = require('./routes/home');
var checklist = require('./routes/checklist');
var help = require('./routes/help');
var api = require('./routes/api');
var log = require('./routes/log');

//setup, configure, and connect to MongoDB
var mongoose = require('mongoose');

var app = express();

mongoose.connect('mongodb://' + process.env.IP);

app.use(bodyParser.json());

//test code for mongoose
// var testitemsSchema = mongoose.Schema({
//     number: Number,
//     items: String,
//     rse: String,
//     result: String,
//     comments: String
// });

// var Testitems = mongoose.model('Testitems', testitemsSchema);

// var itemsTemp = new Testitems({
//   number: 10,
//   items: "Video test",
//   rse: "Jason.Brown",
//   result: "Pass",
//   comments: "jQuery is a fast, small, and feature-rich Java like HTML document traversal and manipulation.",
//   icon: "/images/favicon.ico"
// });

// itemsTemp.save(function (err, itemsTemp) {
//   if (err) return console.error(err);
//   console.log("Data saved!");
// });

app.get('/testitems', function(req, res) {
    mongoose.model('Testitems').find(function(err,users){
      res.send(users);
    });
});


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', '/images/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

app.use('/', routes);
app.use('/users', users);
app.use('/home',home);
app.use('/checklist',checklist);
app.use('/log',log);

app.use('/help',help);

app.use('/api',api);


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
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});



module.exports = app;
