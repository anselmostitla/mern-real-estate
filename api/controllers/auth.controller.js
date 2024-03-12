import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  let msg = {};

  if (password.length < 8) {
    msg.password = "password must be at least 8 characters";
  }

  const hashedPassword = bcryptjs.hashSync(password, 10);
  try {
    if (await User.findOne({ username })) {
      msg.username = "username already in use";
    }
    if (await User.findOne({ email })) {
      msg.email = "email already in use";
    }
    if (msg.password || msg.username || msg.email)
      return res.status(400).json({ message: msg });

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    res.status(201).json("User created successfully");
  } catch (error) {
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) return next(errorHandler(404, "Wrong credentials"));

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));

    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
      expiresIn: "2d",
    });

    const { password: pass, ...restUserInfo } = validUser._doc;

    res
      .cookie("access token", token, { httpOnly: true })
      .status(201)
      .json({ msg: "User logged in", token, restUserInfo });
  } catch (error) {
    next(error);
  }
};

export const google = async (req, res, next) => {
  try {
    const validUser = await User.findOne({ email: req.body.email });

    if (validUser) {
      const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      const { password: pass, ...restUserInfo } = validUser._doc;
      console.log("restUserInfo: ", restUserInfo);
      res
        .cookie("access token", token, { httpOnly: true })
        .status(201)
        .json({ msg: "User logged in", token, restUserInfo });
    } else {
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      console.log("generatedPassword: ", generatedPassword);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = await User.create({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.random().toString(36).slice(-4),
        email: req.body.email,
        password: hashedPassword,
        avatar: req.body.photo,
      });
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: "2d",
      });
      const { password: pass, ...restUserInfo } = newUser._doc;
      res
        .cookie("access token", token, { httpOnly: true })
        .status(201)
        .json({ msg: "User logged in", token, restUserInfo });
    }
  } catch (error) {
    next(error);
  }
};

export const signOut = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json("User has been loged out!");
  } catch (error) {
    next(error);
  }
};
