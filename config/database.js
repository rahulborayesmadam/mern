import mongoose from "mongoose";
const database = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected To Database");
  } catch (error) {
    console.log(error);
  }
};

export default database;
