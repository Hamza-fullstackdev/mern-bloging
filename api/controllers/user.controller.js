import errorHandler from "../errors/errorHandler.error.js";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!username) return next(errorHandler(403, "Username field is required"));
  if (!password) return next(errorHandler(403, "Password field is required"));
  if (!email) return next(errorHandler(403, "Email field is required"));
  if (password.length < 8)
    return next(errorHandler(403, "Password should be at least 8 characters"));
  if (username.length <= 4)
    return next(
      errorHandler(403, "Username should be greater than 4 characters")
    );

  const checkUser = await User.findOne({ email });
  if (checkUser) {
    next(errorHandler(403, "User with this email already exists"));
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
      next(errorHandler(403, "User creation failed"));
    }
  } catch (err) {
    return next(err);
  }
};

export const login = async (req, res, next) => {
  const { email, password } = req.body;
  if (!email) return next(errorHandler(403, "Email field is required"));
  if (!password) return next(errorHandler(403, "Password field is required"));
  try {
    const user = await User.findOne({ email });
    if (!user)
      return next(
        errorHandler(403, "Invalid credentials, try with different email")
      );
    const decryptPassword = bcrypt.compareSync(password, user.password);
    if (!decryptPassword) return next(errorHandler(403, "Wrong Credentials"));
    if (user) {
      const token = jwt.sign(
        { id: user._id, isAdmin: user.isAdmin },
        process.env.JWT_SECRET_TOKEN
      );
      const { password: pass, ...rest } = user._doc;
      res.cookie("access_token", token).status(200).json(rest);
    }
  } catch (error) {
    next(error);
  }
};

export const googleAuth = async (req, res, next) => {
  try {
    const isUserExist = await User.findOne({ email: req.body.email });
    if (isUserExist) {
      const token = jwt.sign(
        { id: isUserExist._id, isAdmin: isUserExist.isAdmin },
        process.env.JWT_SECRET_TOKEN
      );
      const { password: pass, ...rest } = isUserExist._doc;
      res.cookie("access_token", token).status(200).json(rest);
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        password: generatedPassword,
        avatar: req.body.avatar,
      });
      try {
        await newUser.save();
        const token = jwt.sign(
          { id: newUser._id, isAdmin: newUser.isAdmin },
          process.env.JWT_SECRET_TOKEN
        );
        const { password: pass, ...rest } = newUser._doc;
        res.cookie("access_token", token).status(200).json(rest);
      } catch (error) {
        next(error);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(403, "You are not authorized to update this user")
    );
  }
  if (req.body.password) {
    if (req.body.password < 6) {
      return next(errorHandler(403, "Password should be atleast 6 characters"));
    }
    req.body.password = bcrypt.hashSync(req.body.password, 10);
  }
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          avatar: req.body.avatar,
        },
      },
      { new: true }
    );
    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(
      errorHandler(401, "You are not authorized to delete this user")
    );
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User account has been deleted successfully");
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User account has been deleted successfully");
  } catch (error) {
    next(error);
  }
};
