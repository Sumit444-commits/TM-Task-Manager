import { User } from "../models/user-model.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const emailExists = await User.findOne({ email: email });
    if (emailExists) {
      return res.status(400).json({ message: "Email Already Exists" });
    } else {
      const user = await User.create({ username, email, password });
      return res
        .status(201)
        .json({
          message: "User Created Successfully",
          token: await user.generateToken(),
          userId: user._id.toString(),
        });
    }
  } catch (error) {
    console.error("🔥 Error in register controller:", error);
    res.status(500).json("Internal Server Error");
  }
};
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(email)
    const userExists = await User.findOne({ email });
    console.log(userExists)
    if (!userExists) {
      return res.status(400).json({message:"Invalid Credentials"});
    }

    const user = await userExists.comparePassword(password);
    if (user) {
      res.status(200).json({
        message: "User Login Successfull",
        token: await userExists.generateToken(),
        userId: userExists._id.toString(),
      });
    } else {
      const status = 401;
      const message = "Fill the input properly";
      const extraDetails = "Invalid username or password";
      const error = {
        status: status,
        message: message,
        extraDetails: extraDetails,
      };
      next(error);
    }
  } catch (error) {
    console.error("🔥 Error in login controller:", error);
    res.status(500).json("Internal Server Error");
  }
};

const user = async (req, res) => {
  try {
    const user = req.user;
    return res.status(200).json(user);
  } catch (error) {
    res.status(500).json("Internal Server Error");
  }
};

export { register, login, user };
