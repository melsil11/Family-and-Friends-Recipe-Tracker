/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection')

const { Schema } = mongoose

// comment schema
const commentSchema = new Schema({ // schemas should be capitalized, just like other JS classes 
    note: {
        type: String,
        required: true
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
})

/////////////////////////////////////////////
// Export Schema
/////////////////////////////////////////////
module.exports = commentSchema