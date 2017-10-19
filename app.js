var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var routes= require('./routes/index.js');
var mongo = require('mongodb');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var mongoose = require('mongoose');
var passport = require('passport');
var cors = require('cors');
var LocalStrategy = require('passport-local').Strategy;
mongoose.connect('mongodb://localhost/webdevops');
var db = mongoose.connection;
console.log('DB connected');

//init app
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// Express Session
app.use(session({
    secret: 'secret',
    saveUninitialized: true,
    resave: true
}));

// Passport init
app.use(passport.initialize());
app.use(passport.session());

app.use(cors());
// Global Vars
app.use(function (req, res, next) {
    res.locals.user = req.user || null;
    next();
});

app.use(function (req, res, next) {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.use('/', routes);

app.set('port', (process.env.PORT || 3000));

app.listen(app.get('port'), function(){
    console.log('Server started on port '+app.get('port'));
});