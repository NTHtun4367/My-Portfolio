import { Response } from "express";
import { Types } from "mongoose";
import jwt from "jsonwebtoken";
import { ENV } from "./env";

const generateToken = (res: Response, userId: Types.ObjectId) => {
  const token = jwt.sign({ userId: userId.toString() }, ENV.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    maxAge: 7 * 24 * 60 * 60 * 1000,
    sameSite: "none",
  });
};

export default generateToken;
