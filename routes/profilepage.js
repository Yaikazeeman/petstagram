const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');

router.get('/profilepage', (req, res) => {
    Users.findById(res.locals.user._id)
        .populate('posts', 'image', null, { sort: { 'timestamp': -1 } })
        .then(userpage => {
            console.log(userpage)
            res.render('profilepage', {userpage})
            console.log("userpage is rendered")
        })
        .catch(err => {
            console.log(err)
        })
})

router.post('/profilepage', (req, res) => {
    debugger
    let updateInfo = {
        bio: req.body.bio,
    }
    Users.findByIdAndUpdate(res.locals.user._id, updateInfo,{new:true})
        .populate('posts', 'image', null, {
            sort: {
                'timestamp': -1
            }
        })
        .then((userpage) => {
            res.locals.user = userpage
            res.render('profilepage', {
                userpage
            })
            console.log("info has been updated")
        console.log("info has been updated")
        // console.log(updatedUser)
        res.locals.user = updatedUser
        res.render('profilepage',{})
    })
    .catch((error) => {
        console.log(error)
    })
})

// router.post('/profilepage-img', (req, res) => {
//     let updateImg = {
//         profileImg: req.file.filename,
//     }
//     Users.findByIdAndUpdate(res.locals.user._id, updateImg,{new:true})
//     .then((updatedUser) => {
//         console.log("info has been updated")
//         console.log(updatedUser)
//         res.locals.user = updatedUser
//         res.render('profilepage')
//     })
//     .catch((error) => {
//         console.log(error)
//     })
// })

module.exports = router;