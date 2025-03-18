const { sendEmail } = require("../helpers/sendEmail");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const aleaRNGFactory = require("number-generator/lib/aleaRNGFactory");

async function SignupController(req, res) {
  const { name, email, phone, password, role } = req.body;
  const otp = aleaRNGFactory(Date.now()).uInt32().toString().substring(0, 6);
  try {
    const olduseremail = await userModel.findOne({ email });

    if (!olduseremail) {
      bcrypt.hash(password, 10, async function (err, hash) {
        const user = new userModel({
          name,
          email,
          phone,
          password: hash,
          role,
        });
        await user.save();
        sendEmail(email, otp);
        user.otp = otp;
        await user.save();

        // setTimeout(async () => {
        //   user.otp = null;
        //   await user.save();
        // }, 120000);

        res
          .status(201)
          .json({ msg: "signup successful", success: true, data: user });
      });
    } else {
      res
        .status(500)
        .send({ success: false, msg: " You have already use this email" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

async function LoginController(req, res) {
  const { email, password } = req.body;
  try {
    const existinguser = await userModel.findOne({ email });
    if (!existinguser) {
      return res.status(404).json({ success: false, msg: "email not found" });
    } else {
      bcrypt.compare(
        password,
        existinguser.password,
        async function (err, result) {
          const user = await userModel.findOne({ email }).select("-password");
          if (result) {
            if (existinguser.role == "user") {
              const token = jwt.sign({ user }, process.env.JWT_secret);
              return res.status(200).json({
                success: true,
                msg: "user login successful",
                data: user,
                token: token,
              });
            } else if (existinguser.role == "admin") {
              const token = jwt.sign({ user }, process.env.JWT_secret, {
                expiresIn: "10m",
              });
              return res.status(200).json({
                success: true,
                msg: "admin login successful",
                data: user,
                token: token,
              });
            }
          } else {
            res.status(404).json({ success: false, msg: "wrong password" });
          }
        }
      );
    }
  } catch (error) {
    res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

async function VerifyOtpController(req, res) {
  const { email, otp } = req.body;
  try {
    const existinguser = await userModel.findOne({ email });
    if (existinguser) {
      if (existinguser.otp == otp) {
        existinguser.isVerify = true;
        existinguser.otp = null;
        await existinguser.save();
        res.status(200).json({ success: true, msg: "OTP verify successful" });
      } else {
        res.status(404).json({ err: "Invalid OTP", success: false });
      }
    } else {
      res.status(404).json({ err: "User not found", success: false });
    }
  } catch (error) {
    res
      .status(500)
      .json({ err: error.message ? error.message : error, success: false });
  }
}

module.exports = { SignupController, LoginController, VerifyOtpController };
