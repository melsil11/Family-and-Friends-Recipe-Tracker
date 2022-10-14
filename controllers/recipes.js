// Import Dependencies
const express = require('express')
const Recipe = require('../models/recipe')
const Ingredient = require('../models/ingredients')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

// index ALL
router.get('/', (req, res) => {
	Recipe.find({})
		.populate("comments.author", "username")
		.then(recipes => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId
			res.render('recipes/index', { recipes, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's recipes
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Recipe.find({ owner: userId })
		.then(recipes => {
			res.render('recipes/index', { recipes, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('recipes/new', { username, loggedIn, userId })
})

// custom async function to take a list of ingredients and get the id's
const ingredientParse = async (ingredientString) => { // function expects comma seperated list as its input
	console.log('this is the ingredients string that we passed as an argument', ingredientString)
	const ingredientsArray = ingredientString.toLowerCase().split(",")// breaking the string list into an array of strings via comma's
	console.log(ingredientsArray, 'this is are ingredients array, after we split')
	const readFile =(inFile) => {
		return new Promise((resolve, reject) => {
			for (let i = 0; i < ingredientsArray.length; i++){ (Recipe.find())}
			reject (error)	
		})
		.then(success)
		.catch(failure)
	}
	const ingIdArray = [] // initialized empty placeholder array for our ingredient id's
	return await ingredientsArray.map(async (ingString) => { // loop through ingredients array 
		const ingObject = await Ingredient.find({name: ingString}) //finding the ingredient  that matches the specific name we passed
		 console.log(ingObject)
		//  if (ingObject._id) {

		//  }
		//  ingIdArray.push(ingObject._id) // we are adding the object id into the array
		return ingObject._id
	}) 
	// await console.log(idArray) 
	// await console.log("this is our return array, it should be our id's")
	// return (idArray)
}

// create -> POST route that actually calls the db and makes a new document
router.post('/', async (req, res) => {
	
	req.body.plantBased = req.body.plantBased === 'on' ? true : false
	req.body.vegetarian = req.body.vegetarian === 'on' ? true : false
	req.body.dairyFree = req.body.dairyFree === 'on' ? true : false
	req.body.hasMeat = req.body.hasMeat === 'on' ? true : false
	req.body.glutenFree = req.body.glutenFree === 'on' ? true : false

	req.body.owner = req.session.userId
	// const ingredientsArray = req.body.ingredients.toLowerCase().split(",")
	// console.log(ingredientsArray)
	// const ingIdArray = []
	// ingredientsArray.forEach((ingString) => {
	// 	Ingredient.find({name: ingString})
	// 		.then((ingObject) => {
	// 			console.log(ingObject)
	// 			ingIdArray.push(ingObject._id)
	// 		})
	// }) 
			
	// 			req.body.ingredients = ingIdArray
	// 			console.log(req.body)
	
	const tempArray = await ingredientParse(req.body.ingredients)
	req.body.ingredients = tempArray

				await Recipe.create(req.body)
					.then((recipe) =>{
						console.log(recipe)
					})
					.then(()=>{
						res.redirect('/recipes')
					})
					
			
				
			
	// {
	// 	name: 'a whole lotta love',
	// 	_id: new ObjectId("63484b0c4cbf5ebe186921a0"),
	//   },
	//   {
	// 	name: 'a little bit of this',
	// 	_id: new ObjectId("63484b0c4cbf5ebe186921a1"),
	//   }
	
	// Recipe.create(req.body)
	// 	.then(recipe => {
	
	// 		res.redirect('/recipes')
	// 	})
	// 	.catch(error => {
	// 		res.redirect(`/error?error=${error}`)
	// 	})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const recipeId = req.params.id

	const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
	Recipe.findById(recipeId)
		.then(recipe => {
			res.render('recipes/edit', { recipe, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const recipeId = req.params.id
	req.body.plantBased = req.body.plantBased === 'on' ? true : false
	req.body.vegetarian = req.body.vegetarian === 'on' ? true : false
	req.body.dairyFree = req.body.dairyFree === 'on' ? true : false
	req.body.hasMeat = req.body.hasMeat === 'on' ? true : false
	req.body.glutenFree = req.body.glutenFree === 'on' ? true : false
	console.log('req.body after changing checkbox value', req.body)
	
	Recipe.findByIdAndUpdate(recipeId, req.body, { new: true })
		.then(recipe => {
			res.redirect(`/recipes/${recipe.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/:id', (req, res) => {
	const recipeId = req.params.id
	Recipe.findById(recipeId)
		.populate("ingredients")
		.populate("comments.author", "username")
		.then(recipe => {
            const {username, loggedIn, userId} = req.session
			res.render('recipes/show', { recipe, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const recipeId = req.params.id
	Recipe.findByIdAndRemove(recipeId)
		.then(recipe => {
			res.redirect('/recipes/mine')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
