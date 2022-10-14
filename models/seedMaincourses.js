const mongoose = require('./connection')
const Maincourse = require('./maincourses')

const db = mongoose.connection

db.on('open', () => {

    const startMaincourses =[
        { name: 'Cal De Galinga', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true },
        { name: 'Chicken Continental', plantBased:false, vegetarian:false, dairyFree: false, hasMeat: true, glutenFree:false },
        { name: 'Apple Pie', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree:false },
        { name: 'Lasagna', plantBased:false, vegetarian:false, dairyFree: false, hasMeat: true, glutenFree:false },
        { name: 'Nestle Chocolate Chip Cookies', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree: false },
        { name: 'Brownies', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree:false },
        { name: 'Teriyaki Stir Fry', plantBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree:true },
        { name: 'Sweet Potato Black Bean Chili', plantBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree: true },
        { name: 'Black Bean Brownies', plantBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree:false },
        { name: 'Vegan Cornbread', plantBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree:false },
    ]

Maincourse.deleteMany({})
    .then(deleteMaincourses => {
        console.log('testing this function')
        Maincourses.create(startMaincourses)
            .then((data) => {
                console.log('new seeded maincourses', data)
                db.close()
            })
    .catch(error => {
        console.log(error)
        db.close()
         })
    }) 
})  