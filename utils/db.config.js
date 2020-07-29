const mongoose = require("mongoose");
require("dotenv").config();

const dbConnection = mongoose
  .connect(process.env.REMOTE_DB, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

mongoose.Promise = global.Promise;

module.exports = dbConnection;
