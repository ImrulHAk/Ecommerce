const express = require("express");
const {
  SignupController,
  LoginController,
  VerifyOtpController,
} = require("../../controllers/authController");
const verifyTokenController = require("../../controllers/verifyTokenController");
const router = express.Router();

//localhost:8899/auth/signup
router.post("/signup", SignupController);

//localhost:8899/auth/login
router.post("/login", LoginController);

//localhost:8899/auth/verifyotp
router.post("/verifyotp", VerifyOtpController);

router.get("/verify-token", verifyTokenController);

module.exports = router;
