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
const CommentRouter = require('./controllers/commentControllerDessert.js')
const DessertCommentRouter = require('./controllers/commentController.js')
const middleware = require('./utils/middleware')
// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js

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
app.use('/comments', CommentRouter)
app.use('/comments', DessertCommentRouter)

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