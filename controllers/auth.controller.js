import { UserModel } from "../models/user.model.js";
import { sendMail } from "../services/mail.service.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res, next) => {
  try {
    const { name, password, role, email, phone } = req.body;
    let user = await new UserModel({
      name,
      password,
      email,
      phone,
      role,
    }).save();
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
};

export const getOneUser = async (req, res, next) => {
  try {
    const { id } = req.param;
    if (!email) {
      return next({
        status: 400,
        message: "No User Found",
      });
    }
    const user = await UserModel.findById(id);

    res.status(200).send(user);
  } catch (error) {
    next(error);
  }
};
export const getAllUser = async (req, res, next) => {
  try {
    const user = await UserModel.find();
    if (!user) {
      return res.status(400).json("No user to show");
    }
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return next({
        status: 404,
        message: "No User Found",
      });
    }
    const user = await UserModel.findOne({ email: email });
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRECT, {
        expiresIn: "1d",
      });
      res.cookie("cookiename", token, { httpOnly: true, secure: true });
      res.status(200).send("login success");
    } else {
      res.status(401).send("invalid credentials");
    }
  } catch (error) {
    next(error);
  }
};

export const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await UserModel.findOne({ email: email });
    // console.log("user>>>", user)
    const payload = user._id;

    if (!user) {
      res.status(400).send("user not found");
    } else {
      const token = jwt.sign({ _id: payload }, process.env.JWT_SECRECT, {
        expiresIn: "1d",
      });
      await sendMail(email, token, req.headers.host).then((done) => {
        if (done) {
          res.send("reset link has been send, check your email");
        } else {
          res.send("err in sending mail");
        }
      });
    }
  } catch (error) {
    next(error);
  }
};

export const resetPassword = async (req, res, next) => {
  try {
    const { newPassword, confirmPassword } = req.body;
    const { token } = req.params;

    if (newPassword != confirmPassword) {
      res.status(400).send("password not matched. Please check!!!");
    }

    const isVerified = jwt.verify(token, process.env.JWT_SECRECT);

    if (!isVerified) {
      res.status(400).send("token not verified");
    } else {
      var user = await UserModel.findOne({ name: isVerified.payload });
      user.password = newPassword;
      await user.save();

      console.log("user>>>", user);
      res.send(user);
    }
  } catch (error) {
    next(error);
  }
};
