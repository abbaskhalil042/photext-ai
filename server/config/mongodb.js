import mongoose from "mongoose";

const connect = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected");
    });
    // await mongoose.connect(`${process.env.MONGODB_URI}/photext`);//MONGODB_URI=mongodb+srv://abbas:abbas112233@cluster0.qqff8.mongodb.net

    await mongoose.connect(process.env.MONGODB_URI);
  } catch (error) {
    console.error("MongoDB connection failed");
    process.exit(1);
  }
};

export default connect;
