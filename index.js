const express = require("express");
const config = require("./config");
const router = require("./routers");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
app.use(router);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ success: false, error: "Internal server error" });
});

app.listen(config.appPort, () => {
  console.log(`Listening on port ${config.appPort}...`);
});
