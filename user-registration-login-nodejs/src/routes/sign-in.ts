import express, { Router } from "express";
import { body } from "express-validator";

import { validateRequest } from "@raw-ticket/common";
import { signInController } from "../controllers/sign-in.controller";

const router: Router = express.Router();

router.post(
  "/api/users/signin",
  /**@middleware_1
   * to check if email and password are provided in body or not
   */
  [
    body("userName").trim().notEmpty().withMessage("userName cannot be empty!"),
    body("password")
      .trim()
      .notEmpty()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),
  ],
  /**@middleware_2
   * to check for request errors leading to bad request
   */
  validateRequest,
  /**@controller */
  signInController
);

export { router as signInRouter };
