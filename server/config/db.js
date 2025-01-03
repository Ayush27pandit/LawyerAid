const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:enuThUQ0PpaCKswG@cluster0.n7gwjes.mongodb.net/lawproj"
    );
    console.log("DB connected");
  } catch (err) {
    console.log(err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
