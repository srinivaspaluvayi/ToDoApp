const mongoose = require("mongoose");

const MONGODB_URI="";

// Connect to MongoDB

const db_connection = function(){
    mongoose.connect(MONGODB_URI)
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.error("MongoDB connection error:", err));
}

exports.db_connection = db_connection;