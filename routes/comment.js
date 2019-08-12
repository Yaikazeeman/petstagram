const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/comment', (req, res) => {
    res.render('comment', {
        postId: req.query.post_id
    });
})

router.post('/comment', (req, res, next) => {
    debugger
    let id = req.query.post_id;
    let newComment = req.body.comment
    Post.findByIdAndUpdate(id, {
            $push: {
                comment: newComment
            }
        }, {
            new: true
        })
        .then((post) => {
            res.redirect('/')

        })
        .catch((err) => {
            console.log(err)
        })
})

// router.post('/like/:id', (req, res, next) => {
//     Post.findById(req.params.id)
//         .then((likedPost) => {
//                 return (
//                     Post.findOneAndUpdate({likeedPost},Post.likes = +1)
//                 )
//             }

//         )
// })

module.exports = router;