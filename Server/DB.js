const mongoose = require('mongoose');
const URI = process.env.URI;

const connectDB = async () => {
    try {
        // Connect to MongoDB with proper options
        await mongoose.connect(URI, {
            useNewUrlParser: true, // Ensures compatibility with modern connection strings
            useUnifiedTopology: true, // Enables the new MongoDB driver connection management engine
        });

        console.log("Connected to MongoDB successfully.");
    } catch (err) {
        console.error("Error connecting to MongoDB:", err.message || err);
        process.exit(1); // Exit process with failure if the database connection fails
    }
};

module.exports = connectDB;
