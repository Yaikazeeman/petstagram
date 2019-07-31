const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const Users = require('../models/Users');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/changepassword', (req, res) => {
    res.render('changepassword')
})

router.post('/changepassword', (req, res) => {
    Users.findOne({_id: res.locals.user._id})
        .then((user) => {
            bcrypt.compare(req.body.currentPassword, user.password, function(err, match) {
                if(err) throw new Error("Encryption error");
                if(match) {
                    bcrypt.hash(req.body.newPassword, 10, function(error, hash) {
                        if(error) throw new Error("Encryption error");
                        var newPassword = {
                            password: hash
                        }
                        Users.findByIdAndUpdate(res.locals.user._id, newPassword, {new:true})
                        .then((updatedUser) => {
                            res.locals.user = updatedUser
                            res.render('profilepage')
                            console.log("password has changed")
                        })
                    })

                    // .catch((err) => {
                    //     console.log(err)
                    // })
            }else{
                res.send("invalid password or username")
            }})
        // .catch((err)=> {
        //     console.log(err)
        // })
    })
})

module.exports = router;