const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');

router.get('/profilepage', (req, res) => {
    res.render('profilepage')
})

router.post('/profilepage', (req, res) => {
    let updateInfo = {
        bio: req.body.bio,
        profileImg: req.file.filename
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