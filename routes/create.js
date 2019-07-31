const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', (req, res, next) => {
    console.log(req.body.postedBy)
    let newPost = new Post ({
        postedBy: mongoose.Types.ObjectId(res.locals.user._id),
        image: req.file.filename,
        caption: req.body.caption
    })
    newPost.save(
        Post.populate(newPost, 'postedBy')
    )
        .then((post)=>{
            res.redirect('/')
            console.log("Your post is saved" )
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router; 