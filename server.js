////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const path = require("path") 
const MaincourseRouter = require('./controllers/maincourse')
const DessertRouter = require('./controllers/dessert')
const UserRouter = require('./controllers/user')
const User = require("./models/user")
const MaincourseCommentRouter = require('./controllers/commentControllerMaincourse.js')
const DessertCommentRouter = require('./controllers/commentControllerDessert.js')
const MyrecipesRouter = require('./controllers/myrecipes')
const middleware = require('./utils/middleware')

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())
middleware(app)

////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/maincourses', MaincourseRouter)
app.use('/desserts', DessertRouter)
app.use('/users', UserRouter)
app.use('/comments', MaincourseCommentRouter)
app.use('/commentDesserts', DessertCommentRouter)
app.use('/myrecipes', MyrecipesRouter)

app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})

app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})



//////////////////////////////
//      App Listener        //
//////////////////////////////
const PORT = process.env.PORT
app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`)
})