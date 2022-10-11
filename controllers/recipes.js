// Import Dependencies
const express = require('express')
const Recipe = require('../models/recipe')

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
		// .populate("comments.author", "username")
		.then(recipes => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			
			res.render('recipes/index', { recipes, username, loggedIn })
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

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.plantBased = req.body.plantBased === 'on' ? true : false
	req.body.vegetarian = req.body.vegetarian === 'on' ? true : false
	req.body.dairyFree = req.body.dairyFree === 'on' ? true : false
	req.body.hasMeat = req.body.hasMeat === 'on' ? true : false
	req.body.glutenFree = req.body.glutenFree === 'on' ? true : false

	req.body.owner = req.session.userId
	Recipe.create(req.body)
		.then(recipe => {
			console.log('this was returned from create', recipe)
			res.redirect('/recipes')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
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
			res.redirect('/recipes')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
