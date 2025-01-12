const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const users = require("../models/users");
const Blacklist = require("../models/blacklist");
const validator = require("validator");

const createToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: "30min",
  });
};
const createSession = (req, user) => {
  //store user details in session
  req.session.user = {
    id: user.id,
    name: user.name,
    email: user.email,
  };
  req.session.userId = user.id;
  req.session.isLoggedIn = true;
};
const handleUserRegister = async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  if (!name || !email || !password || !confirmPassword) {
    return res.status(400).json({ message: "Please add all fields" });
  }

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  try {
    const userExists = await users.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await users.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({ message: "User ${user.name} created successfully" });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
const handleUserLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  try {
    // Input validation checks remain the same
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Please add all fields" });
    }

    if (!validator.isEmail(email)) {
      console.log("Unsupported email format:", email);
      return res
        .status(400)
        .json({ success: false, message: "Try with Valid email Address!" });
    }

    console.log("Finding user with email:", email);
    const user = await users.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });

    // Move the user existence check before password comparison
    if (!user) {
      console.log("No user found with email:", email);
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    if (!user.password) {
      console.log("User has verified but password field is empty");
      return res
        .status(401)
        .json({ success: false, message: "Password Account Incomplete" });
    }

    console.log("Checking password.....");
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    // Note the logical change here - we check if password is NOT correct
    if (!isPasswordCorrect) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    // Login successful - rest remains the same
    const token = createToken(user.id);
    createSession(req, user);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "development" ? false : true,
      sameSite: "strict",
      maxAge: 1000 * 60 * 30,
    });

    return res.status(200).json({
      success: true,
      message: "Login successful",
      data: { user: user.name, email: user.email },
      token,
    });
  } catch (error) {
    console.error("Error:", error.message);
    return res.status(500).json({
      success: false,
      message: "An error occurred while trying to log in",
    });
  }
});
const handleLogoutUser = async (req, res) => {
  try {
    const authHeader = req.headers["cookie"];
    if (!authHeader) {
      return res.status(204).end();
    }

    // Safer cookie parsing
    let accessToken;
    try {
      const cookie = authHeader.split("=")[1];
      accessToken = cookie.split(";")[0];
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid cookie format",
      });
    }

    // Check if already blacklisted
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken });
    if (checkIfBlacklisted) {
      return res.status(204).end();
    }

    // Blacklist token
    const newBlacklist = new Blacklist({
      token: accessToken,
    });
    await newBlacklist.save();

    // Clear session if exists
    if (req.session) {
      req.session.destroy();
    }

    // Clear cookies
    res.clearCookie("token");
    res.setHeader("Clear-Site-Data", '"cookies"');

    return res.status(200).json({
      success: true,
      message: "You are logged out!",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
const handleVerifyUserLogout = async (req, res, next) => {
  try {
    const authHeader = req.headers["cookie"];
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authentication required",
      });
    }

    // Safer cookie parsing
    let accessToken;
    try {
      const cookie = authHeader.split("=")[1];
      accessToken = cookie.split(";")[0];
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Invalid cookie format",
      });
    }

    // Check blacklist
    const checkIfBlacklisted = await Blacklist.findOne({ token: accessToken });
    if (checkIfBlacklisted) {
      return res.status(401).json({
        success: false,
        message: "This session has expired. Please login",
      });
    }

    // Verify token
    try {
      const decoded = jwt.verify(accessToken, process.env.JWT_SECRET); 

      // Find user using same model as login handler
      const user = await users.findOne({
        where: {
          id: decoded.id,
        },
      });

      if (!user) {
        return res.status(401).json({
          success: false,
          message: "User not found",
        });
      }

      // Remove sensitive data
      const { password, ...userData } = user.toJSON();
      req.user = userData;
      next();
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "This session has expired. Please login",
      });
    }
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

module.exports = {
  handleUserRegister,
  handleUserLogin,
  handleLogoutUser,
  handleVerifyUserLogout,
};
