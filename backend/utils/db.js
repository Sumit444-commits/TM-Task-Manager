import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connection Successfull");
  } catch (error) {
    console.error("Connection Failed");
  }
};
