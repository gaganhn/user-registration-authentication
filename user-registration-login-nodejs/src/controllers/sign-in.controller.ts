import { NextFunction, Request, Response } from "express";
import { BadRequestError } from "@raw-ticket/common";
import { User } from "../models/user";
import { Password } from "../services/password";
import { Token } from "../services/webtoken";

/** @method signInController
 * @description
 * This method is used to sign in to this application
 *
 * @see
 * It requires an email and a password to be provided
 *
 * @param req Request of the API
 * @param res Response of the API
 * @param next Next function
 */
const signInController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userName, password } = req.body;

  // check for existing user
  const existingUser = await User.findOne({ userName });

  // Failed to find user check
  if (!existingUser)
    return next(new BadRequestError("Login request failed!", 401));

  // Compare the password provided
  const checkPassword = await Password.compare(existingUser.password, password);

  // Invalid password check
  if (!checkPassword)
    return next(new BadRequestError("Invalid Credentials", 401));

  res.status(200).send({
    userInfo: existingUser,
    token: Token.createToken({ id: existingUser.id, userName }),
  });
};

export { signInController };
