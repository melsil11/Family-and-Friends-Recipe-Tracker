const mongoose = require('./connection')
const Dessert = require('./dessert')

const db = mongoose.connection

db.on('open', () => {

    const startDesserts =[
       
        { name: 'Apple Pie', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree:false, ingredients:'2 unbaked pie shells, 3/4c. sugar, 1/4c flour, 1/4 tsp cinnamon, 6c thinly sliced apples(about 6 apples), 2 Tbsbutter, 1/4c milk', directions:'Preheat oven to 425 degrees F. Sift sugar, flour, cinnamon together and add apples. Turn into unbaked pie shell in pie plate. Dot with butter. Cover with top pie shell andflute edged. Vent the top pie shell. Brush top pie shell with milk. Place tinfoil around edged to avoid burning. Bake 20 minutes then remove tinfoil and bake an additional 20-30 minutes.' },
        { name: 'Nestle Chocolate Chip Cookies', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree: false, ingredients:'2 1/4 cups all-purpose flour, 1 teaspoon baking soda, 1 teaspoon salt, 1 cup (2 sticks) butter, softened, 3/4 cup granulated sugar, 3/4 cup packed brown sugar, 1 teaspoon vanilla extract, 2 large eggs, 2 cups (12-oz. pkg.) Nestlé Toll House Semi-Sweet Chocolate Morsels, 1 cup chopped nuts (if omitting, add 1-2 tablespoons of all-purpose flour)', directions:'1. Preheat oven to 375° F. 2. Combine flour, baking soda and salt in small bowl. Beat butter, granulated sugar, brown sugar and vanilla extract in large mixer bowl until creamy. Add eggs, one at a time, beating well after each addition. Gradually beat in flour mixture. Stir in morsels and nuts. Drop by rounded tablespoon onto ungreased baking sheets. 3. Bake for 9 to 11 minutes or until golden brown. Cool on baking sheets for 2 minutes; remove to wire racks to cool completely.' },
        { name: 'Rolo Brownies', plantBased:false, vegetarian:true, dairyFree: false, hasMeat: false, glutenFree:false, ingredient:'Family Size Brownie mix (for 9 by13 pan) eggs, oil, water (per brownie mix instructions), 12 ounce bag of Rolo candy, half unwrapped, 1 cup semi-sweet chocolate chips, 1/2 cup heavy whipping cream, 1 jar caramel sauce', directions:'Preheat the oven to 350 degrees and line the 9 by 13 baking dish with parchment paper. Follow the directions on the back of the brownie box to prepare the brownie batter then stir in 1/2 cup of semi-sweet chocolate chips. Pour half of the batter into the baking dish. Place the unwrapped Rolo candy all over the top of the brownie batter. Then pour the rest of the brownie batter over the Rolos. Bake in the preheated oven for 35-40 minutes. Allow to cool completely. To Make The Ganache , place the chocolate chips into a heat safe bowl. Using a small sauce pan, heat up the heavy whipping cream until it starts to simmer and steam.Pour heated heavy whipping cream over the chocolate chips. Allow to sit for one minute.Using a whisk, mix until smooth. Pour the Ganache over the cooled brownies. Allow the Ganache to harden for two hours in the fridge. Remove brownies from the refrigerator and lift the brownies out of the baking dish. Drizzle the caramel sauce all over the brownies.' },
        { name: 'Black Bean Brownies', plantBased:true, vegetarian:true, dairyFree: true, hasMeat: false, glutenFree:false, ingredients: '1 1/2 cups black beans (1 15-oz can, drained and rinsed very well) (250g after draining) 2 tbsp cocoa powder (10g) 1/2 cup quick oats (40g) (See nutrition link below for substitutions) 1/4 tsp salt 1/3 cup pure maple syrup, honey, or agave (75g) pinch uncut stevia OR 2 tbsp sugar (or omit and increase maple syrup to 1/2 cup) 1/4 cup coconut or vegetable oil (40g) (See nutrition link for substitution notes) 2 tsp pure vanilla extract 1/2 tsp baking powder 1/2 cup to 2/3 cup vegan chocolate chips (Not optional. Omit at your own risk) optional: more chips, for presentation ', directions:'Preheat oven to 350 F. Combine all ingredients except chips in a good food processor, and blend until completely smooth. Really blend well. (A blender can work if you absolutely must, but the texture—and even the taste—will be much better in a food processor. I use this food processor.) Stir in the chips, then pour into a greased 8 by 8 pan. Optional: sprinkle extra chocolate chips over the top. Cook the black bean brownies 15-18 minutes, then let cool at least 10 minutes before trying to cut. If they still look a bit undercooked, you can place them in the fridge overnight and they will magically firm up! Makes 9-12 brownies. The trick with these: serve them first, and then reveal the secret ingredient.' },
        // { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'', directions:'' },
        // { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'', directions:'' },
        // { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'', directions:'' },
        // { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'', directions:'' },
        // { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'', directions:'' },
        // { name: '', plantBased: false, vegetarian: false, dairyFree: true, hasMeat: true, glutenFree: true, ingredients:'', directions:'' },

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