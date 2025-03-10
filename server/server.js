import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoDbConnection from "./config/mongoDbConnection.js";
import Authrouter from "./router/AuthRoutes.js";
import UserRouter from "./router/userRoutes.js";

mongoDbConnection();
const app = express();
const port = process.env.PORT || 5000;
app.use(express.json());
app.use(cors({ credentials: true }));
app.use(bodyParser.json());
app.use(cookieParser());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", Authrouter);
app.use("/user", UserRouter);
// MongoDB Connection
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
