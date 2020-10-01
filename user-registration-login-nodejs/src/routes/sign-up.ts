import express, { Router } from "express";
import { body } from "express-validator";

import { validateRequest } from "@raw-ticket/common";
import { signUpController } from "../controllers/sign-up.controller";

const router: Router = express.Router();

router.post(
  "/api/users/signup",
  /**@middleware_1
   * to check if email and password are provided in body or not
   */
  [
    body("email").isEmail().withMessage("Email must be valid!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
    body("userName").trim().notEmpty().withMessage("userName cannot be empty"),
    body("firstName")
      .trim()
      .notEmpty()
      .withMessage("firstName cannot be empty"),
    body("lastName").trim().notEmpty().withMessage("lastName cannot be empty"),
    body("gender").trim().notEmpty().withMessage("gender cannot be empty"),
    body("country").trim().notEmpty().withMessage("country cannot be empty"),
  ],
  /**@middleware_2
   * to check for request errors leading to bad request
   */
  validateRequest,
  /**@controller */
  signUpController
);

export { router as signUpRouter };
