const mongoose = require("mongoose");
const config = require("../config");

mongoose
  .connect(config.dbConnectionString)
  .then((data) => {
    console.log("Database connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
