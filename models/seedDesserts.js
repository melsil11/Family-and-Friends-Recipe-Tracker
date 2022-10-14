const mongoose = require('./connection')
const Dessert = require('./desserts')

const db = mongoose.connection

db.on('open', () => {

    const startDesserts =[
       
        { name: 'Apple Pie', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree:false },
        { name: 'Nestle Chocolate Chip Cookies', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree: false },
        { name: 'Brownies', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree:false },
        { name: 'Black Bean Brownies', plantBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree:false },
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