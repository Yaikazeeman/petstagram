const express = require('express');
const router = express.Router();
const Users = require('../models/Users');
const Post = require('../models/Post');

router.get('/profilepage', (req, res) => {
    res.render('profilepage')
})

module.exports = router;