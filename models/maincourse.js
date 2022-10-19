/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection')
const User = require('./user')
const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const maincourseSchema = new Schema({// schemas should be capitalized, just like other JS classes
		name: String,
		plantBased: Boolean,
		vegetarian: Boolean,
		dairyFree: Boolean,
		hasMeat: Boolean,
		glutenFree: Boolean,
		ingredients: String,
		directions: String,
		type: {// redundant with having separate models for mainCourses and desserts + we want to avoid using potential reserved keywords such as 'type' see dessert model
			type: String,
			enum:['maincourse', 'dessert'],
			required: true
		},
		owner: {			
			type: Schema.Types.ObjectId,
			ref: 'User'	
		},
		comments: [commentSchema]
}, { timestamps: true })

const Maincourse = model('Maincourse', maincourseSchema) // x3! camelCase

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Maincourse // camelCase
