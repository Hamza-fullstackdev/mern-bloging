import errorHandler from "../errors/errorHandler.error.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username) return next(errorHandler(400, "Username field is required"));
  if (!password) return next(errorHandler(400, "Password field is required"));
  if (!email) return next(errorHandler(400, "Email field is required"));
  if (password.length < 8)
    return next(errorHandler(400, "Password should be at least 8 characters"));
  if (username.length <= 4)
    return next(
      errorHandler(400, "Username should be greater than 4 characters")
    );

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    next(errorHandler(400, "User with this email already exists"));
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    username: username,
    email: email,
    password: hashedPassword,
  });
  try {
    const saveUserInfo = await user.save();
    if (saveUserInfo) {
      res.send({
        statusCode: 201,
        message: "User created successfully",
      });
    } else {
      next(errorHandler(404, "User creation failed"));
    }
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return next(errorHandler(400, "Email field is required"));
  if (!password) return next(errorHandler(400, "Password field is required"));
  try {
    const user = await User.findOne({ email });
    if (!user)
      return next(
        errorHandler(400, "Invalid credentials, try with different email")
      );
    const decryptPassword = bcrypt.compareSync(password, user.password);
    if (!decryptPassword) return next(errorHandler(400, "Wrong Credentials"));
    if (user) {
      const token = jwt.sign({ id: user._id }, "mern-bloging application");
      const { password: pass, ...rest } = user._doc;
      res.cookie("access_token", token).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};
