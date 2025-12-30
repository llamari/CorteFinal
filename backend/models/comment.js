const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    movieId: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    },
    likes: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
}, {collection: 'Comments'});

const Comment = mongoose.model('Comment', commentSchema);

module.exports = Comment;