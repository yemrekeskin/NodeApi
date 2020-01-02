const express = require('express');
const routers = express.Router();

const User = require('../models/user.model');

const validators = require('../validators/auth.validator');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

routers.post('/register', async (req, res) => {

    // validation
    // console.log(req.body);

    const { error } = validators.registerValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user already in the database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send('Email already exist');

    // Hashing passwords
    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    // create a new user
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try {
        var createdUser = await newUser.save();
        res.send(createdUser);
    } catch (error) {
        res.json({ message: error });
    }
});

routers.post('/login', async (req, res) => {

    // validation
    const { error } = validators.loginValidator(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Checking if the user already in the database
    const userExist = await User.findOne({ email: req.body.email });
    if (!userExist) return res.status(400).send('Email is not found ');

    // password is correct
    const validPass = await bcrypt.compare(req.body.password, userExist.password);
    if (!validPass) return res.status(400).send('InValid password');

    // Create and assign a token
    const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token); //.send('Logged in');
});

module.exports = routers;