const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signup = async (req, res) => {
  try {
    const { email, password, apiKey } = req.body;
    const existingUser = await User.findOne({ where: {email} });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }
    // hashing password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Error in hashing password",
      });
    }

    // checking if the user is admin or not through apiKey
    let role = "user";
    if (apiKey && apiKey == process.env.API_KEY) {
      role = "admin";
    }

    // save in database
    const user = await User.create({
      email,
      password: hashedPassword,
      role,
    });

    return res.status(200).json({
      success: true,
      message: "User created successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "User creation failed! Please try again later.",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please fill all the details",
      });
    }

    const user = await User.findOne({where:{ email }});

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not Registered",
      });
    }

    const payload = {
      email: user.email,
      id: user.id,
      role: user.role,
    };

    if (await bcrypt.compare(password, user.password)) {
      // creating jwt
      let token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "2hr",
      });

      res.status(200).json({
        success: true,
        data: token,
        message: "user logged in successfully",
      });
    } else {
      return res.status(403).json({
        success: false,
        message: "Password is incorrect",
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "Login failure",
    });
  }
};
