const express = require("express")
const Recipe = require("../models/maincourse")

const router = express.Router()

// Post
router.post('/:recipeId', (req, res) => {
    const recipeId = req.params.recipeId

    if (req.session.loggedIn){
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // console.log('did I make it')
    Recipe.findById(recipeId)
    .then(recipe => {
        recipe.comments.push(req.body)
        return recipe.save()
        
    })
    .then(recipe => {
        res.redirect(`/recipes/${recipe.id}`)
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})

// Delete

router.delete('/delete/:recipeId/:commId', (req, res) => {
    const recipeid = req.params.recipeId
    const commId = req.params.commId

    Recipe.findById(recipeId)
        .then(recipe => {
            const theComment = recipe.comments.id(commId)

            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    recipe.save()
                    res.redirect(`/recipes/${recipe.id}`)    
                } else {
                const err = 'you%20are%20not%20authorized%20for%20this%20action'
                res.redirect(`/error?error=${err}`)
                }
            } else {
            const err = 'you%20are%20not%20authorized%20for%20this%20action'
            res.redirect(`/error?error=${err}`)
            }
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

module.exports = router