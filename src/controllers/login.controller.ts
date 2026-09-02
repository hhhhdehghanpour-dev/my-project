import { Request, Response } from "express";
import { loginUser } from "../services/login.service";

export async function login(
  req: Request,
  res: Response
) {
  try {
    const { email, password } = req.body;

    const result = await loginUser(
      email,
      password
    );

    res.json({
      message: "Login successful",
      token: result.token,
    });
  } catch (error) {
    console.error(error);

    res.status(401).json({
      message: "Invalid email or password",
    });
  }
}