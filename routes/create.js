const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');
const bodyParser = require('body-parser');
const mongoose   = require('mongoose');
// const Movie = require('../models/movie.js');
// const uploadCloud = require('../config/cloudinary.js');
// const cloud = require('./cloudinaryConfig');
// const cloudinary = require('cloudinary').v2
// const imageController = require('./imageController');
// const upload = require('./cloudinaryUploads/multer');

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
    // cloud.uploads(newPost.image)
    // .then((result) => {
    //     var imageDetails = {
    //     imageName: req.body.imageName,
    //     cloudImage: result.url,
    //     imageId: result.id
    //     }
    //     //THEN CREATE THE FILE IN THE DATABASE
    //     imageModel.create(imageDetails, (err, created)=> {

    // router.post('/create', upload.any(), imageController.createApp);
    
    newPost.save(
        Post.populate(newPost, 'postedBy')
    )
        .then((post)=>{
            var postArray = mongoose.Types.ObjectId(post._id)
            var arr=res.locals.user.posts;
            arr.push(postArray)
            Users.findByIdAndUpdate(res.locals.user._id,{posts:arr} ,{new:true})
            .then((updateArray) => {
                console.log("post array is updated")
                res.locals.user = updateArray
            })
            .catch((error) => {
                console.log(error)
            })
            res.redirect('/')
            console.log("Your post is saved" )
        })
        .catch((err) => {
            console.log(err)
        })
})

module.exports = router; 