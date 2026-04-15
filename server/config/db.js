import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    //await mongoose.connect("mongodb://localhost:27017/bookmyshow");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("Mongo Connection failed");
  }
};

export default connectDB;
