const mongoose = require('mongoose');

const mongouri = "mongodb://127.0.0.1:27017/enotebook ";
// mongodb://localhost:27017/

const connectTomongo = async () => {
    try {
        await mongoose.connect(mongouri); // No need to pass useNewUrlParser and useUnifiedTopology
        console.log("Connected to MongoDB successfully!");
        console.log("Ready to conquer!!");
    } catch (error) {
        console.error("Failed to connect to MongoDB:", error.message);
    }
};

module.exports = connectTomongo;
