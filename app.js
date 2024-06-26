var createError = require('http-errors');
var express = require('express');
var path = require('path');
const session = require('express-session');
var flash = require('express-flash');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const fileUpload = require("express-fileupload");
// const bodyparser = require('body-parser');
const multer = require('multer');
var nodemailer = require('nodemailer');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// body-parser middleware use
// app.use(bodyparser.json())
// app.use(bodyparser.urlencoded({
//   extended: true
// }))







app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('public/images'));

app.use(fileUpload());
app.use(flash());

app.use(session({
  secret: '123456cat',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;