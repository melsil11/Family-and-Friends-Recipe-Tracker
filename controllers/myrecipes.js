/////////////////////////////////////////////
// Import Dependencies
/////////////////////////////////////////////
const express = require('express')
const Myrecipes = require('../models/myrecipes')
const Maincourse = require('../models/maincourse')
const Dessert = require('../models/dessert')

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
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

// index that shows only the user's recipes
const getUserMaincoures =(user) => {
    return new Promise((res, rej) => {
		
		Maincourse.find({ owner: user }, (err, doc) => {
			if (err) rej(err)
			res(doc)
		})
	})
}
const getUserDesserts =(user) => {
    return new Promise((res, rej) => {
		
		Dessert.find({ owner: user }, (err, doc) => {
			if (err) rej(err)
			res(doc)
		})
	})
}
// const getUserMyrecipes =(user) => {
//     return new Promise((res, rej) => {
		
// 		Myrecipes.find({ owner: user }, (err, doc) => {
// 			if (err) rej(err)
// 			res(doc)
// 		})
// 	})
// }

router.get('/', (req, res) => {
    const username = req.session.username
	const loggedIn = req.session.loggedIn
	const userId = req.session.userId

	Promise.all([getUserMaincoures(userId), getUserDesserts(userId)])// so cool 
    // Promise.all([getUserMaincoures(userId), getUserDesserts(userId), getUserMyrecipes(userId)])
		.then(myRecipes => {
			console.log(myRecipes)
			res.render('myrecipes/index', {myRecipes , username, loggedIn, userId})
            // res.status(200).json({ myrecipes: myrecipes })
            // json has the recipes showing up but not with liquid
			
		})
        .catch(error => console.error)
})

/////////////////////////////////////////////
// Export the Router
/////////////////////////////////////////////
module.exports = router
