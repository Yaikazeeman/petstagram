const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const User = require('../models/Users');

router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/signup', (req, res) => {
    res.render('signup');
})

//signup function with bcrypt
router.post('/signup', (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(error, hash) {
        if(error) throw new Error("Encryption error");
        let newUser = new User ({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        newUser.save()
            .then(()=>{
                res.redirect('/login')
                console.log("profile is saved... or is it??")
            })
            .catch((err) => {
                console.log("something went wrong")
                console.log(err)
            })
    })
})

module.exports = router;