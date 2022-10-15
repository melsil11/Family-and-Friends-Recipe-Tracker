// import dependencies
const mongoose = require('./connection')
// import user model for populate
const User = require('./user')

const commentSchema = require('./comment')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

const maincourseSchema = new Schema({
		name: String,
		plantBased: Boolean,
		vegetarian: Boolean,
		dairyFree: Boolean,
		hasMeat: Boolean,
		glutenFree: Boolean,
		ingredients: String,
		directions: String,
		owner: {			
			type: Schema.Types.ObjectId,
			ref: 'User'	
},
comments: [commentSchema]
}, { timestamps: true })

const Maincourse = model('Maincourse', maincourseSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Maincourse
