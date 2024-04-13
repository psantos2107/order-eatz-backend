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
    "image": "https://example.com/spicy_chicken_wrap.jpg"
  },
  {
    "name": "Veggie Delight Pizza",
    "price": 11.99,
    "category": "Pizzas",
    "allergens": ["Gluten", "Dairy"],
    "description": "A medley of fresh bell peppers, onions, mushrooms, and olives on a classic tomato base, topped with mozzarella cheese.",
    "image": "https://example.com/veggie_delight_pizza.jpg"
  },
  {
    "name": "Caesar Salad",
    "price": 7.99,
    "category": "Salads",
    "allergens": ["Dairy", "Fish", "Gluten"],
    "description": "Crisp romaine lettuce, parmesan cheese, croutons, and Caesar dressing, topped with a sprinkle of freshly ground pepper.",
    "image": "https://example.com/caesar_salad.jpg"
  },
  {
    "name": "BBQ Ribs",
    "price": 15.99,
    "category": "Main Courses",
    "allergens": [],
    "description": "Slow-cooked ribs smothered in our signature BBQ sauce, served with coleslaw and garlic mashed potatoes.",
    "image": "https://example.com/bbq_ribs.jpg"
  },
  {
    "name": "Grilled Salmon",
    "price": 14.99,
    "category": "Seafood",
    "allergens": ["Fish"],
    "description": "Freshly grilled salmon fillet with a lemon butter glaze, served with steamed vegetables and rice pilaf.",
    "image": "https://example.com/grilled_salmon.jpg"
  },
  {
    "name": "Mushroom Risotto",
    "price": 12.99,
    "category": "Pasta & Risottos",
    "allergens": ["Dairy", "Gluten"],
    "description": "Creamy Arborio rice cooked with a variety of mushrooms, white wine, and a touch of garlic, finished with Parmesan cheese.",
    "image": "https://example.com/mushroom_risotto.jpg"
  },
  {
    "name": "Classic Margherita Pizza",
    "price": 10.99,
    "category": "Pizzas",
    "allergens": ["Gluten", "Dairy"],
    "description": "A simple yet delicious pizza with fresh basil, mozzarella cheese, and our classic tomato sauce.",
    "image": "https://example.com/classic_margherita_pizza.jpg"
  },
  {
    "name": "Thai Green Curry",
    "price": 13.99,
    "category": "Curries",
    "allergens": ["Peanuts"],
    "description": "Aromatic green curry with coconut milk, bamboo shoots, bell peppers, and your choice of chicken or tofu, served with jasmine rice.",
    "image": "https://example.com/thai_green_curry.jpg"
  },
  {
    "name": "Beef Tacos",
    "price": 9.99,
    "category": "Tacos",
    "allergens": ["Gluten"],
    "description": "Three soft shell tacos filled with seasoned ground beef, lettuce, shredded cheese, and fresh pico de gallo.",
    "image": "https://example.com/beef_tacos.jpg"
  },
  {
    "name": "Shrimp Alfredo Pasta",
    "price": 13.99,
    "category": "Pasta & Risottos",
    "allergens": ["Dairy", "Gluten", "Shellfish"],
    "description": "Fettuccine pasta tossed in a rich Alfredo sauce with sautéed shrimp, garnished with parsley.",
    "image": "https://example.com/shrimp_alfredo_pasta.jpg"
  },
  {
    "name": "Pan-Seared Duck Breast",
    "price": 21.99,
    "category": "Main Courses",
    "allergens": [],
    "description": "Juicy duck breast with a crispy skin, served with a cherry sauce, roasted vegetables, and mashed sweet potatoes.",
    "image": "https://example.com/pan_seared_duck_breast.jpg"
  },
  {
    "name": "Quinoa Salad",
    "price": 8.99,
    "category": "Salads",
    "allergens": [],
    "description": "A refreshing mix of quinoa, cucumbers, cherry tomatoes, red onions, and feta cheese, dressed with a lemon vinaigrette.",
    "image": "https://example.com/quinoa_salad.jpg"
  },
  {
    "name": "Eggplant Parmesan",
    "price": 14.99,
    "category": "Vegetarian",
    "allergens": ["Gluten", "Dairy"],
    "description": "Sliced eggplant, breaded and fried, layered with marinara sauce and mozzarella, then baked to perfection.",
    "image": "https://example.com/eggplant_parmesan.jpg"
  },
  {
    "name": "Lamb Gyro",
    "price": 9.99,
    "category": "Wraps",
    "allergens": ["Gluten"],
    "description": "Slices of seasoned lamb with tomatoes, onions, and tzatziki sauce, wrapped in a soft pita bread.",
    "image": "https://example.com/lamb_gyro.jpg"
  },
  {
    "name": "Coconut Shrimp",
    "price": 11.99,
    "category": "Appetizers",
    "allergens": ["Shellfish", "Gluten"],
    "description": "Crispy coconut-breaded shrimp served with a sweet chili dipping sauce.",
    "image": "https://example.com/coconut_shrimp.jpg"
  },
  {
    "name": "Pork Belly Bao",
    "price": 10.99,
    "category": "Appetizers",
    "allergens": ["Gluten", "Soy"],
    "description": "Steamed buns filled with succulent pork belly, pickled vegetables, and hoisin sauce.",
    "image": "https://example.com/pork_belly_bao.jpg"
  },
  {
    "name": "Seared Tuna Salad",
    "price": 13.99,
    "category": "Salads",
    "allergens": ["Fish", "Soy"],
    "description": "Freshly seared tuna atop a bed of mixed greens, avocado, mango, and a wasabi vinaigrette.",
    "image": "https://example.com/seared_tuna_salad.jpg"
  },
  {
    "name": "Butternut Squash Soup",
    "price": 7.99,
    "category": "Soups",
    "allergens": ["Dairy"],
    "description": "Creamy butternut squash soup seasoned with nutmeg and cinnamon, served with a dollop of crème fraîche.",
    "image": "https://example.com/butternut_squash_soup.jpg"
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
    "image": "https://example.com/vegetable_stir_fry.jpg"
  },
  {
    "name": "Fish and Chips",
    "price": 13.99,
    "category": "Seafood",
    "allergens": ["Fish", "Gluten"],
    "description": "Beer-battered cod served with crispy fries, tartar sauce, and malt vinegar.",
    "image": "https://example.com/fish_and_chips.jpg"
  },
  {
    "name": "Spinach and Ricotta Ravioli",
    "price": 14.99,
    "category": "Pasta & Risottos",
    "allergens": ["Gluten", "Dairy"],
    "description": "Homemade ravioli filled with spinach and ricotta, served in a sage butter sauce.",
    "image": "https://example.com/spinach_and_ricotta_ravioli.jpg"
  },
  {
    "name": "Greek Salad",
    "price": 8.99,
    "category": "Salads",
    "allergens": ["Dairy"],
    "description": "Classic Greek salad with tomatoes, cucumbers, red onions, olives, and feta cheese, dressed with olive oil and oregano.",
    "image": "https://example.com/greek_salad.jpg"
  },
  {
    "name": "Beef Bourguignon",
    "price": 18.99,
    "category": "Main Courses",
    "allergens": ["Gluten"],
    "description": "Tender beef slow-cooked in a rich red wine sauce with mushrooms, onions, and carrots, served over mashed potatoes.",
    "image": "https://example.com/beef_bourguignon.jpg"
  },
  {
    "name": "Avocado Toast",
    "price": 6.99,
    "category": "Breakfast",
    "allergens": ["Gluten"],
    "description": "Crisp toast topped with smashed avocado, cherry tomatoes, radishes, and a sprinkle of sesame seeds.",
    "image": "https://example.com/avocado_toast.jpg"
  },
  {
    "name": "Chicken Quesadilla",
    "price": 9.99,
    "category": "Appetizers",
    "allergens": ["Gluten", "Dairy"],
    "description": "Grilled chicken, melted cheese, and sautéed onions and peppers in a toasted flour tortilla, served with salsa and sour cream.",
    "image": "https://example.com/chicken_quesadilla.jpg"
  },
  {
    "name": "French Onion Soup",
    "price": 7.99,
    "category": "Soups",
    "allergens": ["Gluten", "Dairy"],
    "description": "Caramelized onion soup topped with a toasted baguette slice and melted Gruyère cheese.",
    "image": "https://example.com/french_onion_soup.jpg"
  },
  {
    "name": "Steak Frites",
    "price": 19.99,
    "category": "Main Courses",
    "allergens": [],
    "description": "Grilled steak served with herb butter and a side of crispy fries.",
    "image": "https://example.com/steak_frites.jpg"
  },
  {
    "name": "Caprese Salad",
    "price": 8.99,
    "category": "Salads",
    "allergens": ["Dairy"],
    "description": "Sliced tomatoes, fresh mozzarella, basil, and a drizzle of balsamic glaze.",
    "image": "https://example.com/caprese_salad.jpg"
  },
  {
    "name": "Baked Ziti",
    "price": 12.99,
    "category": "Pasta & Risottos",
    "allergens": ["Gluten", "Dairy"],
    "description": "Ziti pasta baked with marinara sauce, ricotta, and mozzarella cheese.",
    "image": "https://example.com/baked_ziti.jpg"
  },
   {
    "name": "Lobster Bisque",
    "price": 9.99,
    "category": "Soups",
    "allergens": ["Shellfish", "Dairy"],
    "description": "A rich and creamy lobster soup, seasoned with a touch of sherry.",
    "image": "https://example.com/lobster_bisque.jpg"
  },
  {
    "name": "Mediterranean Chicken",
    "price": 14.99,
    "category": "Main Courses",
    "allergens": [],
    "description": "Grilled chicken breast marinated in Mediterranean herbs, served with a quinoa salad and tzatziki.",
    "image": "https://example.com/mediterranean_chicken.jpg"
  },
  {
    "name": "Roasted Beet Salad",
    "price": 9.99,
    "category": "Salads",
    "allergens": ["Dairy"],
    "description": "Roasted beets, arugula, goat cheese, walnuts, and a balsamic reduction.",
    "image": "https://example.com/roasted_beet_salad.jpg"
  },
  {
    "name": "Carbonara Pasta",
    "price": 13.99,
    "category": "Pasta & Risottos",
    "allergens": ["Gluten", "Dairy", "Eggs"],
    "description": "Spaghetti tossed with crispy pancetta, eggs, and Parmesan, creating a creamy sauce without cream.",
    "image": "https://example.com/carbonara_pasta.jpg"
  },
  {
    "name": "Buffalo Wings",
    "price": 10.99,
    "category": "Appetizers",
    "allergens": [],
    "description": "Crispy chicken wings tossed in Buffalo sauce, served with celery sticks and blue cheese dressing.",
    "image": "https://example.com/buffalo_wings.jpg"
  },
  {
    "name": "Sushi Platter",
    "price": 22.99,
    "category": "Sushi",
    "allergens": ["Fish", "Soy"],
    "description": "An assortment of fresh nigiri, sashimi, and maki rolls, served with soy sauce, wasabi, and pickled ginger.",
    "image": "https://example.com/sushi_platter.jpg"
  },
  {
    "name": "Ratatouille",
    "price": 12.99,
    "category": "Vegetarian",
    "allergens": [],
    "description": "A traditional French stew of summer vegetables including zucchini, eggplant, peppers, and tomatoes.",
    "image": "https://example.com/ratatouille.jpg"
  },
  {
    "name": "Korean BBQ Ribs",
    "price": 17.99,
    "category": "Main Courses",
    "allergens": ["Soy", "Gluten"],
    "description": "Tender ribs marinated in a sweet and savory Korean BBQ sauce, grilled to perfection.",
    "image": "https://example.com/korean_bbq_ribs.jpg"
  },
  {
    "name": "Pumpkin Soup",
    "price": 7.99,
    "category": "Soups",
    "allergens": ["Dairy"],
    "description": "Creamy pumpkin soup spiced with nutmeg and cinnamon, topped with roasted pumpkin seeds.",
    "image": "https://example.com/pumpkin_soup.jpg"
  },
  {
    "name": "Falafel Wrap",
    "price": 8.99,
    "category": "Wraps",
    "allergens": ["Gluten"],
    "description": "Crispy falafel balls wrapped with lettuce, tomatoes, cucumbers, and tahini sauce in a soft tortilla.",
    "image": "https://example.com/falafel_wrap.jpg"
  },
 {
    "name": "Clam Chowder",
    "price": 9.99,
    "category": "Soups",
    "allergens": ["Shellfish", "Dairy"],
    "description": "Creamy New England clam chowder with potatoes, celery, onions, and clams.",
    "image": "https://example.com/clam_chowder.jpg"
  },
  {
    "name": "Miso Glazed Cod",
    "price": 16.99,
    "category": "Seafood",
    "allergens": ["Fish", "Soy"],
    "description": "Oven-roasted cod with a sweet and savory miso glaze, served with steamed rice and bok choy.",
    "image": "https://example.com/miso_glazed_cod.jpg"
  },
  {
    "name": "Tomato Bruschetta",
    "price": 6.99,
    "category": "Appetizers",
    "allergens": ["Gluten"],
    "description": "Toasted baguette slices topped with a mixture of diced tomatoes, garlic, basil, and olive oil.",
    "image": "https://example.com/tomato_bruschetta.jpg"
  },
  {
    "name": "Peking Duck",
    "price": 23.99,
    "category": "Main Courses",
    "allergens": ["Gluten", "Soy"],
    "description": "Crispy roasted duck served with pancakes, scallions, cucumber, and hoisin sauce.",
    "image": "https://example.com/peking_duck.jpg"
  },
  {
    "name": "Tiramisu",
    "price": 6.99,
    "category": "Desserts",
    "allergens": ["Gluten", "Dairy", "Eggs"],
    "description": "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese, dusted with cocoa powder.",
    "image": "https://example.com/tiramisu.jpg"
  },
  {
    "name": "Cheese Platter",
    "price": 14.99,
    "category": "Appetizers",
    "allergens": ["Dairy"],
    "description": "A selection of fine cheeses served with crackers, nuts, and fruit preserves.",
    "image": "https://example.com/cheese_platter.jpg"
  },
  {
    "name": "Pad Thai",
    "price": 12.99,
    "category": "Noodles",
    "allergens": ["Peanuts", "Gluten", "Shellfish"],
    "description": "Stir-fried rice noodles with shrimp, peanuts, egg, bean sprouts, and a tangy tamarind sauce.",
    "image": "https://example.com/pad_thai.jpg"
  },
  {
    "name": "Chocolate Lava Cake",
    "price": 7.99,
    "category": "Desserts",
    "allergens": ["Gluten", "Dairy", "Eggs"],
    "description": "Warm chocolate cake with a gooey center, served with vanilla ice cream.",
    "image": "https://example.com/chocolate_lava_cake.jpg"
  },
  {
    "name": "Vegetarian Lasagna",
    "price": 13.99,
    "category": "Vegetarian",
    "allergens": ["Gluten", "Dairy"],
    "description": "Layers of pasta, ricotta, spinach, and marinara sauce, baked with a mozzarella cheese topping.",
    "image": "https://example.com/vegetarian_lasagna.jpg"
  },
  {
    "name": "Crab Cakes",
    "price": 15.99,
    "category": "Seafood",
    "allergens": ["Shellfish", "Gluten"],
    "description": "Pan-fried crab cakes served with a remoulade sauce and a lemon wedge.",
    "image": "https://example.com/crab_cakes.jpg"
  },
 {
  "name": "Mango Sticky Rice",
  "price": 6.99,
  "category": "Desserts",
  "allergens": [],
  "description": "Sweet sticky rice topped with fresh mango slices and a drizzle of coconut cream.",
  "image": "https://example.com/mango_sticky_rice.jpg"
}
];

const drinkData = [
  {
    name: "Mango Mojito",
    price: 8.99,
    category: "Cocktails",
    description: "A tropical twist on the classic mojito, made with mango puree, rum, mint leaves, lime juice, and soda water.",
    image: "Link to image"
  },
  {
    name: "Cosmopolitan",
    price: 9.99,
    category: "Cocktails",
    description: "Iconic cocktail made with vodka, triple sec, cranberry juice, and freshly squeezed lime juice.",
    image: "Link to image"
  },
  {
    name: "Whiskey Smash",
    price: 10.99,
    category: "Cocktails",
    description: "Refreshing cocktail with whiskey, muddled mint leaves, lemon juice, simple syrup, and a splash of soda water.",
    image: "Link to image"
  },
  {
    name: "Pineapple Express",
    price: 9.99,
    category: "Cocktails",
    description: "Tropical cocktail featuring pineapple juice, coconut rum, orange liqueur, and a splash of grenadine.",
    image: "Link to image"
  },
  {
    name: "Espresso Martini",
    price: 11.99,
    category: "Cocktails",
    description: "Indulgent cocktail made with vodka, coffee liqueur, freshly brewed espresso, and a touch of simple syrup.",
    image: "Link to image"
  },
  {
    name: "Raspberry Collins",
    price: 9.99,
    category: "Cocktails",
    description: "Tart and fruity cocktail made with gin, raspberry syrup, lemon juice, and soda water.",
    image: "Link to image"
  },
  {
    name: "Margarita",
    price: 8.99,
    category: "Cocktails",
    description: "Classic cocktail made with tequila, triple sec, lime juice, and a salted rim.",
    image: "Link to image"
  },
  {
    name: "Mai Tai",
    price: 10.99,
    category: "Cocktails",
    description: "Tropical cocktail with rum, lime juice, orgeat syrup, and orange liqueur, garnished with a cherry and pineapple wedge.",
    image: "Link to image"
  },
  {
    name: "Gin Fizz",
    price: 9.99,
    category: "Cocktails",
    description: "Classic cocktail made with gin, lemon juice, simple syrup, and soda water, topped with a frothy egg white foam.",
    image: "Link to image"
  },
  {
    name: "Peach Bellini",
    price: 11.99,
    category: "Cocktails",
    description: "Elegant cocktail made with Prosecco and peach purée, perfect for brunch or celebrations.",
    image: "Link to image"
  },
  {
    name: "Fresh Orange Juice",
    price: 3.99,
    category: "Drinks",
    description: "Freshly squeezed orange juice, served chilled.",
    image: "Link to image"
  },
  {
    name: "Iced Americano",
    price: 4.99,
    category: "Drinks",
    description: "Strong espresso shots poured over ice, topped with water.",
    image: "Link to image"
  },
  {
    name: "Lemonade",
    price: 3.99,
    category: "Drinks",
    description: "Refreshing blend of freshly squeezed lemon juice, water, and simple syrup.",
    image: "Link to image"
  },
  {
    name: "Iced Tea",
    price: 3.99,
    category: "Drinks",
    description: "Cold-brewed tea served over ice, with optional lemon slices and sweetener.",
    image: "Link to image"
  },
  {
    name: "Sparkling Water",
    price: 2.99,
    category: "Drinks",
    description: "Crisp and bubbly carbonated water, served chilled.",
    image: "Link to image"
  },
  {
    name: "Mint Lemonade",
    price: 4.99,
    category: "Drinks",
    description: "Refreshing lemonade infused with fresh mint leaves, served over ice.",
    image: "Link to image"
  },
  {
    name: "Cranberry Juice",
    price: 3.99,
    category: "Drinks",
    description: "Tart and tangy juice made from cranberries, served cold.",
    image: "Link to image"
  },
  {
    name: "Iced Matcha Latte",
    price: 5.99,
    category: "Drinks",
    description: "Creamy matcha green tea mixed with milk and poured over ice.",
    image: "Link to image"
  },
  {
    name: "Ginger Ale",
    price: 3.99,
    category: "Drinks",
    description: "Spicy and effervescent soda made with real ginger extract.",
    image: "Link to image"
  },
  {
    name: "Lemon Iced Tea",
    price: 4.99,
    category: "Drinks",
    description: "Refreshing iced tea infused with lemon flavor, served with lemon slices and sweetener on the side.",
    image: "Link to image"
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

