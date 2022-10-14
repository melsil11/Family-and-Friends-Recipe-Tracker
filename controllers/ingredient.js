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
			// res.render('ingredients/index', 
			// { ingredients, username, loggedIn, userId })
		
			res.json({ingredients: ingredients })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('ingredient/new', { username, loggedIn, userId })
})


// index that shows only the user's ingredients
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Ingredient.find({ owner: userId })
		.then(ingredients => {
			res.render('ingredients/index', { ingredients, username, loggedIn })
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
			// res.json({ ingredient: ingredient })
        })
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// router.post('/:recipeId', (req, res) => {
//     const recipeId = req.params.recipeId

//     if (req.session.loggedIn){
//         req.body.author = req.session.userId
//     } else {
//         res.sendStatus(401)
//     }
//     // console.log('did I make it')
//     Recipe.findById(recipeId)
//     .then(recipe => {
//         recipe.ingredients.push(req.body)
//         return recipe.save()
        
//     })
//     .then(recipe => {
//         res.redirect(`/recipes/${recipe.id}`)
//     })
//     .catch(err => res.redirect(`/error?error=${err}`))
// })

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

// show route
router.get('/:id', (req, res) => {
	const ingredientId = req.params.id
	Ingredient.findById(ingredientId)
		// .populate("ingredients")
		.then(ingredient => {
            const {username, loggedIn, userId} = req.session
			res.render('ingredients/show', { ingredient, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

//  delete route
router.delete('/:id', (req, res) => {
	const ingredientId = req.params.id
	Ingredient.findByIdAndRemove(ingredientId)
		.then(ingredient => {
			res.redirect('/ingredient')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// Export the Router
module.exports = router