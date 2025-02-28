const jwt = require("jsonwebtoken");

const Credential = require("../models/credentials");

exports.postVerifyLogin = (req, res, next) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  Credential.verifyCredentials(email, password, (result) => {
    if (result) {
      const token = jwt.sign({ email: email }, "your_jwt_secret");
      res.json({ email, token });
    } else {
      res.status(401).json({ message: "Invalid credentials" });
    }
  });
};
