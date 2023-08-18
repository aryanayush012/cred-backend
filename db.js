const mongoose = require("mongoose");
const mongoURI =
  "mongodb+srv://aryanayush012:qMqgDewQficUyoSM@cluster0.dtw0vgm.mongodb.net/card";

const connectToMongo = async () => {
  await mongoose.connect(mongoURI);
  console.log("connected to mongoDB Sucesfully");
};

module.exports = connectToMongo;
