const express    = require('express');
const router     = express.Router();
const Users      = require('../models/Users');
const Post       = require('../models/Post');


router.get('/', (req, res) => {
    Post.find({}).sort({timestamp: -1})
        .populate('postedBy')    
        .then(posts => {
            res.render('index', {posts})
            console.log("homepage is rendered")
        })
        .catch(err => {
            console.log(err)
        })
})


module.exports = router; 

