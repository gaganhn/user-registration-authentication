import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "@raw-ticket/common";
import { User } from "../models/user";
import { Token } from "../services/webtoken";

/** @method signUpController
 * @description
 * This method is used to sign up to this application.
 *
 * @see
 * It requires an email and a password to be provided
 *
 * @param req Request of the API
 * @param res Response of the API
 * @param next Next function
 */
const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    email,
    password,
    userName,
    firstName,
    lastName,
    gender,
    country,
  } = req.body;

  const existingUser = await User.findOne({ email });

  // if (existingUser) return next(new BadRequestError("Email/UserName in use!"));
  if (existingUser) {
    res.status(400).send({
      msg: "Email/UserName in use!",
    });
    return;
  }

  const user = User.createUser({
    email,
    password,
    userName,
    firstName,
    lastName,
    gender,
    country,
  });
  await user.save();

  res.status(201).send({
    userInfo: user,
    token: Token.createToken({ id: user.id, email: user.email }),
  });
};

export { signUpController };
