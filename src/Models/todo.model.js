const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    name: {
        type: String
    },
    type: {
        type: String
    },
    active: {
        type: Boolean,
        default: true
    },
    important: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date
    },
    userId: {
        type: String
    }
});

module.exports = mongoose.model('todo', todoSchema);