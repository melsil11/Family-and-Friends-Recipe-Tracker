// import dependencies
const mongoose = require('./connection')
// import user model for populate
const User = require('./user')

const commentSchema = require('./comment')
const maincourseSchema = require('./maincourse')
const dessertSchema = require('./dessert')
// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const myRecipesSchema = new Schema({
    // maincourses: [maincourseSchema],
    // desserts: [dessertSchema],
    owner: {			
        type: Schema.Types.ObjectId,
        ref: 'User'	
},
// desserts: [dessertSchema],
// maincourses: [maincourseSchema],
// comments: [commentSchema]
}, { timestamps: true })

const Myrecipes = model('Myrecipes', myRecipesSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Myrecipes