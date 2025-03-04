const mongoose = require("mongoose");
const mongoURI =
  // "mongodb+srv://aryanayush012:qMqgDewQficUyoSM@cluster0.dtw0vgm.mongodb.net/card";
  "mongodb+srv://aryanayush012:mwGK839te2e30Tad@cluster0.cjjz3.mongodb.net/"

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected!");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

module.exports = connectToMongo;
