var express = require("express");
var bcrypt = require("bcrypt-inzi");
var jwt = require('jsonwebtoken');
var SERVER_SECRET = '1255';
var { foodModel, otpModel } = require("../database/module");
// console.log("foodModel: ", foodModel);
var passport = require('passport')
// var strategy = require('passport-facebook')
var FacebookStrategy = require('passport-facebook').Strategy;
const { authenticate } = require("passport");
const { app } = require("firebase-admin");

var api = express.Router();

api.use(passport.initialize());
api.use(passport.session());

passport.serializeUser(function (user, cb) {
    cb(null, user)
});
passport.deserializeUser(function (obj, cb) {
    cb(null, obj)
});


passport.use(new FacebookStrategy({
    clientID: 781352602807401,
    clientSecret: "257808d60c493c224b9f27981bcf78c4",
    callbackURL: "http://localhost:5000",
    profileFields: ['id', 'displayName', 'phone', 'email']
},
    function (accessToken, refreshToken, profile, cb) {
        

        foodModel.findOne({ facebookId: profile.id }, function (err, user) {
            console.log("profile ka maal", req.profile)
            if (!err && !user) {
                console.log('hello user');

                var newUser = new foodModel({
                    "name": req.profile.displayName,
                    "email": req.profile.email,
                    "phone": req.profile.phone,

                })
                newUser.save((err, data) => {
                    if (!err) {
                        res.send({
                            status: 200,
                            message: "user created"
                        })
                                        console.log('hello user');
                    } else {
                        console.log(err);
                        res.status(500).send({
                            message: "user create error, " + err
                        })
                        console.log('hello user');
                        
                    }
                });
                return cb(null, newUser)

            } else if (user) {
                var token =
                    jwt.sign({
                        id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role
                    }, SERVER_SECRET)
                res.cookie('jToken', token, {
                    maxAge: 86_400_000,
                    httpOnly: true
                });

                res.send({
                    status: 200,
                    message: "login success",
                    user: {
                        name: user.name,
                        email: user.email,
                        phone: user.phone,
                        role: user.role
                    }
                })
                return cb(null, user)
            } else {
                res.send({
                    message: "user already exist"
                })
                console.log('hello user already exist');

            }
        })
        console.log('user is here')
        return cb(err);
    }
));

api.get('/auth/facebook', passport.authenticate('facebook') , (req,res,next)=>{

    req.send('facebook login')

});

api.get('/auth/facebook/callback',
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '' }) , (req,res,next)=>{
                                        console.log('request user is ',req.cb);
                                      });

api.use((req,res,next)=>{
    console.log('request user is ',req.cb)
    next();
})

api.post("/signup", (req, res, next) => {

    if (!req.body.name
        || !req.body.email
        || !req.body.password
        || !req.body.phone
    ) {

        res.status(403).send(`
            please send name, email, passwod, phone and gender in json body.
            e.g:
            {
                "name": "Noman ali",
                "email": "Noman@gmail.com",
                "password": "123",
                "phone": "03001234567",
                "gender": "Male"
            }`)
        return;
    }

    foodModel.findOne({ email: req.body.email },
        function (err, doc) {
            if (!err && !doc) {

                bcrypt.stringToHash(req.body.password).then(function (hash) {

                    var newUser = new foodModel({
                        "name": req.body.name,
                        "email": req.body.email,
                        "password": hash,
                        "phone": req.body.phone,

                    })
                    newUser.save((err, data) => {
                        if (!err) {
                            res.send({
                                status: 200,
                                message: "user created"
                            })
                        } else {
                            console.log(err);
                            res.status(500).send({
                                message: "user create error, " + err
                            })
                        }
                    });
                })

            } else if (err) {
                res.status(500).send({
                    message: "db error"
                })
            } else {
                res.send({
                    message: "user already exist"
                })
            }
        })

});

api.post("/login", (req, res, next) => {

    if (!req.body.email || !req.body.password) {

        res.status(403).send(`
            please send email and passwod in json body.
            e.g:
            {
                "email": "Noman ali",
                "password": "123",
            }`)
        return;
    }

    foodModel.findOne({ email: req.body.email },
        function (err, user) {
            if (err) {
                res.status(500).send({
                    message: "an error occured: " + JSON.stringify(err)
                });
            } else if (user) {

                bcrypt.varifyHash(req.body.password, user.password).then(isMatched => {
                    if (isMatched) {
                        console.log("matched");
                        var token =
                            jwt.sign({
                                id: user._id,
                                name: user.name,
                                email: user.email,
                                role: user.role
                            }, SERVER_SECRET)
                        res.cookie('jToken', token, {
                            maxAge: 86_400_000,
                            httpOnly: true
                        });

                        res.send({
                            status: 200,
                            message: "login success",
                            user: {
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                role: user.role
                            }
                        });

                    } else {
                        console.log("not matched");
                        res.send({
                            message: "incorrect password"
                        })
                    }
                }).catch(e => {
                    console.log("error: ", e)
                })

            } else {
                res.status(403).send({
                    message: "user not found"
                });
            }
        });
});


api.post("/logout", (req, res, next) => {
    res.clearCookie('jToken');
    res.cookie('jToken', "", {
        maxAge: 86_400_000,
        httpOnly: true
    });
    res.send("logout success");
});

module.exports = api;