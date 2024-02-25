import errorHandler from "../errors/errorHandler.error.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username) return next(errorHandler(400, "Username is required"));
  if (!password) return next(errorHandler(400, "Password is required"));
  if (!email) return next(errorHandler(400, "Email is required"));
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
