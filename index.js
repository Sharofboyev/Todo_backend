const express = require("express");
const config = require("./config");
const router = require("./routers");
const app = express();

app.use(express.json());
app.use(router);

app.listen(config.appPort, () => {
  console.log(`Listening on port ${config.appPort}...`);
});
