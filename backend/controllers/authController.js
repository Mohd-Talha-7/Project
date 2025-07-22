const userModel = require("../models/user");
const bcrypt = require("bcrypt");

const authController = {
  signup: async (req, res) => {
    const { username, email, password, age } = req.body;

    try {
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        return res
          .status(400)
          .json({ message: "Email already exists. Please login instead." });
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(password, salt);

      const createdUser = await userModel.create({
        username,
        email,
        password: hash,
        age,
      });

      req.session.user = createdUser;
      res.status(200).json({ message: "Signup successful", user: createdUser });
    } catch (error) {
      console.error("Error during signup:", error);
      res.status(500).json({ message: "Error during signup" });
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Incorrect email or password" });
      }

      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        return res.status(400).json({ message: "Incorrect email or password" });
      }

      req.session.user = user;
      res.status(200).json({ message: "Login successful", user });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Error during login" });
    }
  },

  logout: (req, res) => {
    req.session.destroy((err) => {
      if (err) {
        console.error("Error during logout:", err);
        return res.status(500).json({ message: "Logout failed" });
      }
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logged out successfully" });
    });
  },
};

module.exports = authController;