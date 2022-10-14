const mongoose = require('./connection')
const Dessert = require('./dessert')

const db = mongoose.connection

db.on('open', () => {

    const startDesserts =[
       
        { name: 'Apple Pie', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree:false, ingredient:'' },
        { name: 'Nestle Chocolate Chip Cookies', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree: false, ingredients:'' },
        { name: 'Brownies', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree:false, ingredient:'' },
        { name: 'Black Bean Brownies', plantBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree:false, ingredients: '' },
        { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'' },
        { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'' },
        { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'' },
        { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'' },
        { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'' },
        { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'' },

    ]

Dessert.deleteMany({})
    .then(deleteDesserts => {
        console.log('testing this function')
        Dessert.create(startDesserts)
            .then((data) => {
                console.log('new seeded desserts', data)
                db.close()
            })
    .catch(error => {
        console.log(error)
        db.close()
         })
    }) 
}) 