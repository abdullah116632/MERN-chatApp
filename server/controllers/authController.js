import path from "path";
import { fileURLToPath } from "url";
import User from "../models/userModel.js";
import bcryptjs from "bcryptjs";
import otpGenerator from "otp-generator";
import generateTokenAndSetToken from "../utils/generateToken.js";
import asyncErrorHandler from "../utils/asyncErrorHandler.js";
import customError from "../utils/customErrorClass.js";
import sendMail from "../utils/sendMail.js";
import cloudinary from "../db/cloudinary.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const maleProfilePicPath = path.join(
  __dirname,
  "..",
  "server",
  "assets",
  "maleProfilePic.jpg"
);
const femaleProfilePicPath = path.join(
  __dirname,
  "..",
  "server",
  "assets",
  "femaleProfilePic.jpg"
);

export const signup = asyncErrorHandler(async (req, res, next) => {
  const { name, email, password, confirmPassword, gender } = req.body;

  const profilePicPath =
    gender === "male" ? maleProfilePicPath : femaleProfilePicPath;

  const response = await cloudinary.uploader.upload(profilePicPath, {
    resource_type: "auto",
    folder: "chatApp/user-profilePic",
  });

  const profilePic = response.secure_url;

  const newUser = new User({
    name,
    email,
    password,
    confirmPassword,
    gender,
    profilePic,
  });

  await newUser.save();
  generateTokenAndSetToken(newUser._id, res);

  res.status(201).json({
    status: "success",
    data: {
      user: newUser,
    },
  });
});

export const login = asyncErrorHandler(async (req, res, next) => {
  const { password, email } = req.body;

  if (!password) {
    const error = new customError(400, "Please enter password and, emal");
    return next(error);
  }

  const user = await User.findOne({ email }).select("+password +isActive");

  if (!user || !user.isActive) {
    const error = new customError(404, "This user does not exist");
    return next(error);
  }

  const isPasswordCorrect = await bcryptjs.compare(
    password,
    user.password || ""
  );

  if (!isPasswordCorrect) {
    const error = new customError(401, "Password dont match");
    return next(error);
  }

  generateTokenAndSetToken(user?._id, res);

  const userForResponse = await User.findOne({ email });

  res.status(200).json({
    status: "success",
    data: {
      user: userForResponse,
    },
  });
});

export const logout = asyncErrorHandler(async (req, res, next) => {
  res.cookie("jwt", "", { maxAge: 0 });
  res.status(200).json({
    status: "success",
    data: null,
  });
});

export const forgetPassword = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;

  if (!email) {
    const err = new customError(400, "Please enter email");
    return next(err);
  }

  const user = await User.findOne({ email });

  if (!user) {
    return next(new customError(404, "No user exist with this email"));
  }

  const OTP = otpGenerator.generate(6, {
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  user.OTP = OTP;
  user.OTPExpires = Date.now() + 1200000; //20 minute
  await user.save({ validateBeforeSave: false });

  try {
    await sendMail({
      email: user.email,
      OTP,
      username: user.username,
    });

    res.status(200).json({
      status: "success",
      data: {
        user: {
          _id: user._id,
          email: user.email,
        },
      },
    });
  } catch (err) {
    next(err);
  }
});

export const validateOtp = asyncErrorHandler(async (req, res, next) => {
  const { OTP, email } = req.body;

  if (!OTP) {
    return next(new customError(400, "please send your otp"));
  }

  const user = await User.findOne({
    email,
    isActive: { $ne: false },
    OTP,
    OTPExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new customError(404, "OTP dont match or has expired or user dont exist")
    );
  }

  user.OTP = undefined;
  user.OTPExpires = undefined;
  user.OTPValidated = true;

  await user.save({ validateBeforeSave: false });

  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

export const resetPassword = asyncErrorHandler(async (req, res, next) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword) {
    return next(
      new customError(
        400,
        "input is missing, in emial , password and confirmPassword"
      )
    );
  }
  if (newPassword !== confirmPassword) {
    return next(
      new customError(400, "password and Confirm password are not same")
    );
  }

  const user = await User.findOne({
    email,
    isActive: { $ne: false },
    OTPValidated: { $ne: false },
  });

  if (!user) {
    return next(
      new customError(404, "OTP validation failed or user dont exist")
    );
  }

  user.password = newPassword;
  user.OTPValidated = undefined;

  await user.save({ validateBeforeSave: false });

  const userForResponse = await User.findOne({ email });

  res.status(200).json({
    status: "success",
    data: {
      user: userForResponse,
    },
  });
});

export const updatePassword = asyncErrorHandler(async (req, res, next) => {
  const { currentPassword, newPassword, confirmPassword } = req.body;

  let user = req.user;

  if (!currentPassword || !newPassword || !confirmPassword) {
    return next(
      new customError(
        400,
        "please enter current password new password confirm password all"
      )
    );
  }

  if (newPassword !== confirmPassword) {
    return next(
      new customError(400, "new password and confirm password must be same")
    );
  }

  const isPasswordCorrect = await bcryptjs.compare(
    currentPassword,
    user.password
  );

  if (!isPasswordCorrect) {
    return next(new customError(401, "Current password dont match"));
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  const userForResponse = await User.findOne({ email: user.email });

  res.status(200).json({
    status: "success",
    data: {
      user: userForResponse,
    },
  });
});
