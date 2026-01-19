import jwt from "jsonwebtoken";
import { User } from "../models/user-model.js";

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    if (!token) {
      return res
        .status(401)
        .json({ message: "Unauthorized Access! Token not provided" });
    }
    const jwtToken = token.split(" ")[1];
    const isVerified = jwt.verify(jwtToken, process.env.JWT_KEY, (err, res) => {
      if (err) {
        return "Token Expired";
      }
      return res;
    });
    if (isVerified == "Token Expired") {
      return res.status(404).json({ message: "Token Expired" });
    }
    const user = await User.findOne({ _id: isVerified.userId })
      .select({
        password: 0,
      })
    req.user = user;
    req.token = jwtToken;
    req.userId = user._id;
    next();
  } catch (error) {
    next(error);
  }
};

export default authMiddleware;
