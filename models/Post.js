const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new Schema ({
    postedBy: {type : ObjectId, ref: 'users' },
    image: String,
    caption: String,
    comment: [String],
    likes: Number,
    likedBy: [{type: ObjectId, ref: 'users'}],
    timestamp: {type: Date, default: Date.now}
});

const Post = mongoose.model('posts', postSchema, "posts")

module.exports = Post;