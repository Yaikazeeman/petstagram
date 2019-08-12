const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;
// const Post = require('./models/Post');

const userSchema = new Schema ({
    username: String,
    profileImg: {type: String, default: "https://res.cloudinary.com/dkrua0amo/image/upload/v1565260497/Petstagram/default.png.png"},
    profileImgName: String,
    email: String,
    password: String,
    bio: String,
    pets: Array,
    posts: [{type: ObjectId, ref: 'posts'}],
    liked: [{type: ObjectId, ref: 'posts'}]
});

const User = mongoose.model('users', userSchema, "users")

module.exports = User;