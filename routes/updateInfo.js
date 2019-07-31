const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/updateInfo', (req, res) => {
    res.render('updateInfo');
})

router.post('/updateInfo', (req, res, next) => {
    debugger
    let updateInfo = {
        // username: req.body.username,
        email: req.body.email,
        bio: req.body.bio,
        profileImg: req.file.filename,
    }
    Users.findByIdAndUpdate(res.locals.user._id, updateInfo,{new:true})
    .then((updatedUser) => {
        console.log("info has been updated")
        // console.log(updatedUser)
        res.locals.user = updatedUser
        res.render('profilepage')
    })
    .catch((error) => {
        console.log(error)
    })
})

module.exports = router; 