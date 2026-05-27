const express = require("express");
const { body } = require("express-validator");
const { uploadImage } = require("../middleware/multer");

const router = express.Router();

const userController = require("../controller/userController");

router.post("/gettingStartedComplete", userController.gettingStartedComplete);

router.post(
  "/signup",
  [
    body("fullName").trim().notEmpty().withMessage("Full name is required"),
    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .isLength({ min: 10, max: 10 })
      .withMessage("Phone number must be exactly 10 digits")
      .isNumeric()
      .withMessage("Phone number must contain only digits")
      .matches(/^[0-9]{10}$/)
      .withMessage("Invalid phone number format"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is required and must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 7 })
      .withMessage("Password length should be more than seven characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[\W_]/)
      .withMessage("Password must contain at least one special character"),
    body("confirmPassword")
      .trim()
      .notEmpty()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ],
  userController.signup,
);

router.post(
  "/login",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is required and must be valid"),
    body("password").trim().notEmpty().withMessage("Password is required"),
  ],
  userController.login,
);

router.post("/googleSignin", userController.googleSignin);

router.post("/onBoarding", userController.onBoarding);

router.post(
  "/resetPasswordEmailVerification",
  [
    body("email")
      .trim()
      .isEmail()
      .withMessage("Email is required and must be valid"),
  ],
  userController.resetPasswordEmailVerification,
);

router.post(
  "/verifyOtp",
  [
    body("otp")
      .trim()
      .notEmpty()
      .withMessage("OTP is required")
      .isLength({ min: 6, max: 6 })
      .withMessage("Please enter a complete 6-digit OTP")
      .isNumeric()
      .withMessage("Invalid OTP format. The OTP should contain only numbers."),
    body("phoneNumber")
      .trim()
      .notEmpty()
      .withMessage("Phone number is required")
      .isLength({ min: 12, max: 12 })
      .withMessage("Phone number must be exactly 13 digits")
      .isNumeric()
      .withMessage("Phone number must contain only digits")
      .matches(/^233[0-9]{9}$/)
      .withMessage(
        "Invalid phone number format. Must start with 233 and have 9 more digits",
      ),
  ],
  userController.verifyOtp,
);

router.post(
  "/resetpassword",
  [
    body("newPassword")
      .trim()
      .notEmpty()
      .withMessage("Password is required")
      .bail()
      .isLength({ min: 7 })
      .withMessage("Password length should be more than seven characters")
      .matches(/[A-Z]/)
      .withMessage("Password must contain at least one uppercase letter")
      .matches(/[a-z]/)
      .withMessage("Password must contain at least one lowercase letter")
      .matches(/[0-9]/)
      .withMessage("Password must contain at least one number")
      .matches(/[\W_]/)
      .withMessage("Password must contain at least one special character"),
    body("confirmNewPassword")
      .trim()
      .notEmpty()
      .withMessage("Confirm password is required")
      .custom((value, { req }) => {
        if (value !== req.body.newPassword) {
          throw new Error("Passwords do not match");
        }
        return true;
      }),
  ],
  userController.resetpassword,
);

router.post("/updateProfile", uploadImage, userController.updateProfile);

module.exports = router;
