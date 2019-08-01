const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/delete/:id', function (req, res, next) {
    Post.deleteOne({_id: req.params.id})
    .populate('Users')
        .then(() => {
            res.redirect('/')
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router;