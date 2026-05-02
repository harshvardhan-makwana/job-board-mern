const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    (`mongodb connected: ${conn.connection.host}`);
  } catch (error) {
    (`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports=connectDB;