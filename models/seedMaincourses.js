const mongoose = require('./connection')
const Maincourse = require('./maincourses')

const db = mongoose.connection

db.on('open', () => {

    const startMaincourses =[
        { name: 'Cal De Galinga', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients: 'chicken breasts, chicken thighs, onion, lemon, salt' },
        { name: 'Chicken Continental', plantBased:false, vegetarian:false, dairyFree: false, hasMeat: true, glutenFree:false, ingredients: 'chicken tenders, cream of chicken soup, flour, celery flakes, minced onion, chipped parsely, salt, pepper' },
        { name: 'Lasagna', plantBased:false, vegetarian:false, dairyFree: false, hasMeat: true, glutenFree:false, ingredients:'' },
        { name: 'Teriyaki Stir Fry', plantBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree:true },
        { name: 'Sweet Potato Black Bean Chili', plantBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree: true },
    ]

Maincourse.deleteMany({})
    .then(deleteMaincourses => {
        console.log('testing this function')
        Maincourse.create(startMaincourses)
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