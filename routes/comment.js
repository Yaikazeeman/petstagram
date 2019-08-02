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
    res.render('comment');
})

router.post('/comment', (req, res, next) => {
    debugger
            let id =req.query.post_id;
            let newComment =  req.body.comment
            Post.findById(id)
                .then((post) => {
                        let commentArr = post.comment
                       commentArr.push(newComment)
                        Post.findByIdAndUpdate(id, {
                                comment: commentArr
                            }, {
                                new: true
                            })
                            .then(() => {
                                res.render('/')
                            })
                            .catch((err) => {
                                console.log(err)
                            })
                    }
                )
                .catch((err) => {
                    console.log(err)
                })
                })

        module.exports = router;