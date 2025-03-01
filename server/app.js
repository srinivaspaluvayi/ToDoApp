const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const {db_connection} = require("./db/database");


//User routes
const userRoutes = require("./router/router");


require("dotenv").config();

const app = express();
db_connection();

//middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//public data
app.use(express.static(path.join(__dirname, "../client/build")));

//routes
app.use(userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/build/index.html"));
});

//server listening at 5000
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
