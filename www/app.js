var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash'); 
var indexRouter = require('./routes/index');
var buildingRouter = require('./routes/building');
var doorlockRouter = require('./routes/doorlock');
var issuekeyRouter = require('./routes/issuekey');
var staffRouter = require('./routes/staff');
var reportRouter = require('./routes/report');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(session({
  secret: '@#@$MYSIGN#@$#$',
  resave: false,
  saveUninitialized: true,
  cookie: {
     maxAge: 1000 * 60 * 60 * 10// 쿠키 유효기간 10시간->(1000 * 60 * 60 * 10)
   }
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(__dirname, 'public')));

//하위경로에서 static파일 읽기
app.use('/property_del',express.static(path.join(__dirname, 'public')));
app.use('/property_read',express.static(path.join(__dirname, 'public')));
app.use('/property_edit',express.static(path.join(__dirname, 'public')));
app.use('/property_category',express.static(path.join(__dirname, 'public')));
app.use('/properties/:id/building_list',express.static(path.join(__dirname, 'public')));
app.use('/properties/:id/building_new',express.static(path.join(__dirname, 'public')));
app.use('/properties/:id/doorlock_list',express.static(path.join(__dirname, 'public')));
app.use('/properties/:id/issuekey',express.static(path.join(__dirname, 'public')));
app.use('/properties/:id/staff_list',express.static(path.join(__dirname, 'public')));
app.use('/properties/:id/report',express.static(path.join(__dirname, 'public')));

//logout 후 뒤로가기 시 방문했던 화면 보이던 것 처리
app.use(function(req, res, next) {
  res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next();
});

app.use(function(req, res, next) {
 if(req.user) res.locals.user = req.user;
 next();
}); 

app.use('/', indexRouter);
app.use('/properties/:id/building', buildingRouter);
app.use('/properties/:id/doorlock', doorlockRouter);
app.use('/properties/:id/issuekey', issuekeyRouter);
app.use('/properties/:id/staff', staffRouter);
app.use('/properties/:id/report', reportRouter);

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
