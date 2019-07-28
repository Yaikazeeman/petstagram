const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema ({
    username: String,
    profileImg: String,
    email: String,
    password: String,
    bio: String
});

const User = mongoose.model('users', userSchema, "users")

module.exports = User;