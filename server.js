var express = require('express');
var app = express();
var port = 3000;

var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var flash = require('connect-flash');

configDB = require('./config/database.js');
mongoose.connect(configDB.url);
require('./config/passport')(passport);

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({ secret: 'anystringoftext',
                  saveUninitialized: true,
                  resave: true  }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine','ejs');

require('./routes/routes.js')(app, passport);

app.listen(port,function(){
  console.log('Server running on port: ' + port);
});
