// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const ingredientSchema = new Schema({
	name: String,
	owner: {
		type: Schema.Types.ObjectID,
		ref: 'User',
	}
},{ timestamps: true})


const recipeSchema = new Schema(
	{
		name: String,
		plantBased: Boolean,
		vegetarian: Boolean,
		dairyFree: Boolean,
		hasMeat: Boolean,
		glutenFree: Boolean,
		ingredients: [ingredientSchema],
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User',
		}
		// comments: [commentSchema]
	},	{ timestamps: true })

const Recipe = model('Recipe', recipeSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Recipe
