import { body, check } from "express-validator";

//Login
export const validRegisterUser = [
  body("name").default(undefined),
  body("email").default(undefined),
  body("password").default(undefined),
  body("phone").default(undefined),

  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
  check("name").notEmpty().withMessage("name is required"),
  check("phone")
    .isNumeric()
    .withMessage("Phone should be numeric")
    .notEmpty()
    .withMessage("phone is required"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 4 })
    .withMessage("Password should be atleast 4 character"),
];

export const validLoginUser = [
  body("email").default(undefined),
  body("password").default(undefined),
  check("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Must be a valid email address"),
  check("password")
    .notEmpty()
    .withMessage("password is required")
    .isLength({ min: 4 })
    .withMessage("Password should be atleast 4 character"),
];
