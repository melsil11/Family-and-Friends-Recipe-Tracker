// Import Dependencies
const express = require('express')
const Maincourse = require('../models/maincourse')

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
	Maincourse.find({})
		.populate("comments.author", "username")
		.then(maincourses => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.userId
			res.render('maincourses/index', { maincourses, username, loggedIn, userId })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('maincourses/new', { username, loggedIn, userId })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.plantBased = req.body.plantBased === 'on' ? true : false
	req.body.vegetarian = req.body.vegetarian === 'on' ? true : false
	req.body.dairyFree = req.body.dairyFree === 'on' ? true : false
	req.body.hasMeat = req.body.hasMeat === 'on' ? true : false
	req.body.glutenFree = req.body.glutenFree === 'on' ? true : false
	req.body.owner = req.session.userId
	console.log('the maincourse from the form', req.body)
	Maincourse.create(req.body)
		.then(maincourse => {
			console.log('this was returned from create', maincourse)
			res.redirect('/maincourses')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// index that shows only the user's maincourses
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Maincourse.find({ owner: userId })
		.then(maincourses => {
			res.render('maincourses/index', { maincourses, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const username = req.session.username
    const loggedIn = req.session.loggedIn
    const userId = req.session.userId
	const maincourseId = req.params.id
	Maincourse.findById(maincourseId)
		.then(maincourse => {
			res.render('maincourses/edit', { maincourse, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	// console.log("initial", req.body)
	const id = req.params.id
	req.body.plantBased = req.body.plantBased === 'on' ? true : false
	req.body.vegetarian = req.body.vegetarian === 'on' ? true : false
	req.body.dairyFree = req.body.dairyFree === 'on' ? true : false
	req.body.hasMeat = req.body.hasMeat === 'on' ? true : false
	req.body.glutenFree = req.body.glutenFree === 'on' ? true : false
	// console.log('after changes', req.body)
	Maincourse.findById(id)
	.then((maincourse) => {
	  if (maincourse.owner == req.session.userId) {
		return maincourse.updateOne(req.body)
	} else {
		res.sendStatus(401)
	}
})
   .then(() => {
//   console.log('returned from update promise', data)
	res.redirect(`/maincourses/${id}`)
})
// .catch(error => res.json(error))
	.catch((err) => {
	// console.log(err)
	// res.json(err)
	res.redirect(`/error?error=${err}`)
	})
})

// show route
router.get('/:id', (req, res) => {
	const maincourseId = req.params.id
	Maincourse.findById(maincourseId)
		.then(maincourse => {
            const {username, loggedIn, userId} = req.session
			res.render('maincourses/show', { maincourse, username, loggedIn, userId })
			// res.json({ maincourse: maincourse })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const maincourseId = req.params.id
	Maincourse.findByIdAndRemove(maincourseId)
		.then(maincourse => {
			res.redirect('/maincourses/mine')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
