const express = require("express")
const Recipe = require("../models/recipe")

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
        recipe.ingredients.push(req.body)
        return recipe.save()
        
    })
    .then(recipe => {
        res.redirect(`/recipes/${recipe.id}`)
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})

// Delete

router.delete('/delete/:recipeId/:ingredientId', (req, res) => {
    const recipeId = req.params.recipeId
    const ingredientId = req.params.ingredientId

    Recipe.findById(recipeId)
        .then(recipe => {
            const theIngredient = recipe.ingredients.id(ingredientId)

            if (req.session.loggedIn) {
                if (theIngredient.author == req.session.userId) {
                    theIngredient.remove()
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