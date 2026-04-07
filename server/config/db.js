import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    //mongoose.connect("mongodb://localhost:27017/bookmyshow");
    console.log("mongo connected");
  } catch (err) {
    console.log("Mongo Connection failed");
  }
};

export default connectDB;
