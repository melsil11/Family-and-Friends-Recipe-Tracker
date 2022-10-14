const mongoose = require('./connection')
const Maincourse = require('./maincourse')

const db = mongoose.connection

db.on('open', () => {

    const startMaincourses =[
        { name: 'Cal De Galinga', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients: '2 bone in - with skin chicken breasts, 8 bone in - with skin chicken thighs, 1 whole peeled onion, lemon to taste, salt to taste' },
        { name: 'Chicken Continental', plantBased:false, vegetarian:false, dairyFree: false, hasMeat: true, glutenFree:false, ingredients: '6 chicken tenders, 5 cans of cream of chicken soup, 4c. rice, 1/4c. flour, 1 TBSP celery flakes, 3 TBSP minced onion, 3 TBSP chopped parsely, 1 tsp salt, 1 tsp pepper' },
        { name: 'Lasagna', plantBased:false, vegetarian:false, dairyFree: false, hasMeat: true, glutenFree:false, ingredients:'1 box barrilla no bake Lasagna noodles, 2 jars marninara, 1lb. ground meat, 4c. shredded mozzarella cheese, 1c. grated parmesan cheese, 1 egg, 1 TBSP chopped parsley, 15oz ricotta cheese' },
        { name: 'Teriyaki Stir Fry', plantBased:false, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree:true, ingredients:' 1 bag of frozen mixed vegetables of choice, stirfry sauce to taste, 3c. cooked rice of choice' },
        { name: 'Sweet Potato Black Bean Chili', plantBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree: true, ingredients:'1-2 tablespoons olive oil, 1 medium onion diced small, 2 garlic cloves minced, 1 large sweet potato, peeled and diced, 2 tablespoons mild chili powder, 2 teaspoons cumin, 2 teaspoons smoked paprika, 1 teaspoon salt, 28 ounces diced tomatoes, with their juices, OR fire roasted tomatoes, (2) 15-ounce cans black beans, drained and rinsed, 2 cups water'},
        { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'' },
        { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'' },
        { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'' },
        { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'' },
        { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'' },
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