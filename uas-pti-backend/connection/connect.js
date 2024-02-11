const mongoose = require("mongoose");

const connect = async () => {
  try {
    await mongoose.connect(process.env.CONNECTION_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = connect;
