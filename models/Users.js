const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const objectId = mongoose.Schema.Types.objectId;
// const Post = require('./models/Post');

const userSchema = new Schema ({
    username: String,
    profileImg: String,
    email: String,
    password: String,
    bio: String,
    // posts: {type: objectId, ref: 'Post'}
});

const User = mongoose.model('users', userSchema, "users")

module.exports = User;