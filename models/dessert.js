/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
const mongoose = require('./connection')
const User = require('./user')
const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const dessertSchema = new Schema({
		name: String,
		plantBased: Boolean,
		vegetarian: Boolean,
		dairyFree: Boolean,
		hasMeat: Boolean,
		glutenFree: Boolean,
		ingredients: String,
		directions: String,
		type: {
			type: String,
			enum:['maincourse', 'dessert'],
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