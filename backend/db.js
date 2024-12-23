const mongoose = require('mongoose');

const mongoURL = "mongodb+srv://gofood:geetha%40123@cluster0.3qbo2.mongodb.net/gofoodmern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(mongoURL);
        console.log("Connected to MongoDB");

        const db = mongoose.connection.db;

        // Fetch data in parallel
        const foodItemsCollection = db.collection("food_items");
        const foodCategoryCollection = db.collection("foodcategory");

        const [foodItems, foodCategories] = await Promise.all([
            foodItemsCollection.find({}).toArray(),
            foodCategoryCollection.find({}).toArray(),
        ]);

        // Log fetched data
       // console.log("Fetched Food Items:", foodItems);
        //console.log("Fetched Food Categories:", foodCategories);

        // Assign to global variables
        global.food_items = foodItems;
        global.foodCategory = foodCategories;

        console.log("Data fetched and assigned to global variables");
    } catch (err) {
        console.error("Error connecting to MongoDB or fetching data:", err);
    }
};

module.exports = mongoDB;
