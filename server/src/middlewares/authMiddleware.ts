import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User as UserModel } from "../models/user";
import asyncHandler from "../utils/asyncHandler";
import { Types } from "mongoose";
import { ENV } from "../utils/env";

interface IUserPayload {
  _id: Types.ObjectId | string;
  username: string;
  email: string;
}

export interface AuthRequest extends Request {
  user?: IUserPayload;
}

export const protect = asyncHandler(
  async (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies.token;

    if (!token) {
      res.status(401);
      throw new Error("Unauthorized. No token provided.");
    }

    try {
      const decoded = jwt.verify(token, ENV.JWT_SECRET!) as JwtPayload;

      const user = await UserModel.findById(decoded.userId)
        .select("-password")
        .lean();

      if (!user) {
        res.status(401);
        throw new Error("User not found.");
      }

      req.user = user as unknown as IUserPayload;
      next();
    } catch (error) {
      res.status(401);
      throw new Error("Unauthorized. Invalid token.");
    }
  },
);
