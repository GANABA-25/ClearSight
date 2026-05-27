const axios = require("axios");
const User = require("../models/user");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const sendEmail = require("../middleware/sendEmail");
const cloudinary = require("../middleware/cloudinary");
const { OAuth2Client } = require("google-auth-library");
const client = new OAuth2Client(
  "376583342053-uafsj2enb30137sfjgj5vvqd62fj5sc8.apps.googleusercontent.com"
);

exports.gettingStartedComplete = (req, res) => {
  try {
    const { token } = req.body;
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "internal server error!",
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { fullName, phoneNumber, email, password, confirmPassword } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({
        message: "Password does not match",
      });
    }

    const existingUser = await User.findOne({ email: email });

    if (existingUser) {
      return res.status(409).json({
        message: "User already exists, please use another email",
      });
    }

    let formattedPhoneNumber = phoneNumber.trim();

    if (formattedPhoneNumber.startsWith("+233")) {
      formattedPhoneNumber = formattedPhoneNumber.slice(4);
    } else if (formattedPhoneNumber.startsWith("0")) {
      formattedPhoneNumber = "233" + formattedPhoneNumber.slice(1);
    }

    if (!/^233\d{9}$/.test(formattedPhoneNumber)) {
      return { error: "Invalid phone number format. Use 233XXXXXXXXX." };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const newUser = new User({
      fullName: fullName,
      phoneNumber: formattedPhoneNumber,
      email: email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      message: "Account created successfully",
    });

    sendEmail(
      email,
      `Welcome to ClearSight, ${fullName}!`,
      "Your ClearSight Vision Journey Starts Here!",
      `<p>Dear ${fullName},</p>
   <p>Welcome to <strong>ClearSight</strong> – your smart companion for eye health and early cataract detection!</p>
   <p>We're thrilled to have you on board. ClearSight empowers you with tools to:</p>
   <p>👁️ Detect signs of cataracts early using our AI-powered scanner</p>
   <p>📍 Locate nearby eye clinics for consultations and treatment</p>
   <p>🧠 Learn preventive tips to keep your vision clear and strong</p>
   <p>Your journey to better vision starts now. Take charge of your eye health with ClearSight.</p>
   <p>To get started, open the app and begin your first scan today!</p>
   <p>Stay healthy,<br><strong>The ClearSight Team</strong></p>
   <img src="https://res.cloudinary.com/dmdnq9vh8/image/upload/v1753456804/ClearSight/Screenshot_2025-07-25_15-22-54_m4pn0k.png" alt="Welcome to ClearSight" width="600" />`
    ).catch((emailError) => {
      console.error("Failed to send email:", emailError);
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "An error occurred during sign-up. Please try again later.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    console.log(req.body);

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist. Please check your email.",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Incorrect password.",
      });
    }

    const token = jwt.sign(
      {
        email: user.email,
        userId: user._id.toString(),
      },
      process.env.JWT_SECRET,
      { expiresIn: "5h" }
    );

    return res.status(200).json({
      message: "Login successful",
      token: token,
      user: user.fullName,
      profilePicture: user.profilePicture,
      userId: user._id,
      onBoardingToken: user.onboarding.token,
    });
  } catch (error) {
    console.error("Error during sign-in:", error);
    return res.status(500).json({
      message: "An error occurred during sign-in. Please try again later.",
    });
  }
};

exports.googleSignin = async (req, res) => {
  try {
    console.log("came here ---------2222");
    const { token } = req.body;

    const ticket = await client.verifyIdToken({
      idToken: token,
      audience:
        "376583342053-uafsj2enb30137sfjgj5vvqd62fj5sc8.apps.googleusercontent.com",
    });

    const payload = ticket.getPayload();
    const { email, name, picture } = payload;

    // Check or create user in DB
    let user = await User.findOne({ email });
    if (!user) {
      // Create a new user (no password since it's Google sign-in)
      user = new User({
        fullName: name,
        email,
        password: "google-auth", // placeholder to satisfy schema
        phoneNumber: 0, // optional dummy if required
        profilePicture: picture,
      });
      await user.save();
    }

    // Create JWT for app session
    const jwtToken = jwt.sign(
      { userId: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Google Sign-In successful",
      user,
      jwtToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Google authentication failed",
    });
  }
};

exports.onBoarding = async (req, res) => {
  try {
    const {
      glasses,
      eyeCondition,
      familyEyeHistory,
      medicalCondition,
      userId,
    } = req.body;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist!. Please try again later",
      });
    }

    const onBoardingToken = jwt.sign(
      {
        userId: user._id.toString(),
        userId,
      },
      process.env.JWT_SECRET
    );

    user.onboarding = {
      completed: true,
      token: onBoardingToken,
      completedAt: new Date(),
      userHistory: {
        glasses: glasses,
        eyeCondition: eyeCondition,
        familyEyeHistory: familyEyeHistory,
        medicalCondition: medicalCondition,
      },
    };

    await user.save();

    return res.status(200).json({
      message: "onboarding completed",
      onBoardingToken,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error! Try again later",
    });
  }
};

exports.resetPasswordEmailVerification = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { email } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(400).json({
        message: "User does not exist. Please check your email.",
      });
    }

    const { phoneNumber } = user;

    if (!phoneNumber) {
      return res
        .status(400)
        .json({ message: "Phone number not associated with this account." });
    }

    const data = {
      expiry: 5,
      length: 6,
      medium: "sms",
      message:
        "clearSight Password Reset: Your verification code is %otp_code%. This code expires in 5 minutes. Do not share this code with anyone.",
      number: phoneNumber,
      sender_id: "clearSight",
      type: "numeric",
    };
    const headers = {
      "api-key": process.env.ARKESEL_API_KEY,
    };

    const response = await axios.post(
      "https://sms.arkesel.com/api/otp/generate",
      data,
      { headers }
    );

    if (response.data && response.data.code === "1000") {
      sendEmail(
        email,
        "clearSight Password Reset Request",
        "Reset Your Password - clearSight",
        `<p>Dear ${user.fullName},</p>
        <p>We received a request to reset your password for your <strong>clearSight</strong> account.</p>
        <p>If you made this request, please enter the One-Time Password (OTP) sent to your registered phone number to proceed with resetting your password.</p>
        <p><strong>Important:</strong> If you did not request a password reset, please ignore this message and do <strong>not</strong> share the OTP with anyone for security reasons.</p>
        <p>If you have any concerns, please contact our support team.</p>
        <p>Stay safe,<br><strong>The clearSight Team</strong></p>`
      ).catch((emailError) => {
        console.error("Failed to send email:", emailError);
      });

      return res.status(200).json({
        message: "OTP sent successfully!",
        phoneNumber: phoneNumber,
      });
    } else {
      const errorMessage =
        response.data?.message || "Failed to send OTP. Try again later.";
      return res.status(500).json({
        message: errorMessage,
        details: response.data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Internal server error! Try again later",
    });
  }
};

exports.verifyOtp = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { otp, phoneNumber } = req.body;
    console.log(req.body);

    const user = await User.findOne({ phoneNumber: phoneNumber });

    if (!user) {
      return res.status(404).json({
        message:
          "The provided phone number is not associated with any account.",
      });
    }

    const data = {
      api_key: process.env.ARKESEL_API_KEY,
      code: otp,
      number: phoneNumber,
    };

    const headers = {
      "api-key": process.env.ARKESEL_API_KEY,
    };

    const response = await axios.post(
      "https://sms.arkesel.com/api/otp/verify",
      data,
      { headers }
    );

    if (response.data && response.data.code === "1100") {
      return res.status(200).json({
        success: true,
        message:
          "OTP verification successful. You can now reset your password.",
        _id: user._id,
      });
    } else {
      return res.status(400).json({
        message: "OTP Code has expired. Please try again",
      });
    }
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    return res.status(500).json({
      message: "An unexpected error occurred. Please try again later.",
    });
  }
};

exports.resetpassword = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        errors: errors.array(),
      });
    }

    const { newPassword, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found. Please try again.",
      });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    user.password = hashedPassword;

    await user.save();

    sendEmail(
      user.email,
      "clearSight Password Reset Successful",
      "Your Password Has Been Successfully Reset",
      `<p>Dear ${user.fullName},</p>
       <p>Your password has been successfully reset for your <strong>clearSight</strong> account.</p>
       <p>If you made this change, no further action is required.</p>
       <p><strong>Didn't request this change?</strong></p>
       <p>If you did not reset your password, please secure your account immediately by updating your password and contacting our support team.</p>
       <p>For added security, we recommend:</p>
       <ul>
         <li>Using a strong and unique password</li>
         <li>Keeping your login details confidential</li>
         <li>Enabling two-factor authentication if available</li>
       </ul>
       <p>If you need further assistance, feel free to reach out to our support team.</p>
       <p>Stay safe,<br><strong>The clearSight Team</strong></p>`
    ).catch((emailError) => {
      console.error("Failed to send email:", emailError);
    });

    return res.status(200).json({
      message:
        "Password reset successful. You can now log in with your new password.",
    });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const image = req.file;
    const { fullName, email, phoneNumber, userId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found! Try again later",
      });
    }

    if (!image) {
      return res.status(400).json({ message: "No image uploaded" });
    }

    const streamUpload = (buffer) => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          { folder: "ClearSight/profile_pictures" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });
    };

    const result = await streamUpload(image.buffer);

    user.profilePicture = result.secure_url;
    user.fullName = fullName;
    user.phoneNumber = phoneNumber;
    user.email = email;

    await user.save();

    res.status(200).json({
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Something went wrong. Please try again later.",
    });
  }
};
