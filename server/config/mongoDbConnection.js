import mongoose from "mongoose";
import dotenv from "dotenv/config";

const mongoDbConnection = async () => {
  mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
  });
  mongoose.connection.on("error", (err) => {
    console.log("MongoDB connection error: ", err);
  });
  await mongoose.connect(`${process.env.MONGODB_URI}`);
};
export default mongoDbConnection;
