import { Request, Response } from "express";
import { registerUser } from "../services/register.service";

export async function register(
  req: Request,
  res: Response
) {
  try {
    const {
      firstName,
      lastName,
      phone,
      email,
      password,
    } = req.body;

    const user = await registerUser(
      firstName,
      lastName,
      phone,
      email,
      password
    );

    res.status(201).json(user);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Could not create user",
    });
  }
}