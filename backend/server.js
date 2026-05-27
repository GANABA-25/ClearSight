require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const mongodb_uri = process.env.Mongodb_uri;

const app = express();

const userRoutes = require("./routes/userRoutes");
const checkCataractRoutes = require("./routes/checkCataractRoutes");

app.use(cors());
app.use(express.json());

app.use("/user", userRoutes);
app.use("/checkCataract", checkCataractRoutes);

mongoose
  .connect(mongodb_uri)
  .then((connected) => {
    app.listen(process.env.PORT || 8090);
    console.log("connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error.message);
  });
