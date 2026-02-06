const mongoose = require("mongoose");

// Connection
async function connectMongoDB(url) {
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error);
        process.exit(1);
    }
}

module.exports = {
    connectMongoDB,
};
