const express = require("express")
const Dessert = require("../models/dessert")

const router = express.Router()

// Post
router.post('/:dessertId', (req, res) => {
    const dessertId = req.params.dessertId

    if (req.session.loggedIn){
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }
    // console.log('did I make it')
    Dessert.findById(dessertId)
    .then(dessert => {
        dessert.comments.push(req.body)
        return dessert.save()
        
    })
    .then(dessert => {
        res.redirect(`/desserts/${dessert.id}`)
    })
    .catch(err => res.redirect(`/error?error=${err}`))
})

// Delete

router.delete('/delete/:dessertId/:commId', (req, res) => {
    const dessertId = req.params.dessertId
    const commId = req.params.commId

    Dessert.findById(dessertId)
        .then(dessert => {
            const theComment = dessert.comments.id(commId)

            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    dessert.save()
                    res.redirect(`/desserts/${dessert.id}`)    
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