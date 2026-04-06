import { Request, Response } from "express";
import { User } from "../models/user";
import generateToken from "../utils/generateToken";
import asyncHandler from "../utils/asyncHandler";
import { AuthRequest } from "../middlewares/authMiddleware";

export const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (user && (await user.comparePassword(password))) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
    });
  } else {
    res.status(401).json({ message: "Invalid email or password" });
  }
});

export const getUserProfile = asyncHandler(
  async (req: AuthRequest, res: Response) => {
    const user = await User.findById(req.user?._id).select("-password");

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404);
      throw new Error("User not found in database");
    }
  },
);

export const logout = asyncHandler(async (req: Request, res: Response) => {
  res.cookie("token", "", {
    httpOnly: true,
    expires: new Date(0),
    secure: true,
    sameSite: "none",
  });

  res.status(200).json({ message: "Logged out successfully" });
});
