const User = require('../models/user');
const mongoose = require('mongoose');


exports.signup = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;

    if (!email || !password){
        return res.status(422).send({ error: 'You must provide email and password'});
    }

    User.findOne({ email: email }, (err, existingUser)=> {
        if (err) { return next(err); }

        // If a user with email does exist, return an error
        if (existingUser){
            return res.status(422).send({ error: 'Email is in use' });
        }

        // If a user with email does NOT exist, create and save user record
        const user = new User({
            email: email,
            password: password
        });

        user.save(err => {
            if (err) { return next(err); }
            res.json({ success: true });
        });
    });
};