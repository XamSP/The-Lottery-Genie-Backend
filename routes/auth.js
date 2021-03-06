const express = require('express');
const authRoutes = express.Router();
const passport = require('passport');

// User model
const User = require('../models/User');

// Bcrypt to encrypt passwords
const bcrypt = require('bcryptjs');
const bcryptSalt = 10;

// Post Sign up
authRoutes.post('/signup', (req, res, next) => {
    const { name, email, username, password } = req.body;

    // Check required fields
    if (!name || !email || !username || !password) {
        res.status(400).json({ message: 'Provide username and password' });
        return;
    }

    // Check to see if email exists in database
    User.findOne({ email }, '_id', (err, foundUser) => {
        if (foundUser) {
            res.status(400).json({ message: `This email ${email} is already linked to an account` });
            return;
        }
    });

    // Check to see if username exists in database
    User.findOne({ username }, '_id', (err, foundUser) => {
        if (foundUser) {
            res.status(400).json({ message: `This username ${username} already exists` });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        // Define user
        const theUser = new User({
            username,
            password: hashPass,
            name,
            email,
        });

        // Save user to database
        theUser.save((err) => {
            if (err) {
                res.status(400).json({ message: `Something went wrong, err ${err}` });
                return;
            }

            // Login saved user
            req.login(theUser, (err) => {
                if (err) {
                    res.status(500).json({ message: `Something went wrong, err ${err}` });
                    return;
                }

                res.status(200).json(req.user);
            });
        });
    });
});

// Post Login
authRoutes.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, theUser, failureDetails) => {
        console.log('theUser', theUser);
        if (err) {
            res.status(500).json({ message: 'Server Error' });
            return;
        }

        if (!theUser) {
            res.status(401).json(failureDetails);
            return;
        }

        req.login(theUser, (err) => {
            if (err) {
                res.status(500).json({ message: 'Something went wrong' });
                return;
            }

            res.status(200).json(req.user);
        });
    })(req, res, next);
});

// Logout
authRoutes.post('/logout', (req, res, next) => {
    req.logout();
    res.status(200).json({ message: 'Success' });
});

// Loggedin
authRoutes.get('/loggedin', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.status(200).json(req.user);
        return;
    }
    res.status(403).json({ message: 'Unauthorized' });
});

// Private
authRoutes.get('/private', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.json({ message: 'This is a private message' });
        return;
    }

    res.status(403).json({ message: 'Unauthorized' });
});

module.exports = authRoutes;