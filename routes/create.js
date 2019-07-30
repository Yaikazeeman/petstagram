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

router.post('/create', (req, res, next) => {
    // console.log(req.file.filename)
    // res.redirect('/create')
    // const imgReceived = `${req.file.filename}.jpg`
    let newPost = new Post ({
        image: req.file.filename,
        caption: req.body.caption
    })
    newPost.save()
    // .populate('postedBy')
        .then(()=>{
            res.redirect('/')
            console.log("Your post is saved")
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router; 