const mongoose = require('./connection')
const User = require('./user')


const { Schema, model } = mongoose

const ingredientSchema = new Schema({
	name: String,
	// owner: {
	// 	type: Schema.Types.ObjectID,
	// 	ref: 'User',
	// }
},{ timestamps: true})

const Ingredient = model('Ingredient', ingredientSchema)

/////////////////////////////////
module.exports = Ingredient