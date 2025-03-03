const mongoose = require("mongoose");
const mongoURI =
  // "mongodb+srv://aryanayush012:qMqgDewQficUyoSM@cluster0.dtw0vgm.mongodb.net/card";
  "mongodb+srv://aryanayush012:mwGK839te2e30Tad@cluster0.cjjz3.mongodb.net/"

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
  console.log("connected to mongoDB Sucesfully");
};

module.exports = connectToMongo;
