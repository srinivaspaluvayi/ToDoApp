import jwt from "jsonwebtoken";

const userauth = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token, Unauthorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.id) {
      req.body.userId = decoded.id;
    }
    // req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export default userauth;
