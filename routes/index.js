var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended: true}));
router.use(bodyParser.json());
router.use(bodyParser.json({type: 'application/vnd.api+json'}));
var maincontroller=require('../controllers/usercontroller.js');

router.get('/',function(req,res){
	res.redirect('http://localhost:3030');
});
router.get('/login',function(req,res){
    res.redirect('http://localhost:3030/signup');
});
router.post('/register',function(req,res){
 	maincontroller.verification(req,res);
 });
router.post('/login', passport.authenticate('local', {successRedirect:'/', failureRedirect:'/login'}),
    function(req, res) {
        res.redirect('http://localhost:3030/');
    });
passport.use(new LocalStrategy(
    function(email, password, done) {
        User.getUserByEmail(email,function(err, user){
            if(err) throw err;
            if(!user){
                return done(null, false, {message: 'Unknown User'});
            }

            User.comparePassword(password, user.password, function(err, isMatch){
                if(err) throw err;
                if(isMatch){
                    return done(null, user);
                    console.log('User is found');
                } else {
                    return done(null, false, {message: 'Invalid password'});
                }
            });
        });
    }));

passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});
module.exports= router;