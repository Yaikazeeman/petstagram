const express    = require('express');
const router     = express.Router();
const Users      = require('../models/Users');
const Post       = require('../models/Post');
const multer     = require('multer');


router.get('/', (req, res) => {
    Post.find({})
        .then(posts => {
            res.render('index', {posts})
            console.log("homepage is rendered")
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router; 