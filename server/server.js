import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoDbConnection from "./config/mongoDbConnection.js";
import Authrouter from "./router/AuthRoutes.js";
import UserRouter from "./router/userRoutes.js";
import path from "path";

mongoDbConnection();
const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());


//public data
app.use(express.static(path.join(__dirname, "../client/dist")));

app.use("/auth", Authrouter);
app.use("/user", UserRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// MongoDB Connection
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
