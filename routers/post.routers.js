const express = require('express');
const routers = express.Router();

// token validation
const verify = require('../middlewares/verifyToken');
const Post = require('../models/post.model');

// Get all back to all posts
routers.get('/', verify, async (req, res) => {
    try {
        const posts = await Post.find();
        // res.send(posts);

        res.send(req.user);
    } catch (error) {
        res.json({ message: error });
    }
});

// Specific post
routers.get('/:postId', async (req, res) => {
    // console.log(req.params.postId);
    try {
        const post = await Post.findById(req.params.postId);
        res.json(post);
    } catch (error) {
        res.json({ message: error });
    }
});

// routers.post('/', (req,res) => {
//     // console.log(req.body);
//     const post = new Post({
//         title: req.body.title,
//         description: req.body.description
//     });

//     post.save()
//         .then(data => {
//             res.json(data);
//         })
//         .catch(err => {
//             res.json({ message: err});
//         });
// });

routers.post('/', async (req, res) => {
    // console.log(req.body);
    const post = new Post({
        title: req.body.title,
        description: req.body.description
    });

    try {
        const savePost = await post.save();
        res.json(savePost);

    } catch (error) {
        res.json({ message: error });
    }
});


routers.delete('/:postId', async (req, res) => {
    try {
        const removedPost = await Post.remove({ _id: req.params.postId });
        res.json(removedPost);
    } catch (error) {
        res.json({ message: error });
    }
});

routers.patch('/:postId', async (req, res) => {
    try {
        const updatedPost = await Post.updateOne(
            { _id: req.params.postId },
            { $set: { title: req.body.title } });

        res.json(updatedPost);
    } catch (error) {
        res.json({ message: error });
    }
});


module.exports = routers;