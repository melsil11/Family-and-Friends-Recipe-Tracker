/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection')
const User = require('./user')
const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const dessertSchema = new Schema({ // schemas should be capitalized, just like other JS classes
		name: String,
		plantBased: Boolean,
		vegetarian: Boolean,
		dairyFree: Boolean,
		hasMeat: Boolean,
		glutenFree: Boolean,
		ingredients: String,
		directions: String,
		type: {// redundant with having separate models for mainCourses and desserts + we should always avoid using reserved keywords as keys for kvps - instead do something more descriptive of the context, like 'course:'
			type: String,
			enum:['maincourse', 'dessert'],// use camel case 
			required: true
		},
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User'
		},
		comments: [commentSchema]
}, { timestamps: true })

const Dessert = model('Dessert', dessertSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Dessert