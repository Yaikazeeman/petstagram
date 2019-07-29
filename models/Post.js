const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new Schema ({
    postedBy: {type : ObjectId, ref: 'Users' },
    image: String,
    caption: String,
    comment: String,
    likes: Number,
    likedBy: {type: ObjectId, ref: 'Users'}
});

const Post = mongoose.model('posts', postSchema, "posts")

module.exports = Post;