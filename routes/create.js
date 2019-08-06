const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', (req, res, next) => {
    console.log(req.body.postedBy)
    let newPost = new Post({
            postedBy: mongoose.Types.ObjectId(res.locals.user._id),
            image: req.file.url,
            imageName: req.file.originalname,
            caption: req.body.caption
        })

    newPost.save(
            Post.populate(newPost, 'postedBy')
        )
        .then((post) => {
            var postArray = mongoose.Types.ObjectId(post._id)
            var arr = res.locals.user.posts;
            arr.push(postArray)
            Users.findByIdAndUpdate(res.locals.user._id, { posts: arr }, { new: true })
                .then((updateArray) => {
                    console.log("post array is updated")
                    res.locals.user = updateArray
                })
                .catch((error) => {
                    console.log(error)
                })
            res.redirect('/')
            console.log("Your post is saved")
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;