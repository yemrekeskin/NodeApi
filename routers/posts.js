const express = require('express');
const routers = express.Router();

const Post = require('../models/post');


routers.get('/', (req,res) => {
    res.send('We are on posts');
});

routers.get('/specific', (req,res) => {
    res.send('We are on specific');
});

routers.post('/', (req,res) => {
    // console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    post.save()
        .then(data => {
            res.json(data);
        })
        .catch(err => {
            res.json({ message: err});
        });
});

module.exports = routers;