const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');
const bodyParser = require('body-parser');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/create', (req, res) => {
    res.render('create');
})

router.post('/create', (req, res) => {
    if(error) throw new Error("Encryption error");
    let newPost = new Post ({
        image: req.body.image,
        caption: req.body.caption
    })
    newPost.save()
        .then(()=>{
            res.redirect('/')
            console.log("Your post is saved")
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router; 