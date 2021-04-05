var { foodModel } = require("../database/module");

var passport = require('passport')

var FacebookStrategy = require('passport-facebook').Strategy;





passport.serializeUser(function (user, done) {

    done(null, user);
});


passport.deserializeUser(function (user, done) {

    done(null, user);

});

passport.use(
    new FacebookStrategy(
        {
            clientID: 781352602807401,
            clientSecret: "257808d60c493c224b9f27981bcf78c4",
            callbackURL: "http://localhost:5000/auth/facebook/callback",
            passReqToCallback: true,
            profileFields: ['email', 'id', 'name' , 'displayName'],
        },
        function (request, accessToken, refreshToken, profile, done) {
            // console.log('profile is in pasportjs', profile);
            foodModel.findOne({ email: profile.emails[0].value }, function (err, user) {

                if (!user) {
                    var newUser = new foodModel({
                        email: profile.emails[0].value.toLowerCase(),
                        id: profile.id,
                        name: profile.displayName,
                        password: '123',
                        role: 'user'
                    })
                    newUser.save((err, saved) => {
                        if (!err) {
                            done(null, saved)
                        }
                        else {
                            done(err);
                        }
                    })
                } else {
                    done(null, user)
                }
            });

        }
    )
);

