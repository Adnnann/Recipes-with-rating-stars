const mongoose = require('mongoose')
const Recipes = require('./src/models/recipe.model')
const Users = require('./src/models/user.model')
const config = require('./src/config/config')
const _ = require('lodash') 

const Categories = [
    "Breakfast",
    "Lunch",
    "Beverages",
    "Appetizers",
    "Soups",
    "Salads",
    "Main dishes: Meat",
    "Main dishes: Seafood",
    "Main dishes: Vegetarian",
    "Side dishes: Vegetables",
    "Side dishes: Other",
    "Desserts",
    "Canning / Freezing",
    "Breads",
    "Holidays",
    "Entertaining"
]

const recipes = []
let usersId = []
const numOfRaters = []
const titles = [
    'Cornbread Pancakes with Fresh Strawberry Syrup', 
    'Homemade Banana Pudding with Whipped Cream Topping',
    'Bohemian Orange Chicken',
    'Slow Cooker BBQ Chicken Drumsticks',
    'Oven-Baked Chicken and Vegetables in Foil',
    'Chicken and Cauliflower Stir-Fry',
    'Malooba',
    'Cheesy Chicken Casserole with Vegetables',
    'Sheet Pan Harissa Chicken Dinner',
    'Chicken Livers with Red Wine and Bacon'

]

for(let i =0;i<10;i++){
    numOfRaters.push(Math.floor(Math.random()*10))
}
    
const users = [
    {
        name:'user1',
        email:'john.doe@test.com',
        password:'12345678'
    },
    {
        name:'user2',
        email:'hugo_tutto_cammara@test.com',
        password:'12345678'
    },
    {
        name:'user3',
        email:'harry.lattam@test.com',
        password:'12345678'
    }
]

mongoose
.connect(config.mongoUri, {useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB successfully connected...'))
.catch((e) => console.log(e))


const createUsers = async() => {
   
    await Users.insertMany(users)
    const test = await Users.find({})
    usersId = _.map(test, '_id') 
    let today = new Date()

    for(let i = 0; i<10;i++){
        recipes.push({
            createdBy:usersId[Math.floor(Math.random() * users.length)],
            title:titles[i], 
            image:`/images/image${i+1}.jpg`,
            description:'Sed gravida velit vitae condimentum posuere. Donec libero mauris, tempor ac luctus ut, placerat nec urna. Nunc quis eleifend nibh. Donec pulvinar tellus ut mi tincidunt, eu interdum metus malesuada. Proin sit amet diam non ligula consequat sollicitudin. Maecenas sit amet dictum est. Curabitur et sapien sit amet libero mattis facilisis ut a nisi. Curabitur tempus iaculis tortor, et dignissim ex accumsan at. Quisque a posuere ipsum. Suspendisse molestie finibus ex, aliquam elementum quam fringilla vel. Cras ac sagittis sapien, non lobortis nisl. In purus justo, sollicitudin sed pharetra sed, tempus sit amet sapien. Praesent non lorem id dolor malesuada sagittis ut in diam. In non nulla a metus volutpat vestibulum a at massa. Donec euismod eleifend lacinia.',
            category:Categories[1], 
            instructions: 'Sed gravida velit vitae condimentum posuere. Donec libero mauris, tempor ac luctus ut, placerat nec urna. Nunc quis eleifend nibh. Donec pulvinar tellus ut mi tincidunt, eu interdum metus malesuada. Proin sit amet diam non ligula consequat sollicitudin. Maecenas sit amet dictum est. Curabitur et sapien sit amet libero mattis facilisis ut a nisi. Curabitur tempus iaculis tortor, et dignissim ex accumsan at. Quisque a posuere ipsum. Suspendisse molestie finibus ex, aliquam elementum quam fringilla vel. Cras ac sagittis sapien, non lobortis nisl. In purus justo, sollicitudin sed pharetra sed, tempus sit amet sapien. Praesent non lorem id dolor malesuada sagittis ut in diam. In non nulla a metus volutpat vestibulum a at massa. Donec euismod eleifend lacinia.',
            ingredients: ['ingredient1', 'ingredient2','ingredient3'],  
            status:'active',
            created: today.setHours(today.getHours()+i)
        })

    }
    await Recipes.insertMany(recipes)
    
}

createUsers()
.then(()=>{
    mongoose.connection.close()
})
.catch((err) => console.log(err))

