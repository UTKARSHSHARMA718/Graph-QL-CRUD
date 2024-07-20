import mongoose from "mongoose";

/**
 * Function to connect with the database
 */
export const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connection to database`);
  } catch (err) {
    console.log({ err });
  }
};
