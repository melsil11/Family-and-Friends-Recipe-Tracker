const mongoose = require('./connection')
const Recipe = require('./recipe')

const db = mongoose.connection

db.on('open', () => {

    const startRecipes =[
        { name: 'Cal De Galinga', planBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true },
        { name: 'Chicken Continental', planBased:false, vegetarian:false, dairyFree: false, hasMeat: true, glutenFree:false },
        { name: 'Apple Pie', planBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree:false },
        { name: 'Lasagna', planBased:false, vegetarian:false, dairyFree: false, hasMeat: true, glutenFree:false },
        { name: 'Nestle Chocolate Chip Cookies', planBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree: false },
        { name: 'Brownies', planBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree:false },
        { name: 'VegetarianTeriyaki Stir Fry', planBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree:true },
        { name: 'Sweet Potato Black Bean Chili', planBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree: true },
        { name: 'Black Bean Brownies', planBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree:false },
        { name: 'Vegan Cornbread', planBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree:false },
    ]

Recipe.deleteMany({})
    .then(deleteRecipes => {
        console.log('testing this function')
        Recipe.create(startRecipes)
            .then((data) => {
                console.log('new seeded recipes', data)
                db.close()
            })
    .catch(error => {
        console.log(error)
        db.close()
         })
    }) 
})  