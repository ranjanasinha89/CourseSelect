const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
const keys = require("../config/keys");
const GooglePlusTokenStrategy = require("passport-google-plus-token");
const passport = require("passport");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = passport => {
  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );
};

//Google oauth strategy
passport.use(
  "googleToken",
  new GooglePlusTokenStrategy(
    {
      //options for the google strat
      callbackURL: "/api/users/google/redirect",
      clientID: keys.google.clientID,
      clientSecret: keys.google.clientSecret
    },
    (accessToken, refreshToken, profile, done) => {
      //passport callback function
      // Check whether this current user exists or not
      User.findOne({ "google.id": profile.id }).then(user => {
        if (user) {
          console.log("User already exists");
          return done(null, user);
        }
        //if new account
        const newUser = new User({
          method: "google",
          google: {
            id: profile.id,
            email: profile.emails[0].value,
            name: profile.displayName,
            avatar: profile.photos[0].value
          }
        });
        newUser.save().then(newUser => {
          done(null, newUser);
        });
      });
    }
  )
);
