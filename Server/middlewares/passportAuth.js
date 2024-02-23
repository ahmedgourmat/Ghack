const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport')
require('dotenv').config()
const User = require('../models/userModel')

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
    scope:["profile" , "email"]
},
    function (accessToken, refreshToken, profile, cb) {
        // Check if a user with the provided email exists
        User.findOne({ email: profile.emails[0].value })
            .then(existingUser => {
                if (existingUser) {
                    // If a user with the email exists, send the existing user to the frontend
                    cb(null, existingUser);
                } else {
                    // If no user with the email exists, create a new user
                    var newUser = new User({
                        username: profile.displayName, // Assuming display name is the username
                        email: profile.emails[0].value,
                        status: 'User',
                        picture: profile.photos[0].value, // Assuming you have picture in profile
                        password: null // Google OAuth doesn't provide password
                    });

                    // Save the new user to the database
                    newUser.save()
                        .then(savedUser => {
                            // Send the newly created user to the frontend
                            cb(null, savedUser);
                        })
                        .catch(err => {
                            // If an error occurs during save, pass the error to the callback
                            cb(err);
                        });
                }
            })
            .catch(err => {
                // If an error occurs during database query, pass the error to the callback
                cb(err);
            });
    }
));


passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
        done(null, user);
});