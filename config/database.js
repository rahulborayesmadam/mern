import mongoose from "mongoose";
const database = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected To Database");
  } catch (error) {
    throw new Error("Can't Connect To Database");
  }
};

export default database;
