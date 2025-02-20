const Router = require("express").Router();

const userController = require("../controller/controller");

Router.post("/login", userController.postVerifyLogin);

module.exports = Router;