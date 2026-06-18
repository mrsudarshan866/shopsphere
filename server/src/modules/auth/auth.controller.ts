import { Request, Response } from "express";
import { createUser, validateUser } from "./auth.service";

import { generateAccessToken, generateRefreshToken } from "../../utils/token";

import { User } from "../user/user.model";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password, role } = req.body;

    const user = await createUser(name, email, password, role);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await validateUser(email, password);

    const accessToken = generateAccessToken(user._id.toString());

    const refreshToken = generateRefreshToken(user._id.toString());

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.json({
      success: true,
      token: accessToken,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie("refreshToken");

  res.json({
    success: true,
    message: "Logged out",
  });
};

export const getProfile = async (req: any, res: Response) => {
  const user = await User.findById(req.user.id).select("-password");

  res.json({
    success: true,
    user,
  });
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.cookies.refreshToken;

    if (!token) {
      return res.status(401).json({
        message: "No refresh token",
      });
    }

    const jwt = require("jsonwebtoken");

    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);

    const accessToken = generateAccessToken(decoded.id);

    res.json({
      token: accessToken,
    });
  } catch {
    res.status(401).json({
      message: "Invalid refresh token",
    });
  }
};
