////////////////////////////////////////
// Import Dependencies
////////////////////////////////////////
const express = require("express")
const Maincourse = require("../models/maincourse")

/////////////////////////////////////////
// Create Router
/////////////////////////////////////////
const router = express.Router()

/////////////////////////////////////////////
// Routes
////////////////////////////////////////////
// POST
// only loggedIn users can post comments
router.post('/:maincourseId', (req, res) => {
    const maincourseId = req.params.maincourseId

    if (req.session.loggedIn){
        req.body.author = req.session.userId
    } else {
        res.sendStatus(401)
    }

    Maincourse.findById(maincourseId)
        .then(maincourse => {
            maincourse.comments.push(req.body)
            return maincourse.save()        
        })
        .then(maincourse => {
            res.redirect(`/maincourses/${maincourse.id}`)
        })
        .catch(err => res.redirect(`/error?error=${err}`))
})

// DELETE
// only the author of the comment can delete it
router.delete('/delete/:maincourseId/:commId', (req, res) => {
    const maincourseId = req.params.maincourseId
    const commId = req.params.commId

    Maincourse.findById(maincourseId)
        .then(maincourse => {
            const theComment = maincourse.comments.id(commId)

            if (req.session.loggedIn) {
                if (theComment.author == req.session.userId) {
                    theComment.remove()
                    maincourse.save()
                    res.redirect(`/maincourses/${maincourse.id}`)    
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

//////////////////////////////////////////
// Export the Router
//////////////////////////////////////////
module.exports = router