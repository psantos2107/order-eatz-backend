const mongoose = require('mongoose');

// Require the models from your index.js file
const { FoodDrink, Order, Review, User } = require("./index");

// Sample food and drink data
const foodData = [
  {
    "name": "Spicy Chicken Wrap",
    "price": 8.99,
    "category": "Wraps",
    "allergens": ["Gluten", "Soy"],
    "description": "Tender chicken strips tossed in a fiery sauce, wrapped with crisp lettuce, diced tomatoes, and shredded cheese in a soft tortilla.",
    "image": "https://tastesbetterfromscratch.com/wp-content/uploads/2020/03/Buffalo-Chicken-Wrap-3.jpg"
  },
  {
    "name": "Veggie Delight Pizza",
    "price": 11.99,
    "category": "Pizzas",
    "allergens": ["Gluten", "Dairy"],
    "description": "A medley of fresh bell peppers, onions, mushrooms, and olives on a classic tomato base, topped with mozzarella cheese.",
    "image": "https://stonehotpizza.com/wp-content/uploads/2019/08/Veggie-Delight-Pizza-HD.jpg"
  },
  {
    "name": "Caesar Salad",
    "price": 7.99,
    "category": "Salads",
    "allergens": ["Dairy", "Fish", "Gluten"],
    "description": "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing, topped with a sprinkle of freshly ground pepper.",
    "image": "https://natashaskitchen.com/wp-content/uploads/2019/01/Caesar-Salad-Recipe-3.jpg"
  },
  {
    "name": "BBQ Ribs",
    "price": 15.99,
    "category": "Main Courses",
    "allergens": [],
    "description": "Slow-cooked ribs smothered in our signature BBQ sauce, served with coleslaw and garlic mashed potatoes.",
    "image": "https://www.jocooks.com/wp-content/uploads/2019/06/instant-pot-bbq-pork-ribs-1-16.jpg"
  },
  {
    "name": "Grilled Salmon",
    "price": 14.99,
    "category": "Seafood",
    "allergens": ["Fish"],
    "description": "Freshly grilled salmon fillet with a lemon butter glaze, served with steamed vegetables and rice pilaf.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7CgD41cadTPvsgL8hN1He6eATYHefxFbxyyONZIZzGA&s"
  },
  {
    "name": "Mushroom Risotto",
    "price": 12.99,
    "category": "Pasta & Risottos",
    "allergens": ["Dairy", "Gluten"],
    "description": "Creamy Arborio rice cooked with a variety of mushrooms, white wine, and a touch of garlic, finished with Parmesan cheese.",
    "image": "https://www.recipetineats.com/wp-content/uploads/2019/10/Mushroom-Risotto_7.jpg"
  },
  {
    "name": "Classic Margherita Pizza",
    "price": 10.99,
    "category": "Pizzas",
    "allergens": ["Gluten", "Dairy"],
    "description": "A simple yet delicious pizza with fresh basil, mozzarella cheese, and our classic tomato sauce.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1nUREA0VVAVbxg3mg47PADztNt1Vj_Vyjg2wMdvND7A&s"
  },
  {
    "name": "Thai Green Curry",
    "price": 13.99,
    "category": "Curries",
    "allergens": ["Peanuts"],
    "description": "Aromatic green curry with coconut milk, bamboo shoots, bell peppers, and your choice of chicken or tofu, served with jasmine rice.",
    "image": "https://hot-thai-kitchen.com/wp-content/uploads/2022/04/green-curry-new-sq-3.jpg"
  },
  {
    "name": "Beef Tacos",
    "price": 9.99,
    "category": "Tacos",
    "allergens": ["Gluten"],
    "description": "Three soft shell tacos filled with seasoned ground beef, lettuce, shredded cheese, and fresh pico de gallo.",
    "image": "https://www.onceuponachef.com/images/2023/08/Beef-Tacos.jpg"
  },
  {
    "name": "Shrimp Alfredo Pasta",
    "price": 13.99,
    "category": "Pasta & Risottos",
    "allergens": ["Dairy", "Gluten", "Shellfish"],
    "description": "Fettuccine pasta tossed in a rich Alfredo sauce with sautéed shrimp, garnished with parsley.",
    "image": "https://www.budgetbytes.com/wp-content/uploads/2022/01/Shrimp-Alfredo-Pasta-bowl2.jpg"
  },
  {
    "name": "Pan-Seared Duck Breast",
    "price": 21.99,
    "category": "Main Courses",
    "allergens": [],
    "description": "Juicy duck breast with a crispy skin, served with a cherry sauce, roasted vegetables, and mashed sweet potatoes.",
    "image": "https://www.wellseasonedstudio.com/wp-content/uploads/2020/11/Seared-duck-breast-with-duck-fat-potatoes-on-a-plate.jpg"
  },
  {
    "name": "Quinoa Salad",
    "price": 8.99,
    "category": "Salads",
    "allergens": [],
    "description": "A refreshing mix of quinoa, cucumbers, cherry tomatoes, red onions, and feta cheese, dressed with a lemon vinaigrette.",
    "image": "https://www.inspiredtaste.net/wp-content/uploads/2019/01/Easy-Quinoa-Salad-Recipe-2-1200.jpg"
  },
  {
    "name": "Eggplant Parmesan",
    "price": 14.99,
    "category": "Vegetarian",
    "allergens": ["Gluten", "Dairy"],
    "description": "Sliced eggplant, breaded and fried, layered with marinara sauce and mozzarella, then baked to perfection.",
    "image": "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2Farchive%2F6c25e910371366a129a5716f2fb0768d4d697a91"
  },
  {
    "name": "Lamb Gyro",
    "price": 9.99,
    "category": "Wraps",
    "allergens": ["Gluten"],
    "description": "Slices of seasoned lamb with tomatoes, onions, and tzatziki sauce, wrapped in a soft pita bread.",
    "image": "https://tastesbetterfromscratch.com/wp-content/uploads/2023/07/Gyros-1.jpg"
  },
  {
    "name": "Coconut Shrimp",
    "price": 11.99,
    "category": "Appetizers",
    "allergens": ["Shellfish", "Gluten"],
    "description": "Crispy coconut-breaded shrimp served with a sweet chili dipping sauce.",
    "image": "https://cafedelites.com/wp-content/uploads/2019/12/Coconut-Shrimp-2.jpg"
  },
  {
    "name": "Pork Belly Bao",
    "price": 10.99,
    "category": "Appetizers",
    "allergens": ["Gluten", "Soy"],
    "description": "Steamed buns filled with succulent pork belly, pickled vegetables, and hoisin sauce.",
    "image": "https://www.kitchensanctuary.com/wp-content/uploads/2019/07/Gua-Bao-Buns-Pork-Belly-square-FS-7271.jpg"
  },
  {
    "name": "Seared Tuna Salad",
    "price": 13.99,
    "category": "Salads",
    "allergens": ["Fish", "Soy"],
    "description": "Freshly seared tuna atop a bed of mixed greens, avocado, mango, and a wasabi vinaigrette.",
    "image": "https://domesticate-me.com/wp-content/uploads/2013/06/ahi-tuna-salad-with-citrus-ginger-dressing.jpg"
  },
  {
    "name": "Butternut Squash Soup",
    "price": 7.99,
    "category": "Soups",
    "allergens": ["Dairy"],
    "description": "Creamy butternut squash soup seasoned with nutmeg and cinnamon, served with a dollop of crème fraîche.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNvkTkaYFhWzbiogzcHObT1Grk5cNFS4wBEmQDOg0v9Q&s"
  },
  {
    "name": "Chicken Marsala",
    "price": 15.99,
    "category": "Main Courses",
    "allergens": ["Gluten", "Dairy"],
    "description": "Pan-seared chicken breast in a rich Marsala wine sauce with mushrooms, served with garlic mashed potatoes.",
    "image": "https://example.com/chicken_marsala.jpg"
  },
  {
    "name": "Vegetable Stir Fry",
    "price": 12.99,
    "category": "Vegetarian",
    "allergens": ["Soy"],
    "description": "A vibrant mix of stir-fried vegetables in a tangy soy sauce, served over steamed rice or noodles.",
    "image": "https://therecipecritic.com/wp-content/uploads/2019/08/vegetable_stir_fry.jpg"
  },
  {
    "name": "Fish and Chips",
    "price": 13.99,
    "category": "Seafood",
    "allergens": ["Fish", "Gluten"],
    "description": "Beer-battered cod served with crispy fries, tartar sauce, and malt vinegar.",
    "image": "https://www.thespruceeats.com/thmb/sdVTq0h7xZvJjPr6bE2fhh5M3NI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/SES-best-fish-and-chips-recipe-434856-hero-01-27d8b57008414972822b866609d0af9b.jpg"
  },
  {
    "name": "Spinach and Ricotta Ravioli",
    "price": 14.99,
    "category": "Pasta & Risottos",
    "allergens": ["Gluten", "Dairy"],
    "description": "Homemade ravioli filled with spinach and ricotta, served in a sage butter sauce.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoEYKwdZNkVrfonZ5AsMUJNcXC_sntDI0fUxCWDsscVA&s"
  },
  {
    "name": "Greek Salad",
    "price": 8.99,
    "category": "Salads",
    "allergens": ["Dairy"],
    "description": "Classic Greek salad with tomatoes, cucumbers, red onions, olives, and feta cheese, dressed with olive oil and oregano.",
    "image": "https://i2.wp.com/www.downshiftology.com/wp-content/uploads/2018/08/Greek-Salad-6-1.jpg"
  },
  {
    "name": "Beef Bourguignon",
    "price": 18.99,
    "category": "Main Courses",
    "allergens": ["Gluten"],
    "description": "Tender beef slow-cooked in a rich red wine sauce with mushrooms, onions, and carrots, served over mashed potatoes.",
    "image": "https://www.jocooks.com/wp-content/uploads/2018/11/beef-bourguignon-1-25.jpg"
  },
  {
    "name": "Avocado Toast",
    "price": 6.99,
    "category": "Breakfast",
    "allergens": ["Gluten"],
    "description": "Crisp toast topped with smashed avocado, cherry tomatoes, radishes, and a sprinkle of sesame seeds.",
    "image": "https://www.eatingbirdfood.com/wp-content/uploads/2023/12/avocado-toast-hero-cropped.jpg"
  },
  {
    "name": "Chicken Quesadilla",
    "price": 9.99,
    "category": "Appetizers",
    "allergens": ["Gluten", "Dairy"],
    "description": "Grilled chicken, melted cheese, and sautéed onions and peppers in a toasted flour tortilla, served with salsa and sour cream.",
    "image": "https://www.isabeleats.com/wp-content/uploads/2023/09/buffalo-chicken-quesadillas-small-6.jpg"
  },
  {
    "name": "French Onion Soup",
    "price": 7.99,
    "category": "Soups",
    "allergens": ["Gluten", "Dairy"],
    "description": "Caramelized onion soup topped with a toasted baguette slice and melted Gruyère cheese.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEECtg7Oj-Sl04gIuCGpoANMXAYvn1lKpGEmqiW0eSyA&s"
  },
  {
    "name": "Steak Frites",
    "price": 19.99,
    "category": "Main Courses",
    "allergens": [],
    "description": "Grilled steak served with herb butter and a side of crispy fries.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHLLmuR5Pgsekke7Tnj8njPQgOb4uJuCY-H0BdUAvQKw&s"
  },
  {
    "name": "Caprese Salad",
    "price": 8.99,
    "category": "Salads",
    "allergens": ["Dairy"],
    "description": "Sliced tomatoes, fresh mozzarella, basil, and a drizzle of balsamic glaze.",
    "image": "https://natashaskitchen.com/wp-content/uploads/2019/08/Caprese-Salad-6.jpg"
  },
  {
    "name": "Baked Ziti",
    "price": 12.99,
    "category": "Pasta & Risottos",
    "allergens": ["Gluten", "Dairy"],
    "description": "Ziti pasta baked with marinara sauce, ricotta, and mozzarella cheese.",
    "image": "https://www.allrecipes.com/thmb/uJocCYfLL1gMCsbj79tY7hKilWw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/4557541-21604073f2774e89b532193821d6cd9c.jpg"
  },
   {
    "name": "Lobster Bisque",
    "price": 9.99,
    "category": "Soups",
    "allergens": ["Shellfish", "Dairy"],
    "description": "A rich and creamy lobster soup, seasoned with a touch of sherry.",
    "image": "https://cafedelites.com/wp-content/uploads/2020/02/Lobster-Bisque-IMAGE-2.jpg"
  },
  {
    "name": "Mediterranean Chicken",
    "price": 14.99,
    "category": "Main Courses",
    "allergens": [],
    "description": "Grilled chicken breast marinated in Mediterranean herbs, served with a quinoa salad and tzatziki.",
    "image": "https://www.saltandlavender.com/wp-content/uploads/2023/08/mediterranean-chicken-recipe-1.jpg"
  },
  {
    "name": "Roasted Beet Salad",
    "price": 9.99,
    "category": "Salads",
    "allergens": ["Dairy"],
    "description": "Roasted beets, arugula, goat cheese, walnuts, and a balsamic reduction.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS96hVAGVytvhJFeRakhaFQVzXXlyGsmxxWCMl-l78-Ig&s"
  },
  {
    "name": "Carbonara Pasta",
    "price": 13.99,
    "category": "Pasta & Risottos",
    "allergens": ["Gluten", "Dairy", "Eggs"],
    "description": "Spaghetti tossed with crispy pancetta, eggs, and Parmesan, creating a creamy sauce without cream.",
    "image": "https://www.cookingclassy.com/wp-content/uploads/2020/10/spaghetti-carbonara-01.jpg"
  },
  {
    "name": "Buffalo Wings",
    "price": 10.99,
    "category": "Appetizers",
    "allergens": [],
    "description": "Crispy chicken wings tossed in Buffalo sauce, served with celery sticks and blue cheese dressing.",
    "image": "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FRecipes%2F2024-01-buffalo-wings%2Fbuffalo-wings-351"
  },
  {
    "name": "Sushi Platter",
    "price": 22.99,
    "category": "Sushi",
    "allergens": ["Fish", "Soy"],
    "description": "An assortment of fresh nigiri, sashimi, and maki rolls, served with soy sauce, wasabi, and pickled ginger.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSfokdtZAw4QjKGglSzre7zK3CUQwAh_VCOhiLtCRVbg&s"
  },
  {
    "name": "Ratatouille",
    "price": 12.99,
    "category": "Vegetarian",
    "allergens": [],
    "description": "A traditional French stew of summer vegetables including zucchini, eggplant, peppers, and tomatoes.",
    "image": "https://media.chefdehome.com/740/0/0/ratatouille/ratatouille-casserole.jpg"
  },
  {
    "name": "Korean BBQ Ribs",
    "price": 17.99,
    "category": "Main Courses",
    "allergens": ["Soy", "Gluten"],
    "description": "Tender ribs marinated in a sweet and savory Korean BBQ sauce, grilled to perfection.",
    "image": "https://food.fnr.sndimg.com/content/dam/images/food/fullset/2008/8/14/0/GT0107_kalbi_s4x3.jpg.rend.hgtvcom.616.462.suffix/1519669666497.jpeg"
  },
  {
    "name": "Pumpkin Soup",
    "price": 7.99,
    "category": "Soups",
    "allergens": ["Dairy"],
    "description": "Creamy pumpkin soup spiced with nutmeg and cinnamon, topped with roasted pumpkin seeds.",
    "image": "https://www.cookingclassy.com/wp-content/uploads/2022/10/pumpkin-soup-5.jpg"
  },
  {
    "name": "Falafel Wrap",
    "price": 8.99,
    "category": "Wraps",
    "allergens": ["Gluten"],
    "description": "Crispy falafel balls wrapped with lettuce, tomatoes, cucumbers, and tahini sauce in a soft tortilla.",
    "image": "https://fooddoodz.tv/assets/images/2020-05-19-Falafel-Wraps/2020-05-19-Falafel-Wraps--Hero-Image-900.jpg"
  },
 {
    "name": "Clam Chowder",
    "price": 9.99,
    "category": "Soups",
    "allergens": ["Shellfish", "Dairy"],
    "description": "Creamy New England clam chowder with potatoes, celery, onions, and clams.",
    "image": "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/k%2FPhoto%2FRecipes%2F2020-09-How-to-Make-Easy-New-England-Clam-Chowder%2FHT-Easy-New-England-Clam-Chowder812"
  },
  {
    "name": "Miso Glazed Cod",
    "price": 16.99,
    "category": "Seafood",
    "allergens": ["Fish", "Soy"],
    "description": "Oven-roasted cod with a sweet and savory miso glaze, served with steamed rice and bok choy.",
    "image": "https://www.justonecookbook.com/wp-content/uploads/2021/02/Miso-Cod-Black-Cod-with-Miso-2-I.jpg"
  },
  {
    "name": "Tomato Bruschetta",
    "price": 6.99,
    "category": "Appetizers",
    "allergens": ["Gluten"],
    "description": "Toasted baguette slices topped with a mixture of diced tomatoes, garlic, basil, and olive oil.",
    "image": "https://joyfoodsunshine.com/wp-content/uploads/2022/04/tomato-bruschetta-recipe-1.jpg"
  },
  {
    "name": "Peking Duck",
    "price": 23.99,
    "category": "Main Courses",
    "allergens": ["Gluten", "Soy"],
    "description": "Crispy roasted duck served with pancakes, scallions, cucumber, and hoisin sauce.",
    "image": "https://redhousespice.com/wp-content/uploads/2022/01/sliced-peking-duck-with-pancakes-scaled.jpg"
  },
  {
    "name": "Tiramisu",
    "price": 6.99,
    "category": "Desserts",
    "allergens": ["Gluten", "Dairy", "Eggs"],
    "description": "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese, dusted with cocoa powder.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzE7arBo-OCZ-gRJL6AuPj65Gky_2esQH6J6OfQcffhw&s"
  },
  {
    "name": "Cheese Platter",
    "price": 14.99,
    "category": "Appetizers",
    "allergens": ["Dairy"],
    "description": "A selection of fine cheeses served with crackers, nuts, and fruit preserves.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjUxhr-0WBdZHLVcl7bOQjDfdH8FrNee9kjKlDG4YynA&s"
  },
  {
    "name": "Pad Thai",
    "price": 12.99,
    "category": "Noodles",
    "allergens": ["Peanuts", "Gluten", "Shellfish"],
    "description": "Stir-fried rice noodles with shrimp, peanuts, egg, bean sprouts, and a tangy tamarind sauce.",
    "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWC37wND8hC_HSq-umczp5euW9FIHVz3PYz4bHfdCw6Q&s"
  },
  {
    "name": "Chocolate Lava Cake",
    "price": 7.99,
    "category": "Desserts",
    "allergens": ["Gluten", "Dairy", "Eggs"],
    "description": "Warm chocolate cake with a gooey center, served with vanilla ice cream.",
    "image": "https://preppykitchen.com/wp-content/uploads/2022/03/Chocolate-Lava-Cake-Recipe.jpg"
  },
  {
    "name": "Vegetarian Lasagna",
    "price": 13.99,
    "category": "Vegetarian",
    "allergens": ["Gluten", "Dairy"],
    "description": "Layers of pasta, ricotta, spinach, and marinara sauce, baked with a mozzarella cheese topping.",
    "image": "https://cdn.loveandlemons.com/wp-content/uploads/2023/12/vegetarian-lasagna-scaled.jpg"
  },
  {
    "name": "Crab Cakes",
    "price": 15.99,
    "category": "Seafood",
    "allergens": ["Shellfish", "Gluten"],
    "description": "Pan-fried crab cakes served with a remoulade sauce and a lemon wedge.",
    "image": "https://hips.hearstapps.com/hmg-prod/images/crab-cakes-index-64e7cee7d4dda.jpg?crop=0.8891500963202403xw:1xh;center,top&resize=1200:*"
  },
 {
  "name": "Mango Sticky Rice",
  "price": 6.99,
  "category": "Desserts",
  "allergens": [],
  "description": "Sweet sticky rice topped with fresh mango slices and a drizzle of coconut cream.",
  "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQGABu6d57Q6OeokuGLEaJjQPoq9oFbaTMFMLK9bA7qg&s"
}
];

const drinkData = [
  {
    name: "Mango Mojito",
    price: 8.99,
    category: "Cocktails",
    description: "A tropical twist on the classic mojito, made with mango puree, rum, mint leaves, lime juice, and soda water.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAOt6TnjOTxowSXiGz6vKhRHKmhauD-k_cq2L45svf1Q&s"
  },
  {
    name: "Cosmopolitan",
    price: 9.99,
    category: "Cocktails",
    description: "Iconic cocktail made with vodka, triple sec, cranberry juice, and freshly squeezed lime juice.",
    image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_4:3/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2022-09-Cosmopolitan-Cocktail%2FCosmopolitan_Cocktail"
  },
  {
    name: "Whiskey Smash",
    price: 10.99,
    category: "Cocktails",
    description: "Refreshing cocktail with whiskey, muddled mint leaves, lemon juice, simple syrup, and a splash of soda water.",
    image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipe%20Ramp%20Up%2F2022-04-Whiskey-Smash%2FWhiskey_Smash-4"
  },
  {
    name: "Pineapple Express",
    price: 9.99,
    category: "Cocktails",
    description: "Tropical cocktail featuring pineapple juice, coconut rum, orange liqueur, and a splash of grenadine.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTegYM7HtERp41bJ_D7QJGthks3XfyxndEIdZV9qKES-Q&s"
  },
  {
    name: "Espresso Martini",
    price: 11.99,
    category: "Cocktails",
    description: "Indulgent cocktail made with vodka, coffee liqueur, freshly brewed espresso, and a touch of simple syrup.",
    image: "https://cdn.apartmenttherapy.info/image/upload/f_jpg,q_auto:eco,c_fill,g_auto,w_1500,ar_1:1/k%2FPhoto%2FRecipes%2F2021-10-espresso-martini%2F2021-10-12_ATK8093"
  },
  {
    name: "Raspberry Collins",
    price: 9.99,
    category: "Cocktails",
    description: "Tart and fruity cocktail made with gin, raspberry syrup, lemon juice, and soda water.",
    image: "https://www.liquor.com/thmb/fMQ_vvDFDRUHB5JLIsxusFgHrW8=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/raspberry-collins-720x720-primary-67a4a8c849c6453cb48479eb4a9ed931.jpg"
  },
  {
    name: "Margarita",
    price: 8.99,
    category: "Cocktails",
    description: "Classic cocktail made with tequila, triple sec, lime juice, and a salted rim.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTMyRz-N91vFAtpmNa_QQeQpRcrEUq2GYo6aP4bs_Bb3g&s"
  },
  {
    name: "Mai Tai",
    price: 10.99,
    category: "Cocktails",
    description: "Tropical cocktail with rum, lime juice, orgeat syrup, and orange liqueur, garnished with a cherry and pineapple wedge.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSDxSAj0GNQmGy3iZum0KHMT--SQCIdxIKgZtD_xWF5ag&s"
  },
  {
    name: "Gin Fizz",
    price: 9.99,
    category: "Cocktails",
    description: "Classic cocktail made with gin, lemon juice, simple syrup, and soda water, topped with a frothy egg white foam.",
    image: "https://www.acouplecooks.com/wp-content/uploads/2019/06/Gin-Fizz-112s.jpg"
  },
  {
    name: "Peach Bellini",
    price: 11.99,
    category: "Cocktails",
    description: "Elegant cocktail made with Prosecco and peach purée, perfect for brunch or celebrations.",
    image: "https://foodwithfeeling.com/wp-content/uploads/2020/04/bellini-7.jpg"
  },
  {
    name: "Fresh Orange Juice",
    price: 3.99,
    category: "Drinks",
    description: "Freshly squeezed orange juice, served chilled.",
    image: "https://www.alphafoodie.com/wp-content/uploads/2020/11/Orange-Juice-1-of-1-500x500.jpeg"
  },
  {
    name: "Iced Americano",
    price: 4.99,
    category: "Drinks",
    description: "Strong espresso shots poured over ice, topped with water.",
    image: "https://images.ctfassets.net/v601h1fyjgba/1vlXSpBbgUo9yLzh71tnOT/a1afdbe54a383d064576b5e628035f04/Iced_Americano.jpg"
  },
  {
    name: "Lemonade",
    price: 3.99,
    category: "Drinks",
    description: "Refreshing blend of freshly squeezed lemon juice, water, and simple syrup.",
    image: "https://feelgoodfoodie.net/wp-content/uploads/2020/08/Homemade-Lemonade-7.jpg"
  },
  {
    name: "Iced Tea",
    price: 3.99,
    category: "Drinks",
    description: "Cold-brewed tea served over ice, with optional lemon slices and sweetener.",
    image: "https://natashaskitchen.com/wp-content/uploads/2021/07/Iced-Tea-3-1-728x1092.jpg"
  },
  {
    name: "Sparkling Water",
    price: 2.99,
    category: "Drinks",
    description: "Crisp and bubbly carbonated water, served chilled.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjk1-K-I3aTx4JAwObrUPd-hUu-WHr_jv8v1R1XfVT7g&s"
  },
  {
    name: "Mint Lemonade",
    price: 4.99,
    category: "Drinks",
    description: "Refreshing lemonade infused with fresh mint leaves, served over ice.",
    image: "https://thetravelbite.com/wp-content/uploads/2021/06/Mint-Lemonade-TheTravelBite.com-16-scaled.jpg"
  },
  {
    name: "Cranberry Juice",
    price: 3.99,
    category: "Drinks",
    description: "Tart and tangy juice made from cranberries, served cold.",
    image: "https://post.medicalnewstoday.com/wp-content/uploads/sites/3/2020/02/322731_1100-800x825.jpg"
  },
  {
    name: "Iced Matcha Latte",
    price: 5.99,
    category: "Drinks",
    description: "Creamy matcha green tea mixed with milk and poured over ice.",
    image: "https://gimmedelicious.com/wp-content/uploads/2018/03/Iced-Matcha-Latte2.jpg"
  },
  {
    name: "Ginger Ale",
    price: 3.99,
    category: "Drinks",
    description: "Spicy and effervescent soda made with real ginger extract.",
    image: "https://www.simplyrecipes.com/thmb/q5LEIII9iHuGoq3zPjdT_IXpQkI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Simply-Recipes-Ginger-Ale-LEAD-4-d7bb96ceb994481ab4072f76c0cc1291.jpg"
  },
  {
    name: "Lemon Iced Tea",
    price: 4.99,
    category: "Drinks",
    description: "Refreshing iced tea infused with lemon flavor, served with lemon slices and sweetener on the side.",
    image: "https://www.ohhowcivilized.com/wp-content/uploads/lemon-iced-tea-recipe.jpg"
  }
];


// Function to seed the database
async function seedDatabase() {
  try {
    // Clear existing data
    await FoodDrink.deleteMany({});

    // Insert food data
    await FoodDrink.insertMany(foodData);

    // Insert drink data
    await FoodDrink.insertMany(drinkData);

    console.log('Database seeded successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    // Close the connection
    mongoose.connection.close();
  }
}

// Seed the database
seedDatabase();

