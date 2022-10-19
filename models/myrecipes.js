/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection')
const User = require('./user')
const commentSchema = require('./comment')
const maincourseSchema = require('./maincourse')
const dessertSchema = require('./dessert')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const myRecipesSchema = new Schema({// capitalize the schema variable so we know it's an object as per best practice 
    // maincourses: [maincourseSchema],
    // desserts: [dessertSchema],
    owner: {			
        type: Schema.Types.ObjectId,
        ref: 'User'	
},
// desserts: [dessertSchema],// these being outside the schema means they're interpreted as options, not what you would want here
// maincourses: [maincourseSchema],
// comments: [commentSchema]
}, { timestamps: true })

const Myrecipes = model('Myrecipes', myRecipesSchema)// camelCase

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Myrecipes