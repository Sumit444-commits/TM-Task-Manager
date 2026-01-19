import mongoose from "mongoose";
import bcrypt, { hash } from "bcryptjs";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const user = this;
  try {
    if (!user.isModified("password")) {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(user.password, salt);
    user.password = hashPass;
  } catch (error) {
    console.log("error failed to hash the password");
  }
});

userSchema.methods.comparePassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.log("error failed to compare hash password");
  }
};

userSchema.methods.generateToken = async function (next) {
  try {
    const token = jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
      },
      process.env.JWT_KEY,
      { expiresIn: "1h" }
    );
    return token;
  } catch (error) {
    console.log("error failed to generate token");
    next(error);
  }
};

export const User = new mongoose.model("User", userSchema);
