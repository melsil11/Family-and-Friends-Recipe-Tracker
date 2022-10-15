// Import Dependencies
const express = require('express')
const Dessert = require('../models/dessert')

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
	Dessert.find({})
		.populate("comments.author", "username")
		.then(desserts => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId
			res.render('desserts/index', { desserts, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's desserts
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Dessert.find({ owner: userId })
		.then(desserts => {
			res.render('desserts/index', { desserts, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('desserts/new', { username, loggedIn, userId })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.plantBased = req.body.plantBased === 'on' ? true : false
	req.body.vegetarian = req.body.vegetarian === 'on' ? true : false
	req.body.dairyFree = req.body.dairyFree === 'on' ? true : false
	req.body.hasMeat = req.body.hasMeat === 'on' ? true : false
	req.body.glutenFree = req.body.glutenFree === 'on' ? true : false

	req.body.owner = req.session.userId
	Dessert.create(req.body)
		.then(dessert => {
			console.log('this was returned from create', dessert)
			res.redirect('/desserts')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const dessertId = req.params.id
	const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
	Dessert.findById(dessertId)
		.then(dessert => {
			res.render('desserts/edit', { dessert, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const id = req.params.id
	req.body.plantBased = req.body.plantBased === 'on' ? true : false
	req.body.vegetarian = req.body.vegetarian === 'on' ? true : false
	req.body.dairyFree = req.body.dairyFree === 'on' ? true : false
	req.body.hasMeat = req.body.hasMeat === 'on' ? true : false
	req.body.glutenFree = req.body.glutenFree === 'on' ? true : false
    // console.log('req.body after changing checkbox value', req.body)
	Dessert.findById(id)
    .then((dessert) => {
        if (dessert.owner == req.session.userId) {
          // res.sendStatus(204)
          return dessert.updateOne(req.body)
      } else {
          res.sendStatus(401)
      }
  })
     .then(() => {
    // console.log('returned from update promise', data)
      res.redirect(`/desserts/${id}`)
})
  // .catch(error => res.json(error))
    .catch(err => res.redirect(`/error?error=${err}`))
})

// show route
router.get('/:id', (req, res) => {
	const dessertId = req.params.id
	Dessert.findById(dessertId)
		.then(dessert => {
            const {username, loggedIn, userId} = req.session
			res.render('desserts/show', { dessert, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const dessertId = req.params.id
	Dessert.findByIdAndRemove(dessertId)
		.then(dessert => {
			res.redirect('/desserts')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
