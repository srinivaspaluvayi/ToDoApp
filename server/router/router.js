const Router = require("express").Router();

const userController = require("../controller/controller");

Router.post("/login", userController.postVerifyLogin);

Router.get("/home/:key", userController.getHome);

Router.post("/addTask", userController.postAddTask);

module.exports = Router;