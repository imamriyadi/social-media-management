// @ts-nocheck
const createError = require('http-errors');
const express = require('express');
const session = require('express-session');
const flash = require("connect-flash");
const socketIo = require("socket.io");
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser'); 
global.client = null;
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const usersRouter = require('./routes/users');
const projectRouter = require('./routes/project');
const messageRouter = require('./routes/message');
const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(flash());
app.use(session({
  secret: 'session-social-management',
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: (1000 * 60 * 100)
  }
}))
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/users', usersRouter);
app.use('/project', projectRouter);
app.use('/message', messageRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
