const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.models");

require("dotenv").config();

exports.register = async (req, res) => {
  try {
    const { username, password } = req.body;
    

    // Check if a user laready exists
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create a new user
    user = new User({
      username,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "server Error" });
  }
};

// Login a user and return JWT
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    console.log(username, password);
    

    // Check if user exists
    let user = await User.findOne({
      username  
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    // Generate JWT token
    const payload = { userId: user._id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token, userId: user._id });

  } catch (error) {
    res.status(500).json({ message: "server Error" });
  }
};
