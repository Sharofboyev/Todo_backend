const mongoose = require("mongoose");
const config = require("../config");

mongoose
  .connect(config.dbConnectionString)
  .then((data) => {
    console.log("Connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
