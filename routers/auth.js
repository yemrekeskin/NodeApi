const express = require('express');
const routers = express.Router();

const User = require('../models/user');

// validation
const validators = require('../validation');


routers.post('/register', async (req, res) => {

    // validation
    console.log(req.body);
    const {error} = validators.registerValidator(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        passwrd: req.body.password
    });

    try {
        var createdUser = await newUser.save();
        res.send(createdUser);
    } catch (error) {
        res.json({ message: error });
    }
});

routers.post('/login', (req, res) => {

});

module.exports = routers;