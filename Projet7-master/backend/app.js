const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser");
const stuffRoutes = require("./routes/stuff");
const userRoutes = require("./routes/user");
const path = require("path");
mongoose
  .connect(process.env.DB_PASSWORD, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  // mettre dans .env
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));
const app = express();
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(bodyParser.json());

app.use("/api/accueil", stuffRoutes);
app.use("/api/auth", userRoutes);
app.use("/images", express.static(path.join(__dirname, "images")));
module.exports = app;
