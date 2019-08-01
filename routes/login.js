const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/Users');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

router.use(bodyParser.urlencoded({
    extended: false
}));

router.get('/login', (req, res) => {
    res.render('login');
})

router.post('/login', (req, res) => {
    User.findOne({
            username: req.body.username
        })
        .then((user) => {
            bcrypt.compare(req.body.password, user.password, function (err, match) {
                if (err) throw new Error("Encryption error");
                if (match) {
                    req.session.user = user;
                    res.redirect('/')
                    console.log("logged in!! yeaayy!")
                } else {
                    res.send("invalid password or username")
                }
            })
        })
        .catch((err) => {
            console.log(err)
        })
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    console.log("you are logged out")
    res.redirect('/login')
})

module.exports = router;