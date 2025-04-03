import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import mongoDbConnection from "./config/mongoDbConnection.js";
import Authrouter from "./router/AuthRoutes.js";
import UserRouter from "./router/userRoutes.js";
import path from "path";
import TaskRoutes from "./router/TaskRouter.js";
import passport from "passport";
import Profilerouter from "./router/profileRoutes.js";
import "./scheduler.js";

mongoDbConnection();
const app = express();
const port = process.env.PORT || 5000;
const __dirname = path.resolve();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(cookieParser());

//public data
app.use(express.static(path.join(__dirname, "../client/dist/index.html")));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Use your routes
// app.use("/profile", profileRoutes);

app.use("/auth", Authrouter);
app.use("/user", UserRouter);
app.use("/task", TaskRoutes);
app.use("/profile", Profilerouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

// app.use(passport.initialize());
// app.use(passport.session());
// MongoDB Connection
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
