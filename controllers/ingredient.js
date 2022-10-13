// Import Dependencies
const express = require("express")
const Recipe = require("../models/recipe")
const Ingredient = require("../models/ingredients.js")
// Create router
const router = express.Router()

// Router Middleware
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

// index ALL
router.get('/', (req, res) => {
	Ingredient.find({})
		// .populate("comments.author", "username")
		.then(ingredients => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId
			res.render('ingredients/index', { ingredients, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// create POST
router.post('/', (req, res) => {
    req.body.owner = req.session.userId
    Ingredient.create(req.body)
		.then(ingredient => {
            console.log('this was returned from create', Ingredient)
			res.redirect('/ingredients')
        })
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const ingredientId = req.params.id

	const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
	Ingredient.findById(ingredientId)
		.then(ingredient => {
			res.render('ingredients/edit', { ingredient, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const ingredientId = req.params.id

	Ingredient.findByIdAndUpdate(ingredientId, req.body, { new: true })
		.then(ingredient => {
			res.redirect(`/ingredients/${ingredient.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})
