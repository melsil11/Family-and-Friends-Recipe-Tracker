// import dependencies
const mongoose = require('./connection')
// const ingredientSchema = require('./ingredients')
// const User = require('./user')
const commentSchema = require('./comment')

const { Schema, model } = mongoose

const recipeSchema = new Schema({
		name: String,
		plantBased: Boolean,
		vegetarian: Boolean,
		dairyFree: Boolean,
		hasMeat: Boolean,
		glutenFree: Boolean,
		// ingredients is a one to many relations ship and should be used in a different way than a subdocument
		ingredients: [{type: Schema.Types.ObjectID,
			ref: 'Ingredient'}],
		owner: {
			type: Schema.Types.ObjectID,
			ref: 'User'
},
// this is a subdocument
comments: [commentSchema]
}, { timestamps: true })

const Recipe = model('Recipe', recipeSchema)

/////////////////////////////////
// Export our Model
module.exports = Recipe
