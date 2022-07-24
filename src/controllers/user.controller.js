const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config({ path: "./.env" });

module.exports = {
  async register(req, res) {
    try {
      const { email, password, name } = req.body;
      const encPassword = await bcrypt.hash(password, 8);
      const user = await User.create({
        name,
        email,
        password: encPassword,
        totalAmount: 0,
        picture: "nothing",
      });

      const token = jwt.sign({ id: user._id }, process.env.MUSA, {
        expiresIn: 60 * 60 * 24 * 365,
      });
      res.status(200).json({
        message: "User created",
        data: {
          token,
          name: user.name,
          email: user.email,
          totalAmount: user.totalAmount,
          picture: "nothing",
        },
      });
    } catch (err) {
      res.status(400).json({ message: "User could not be registered" });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("User or password not valid");
      }
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) {
        throw new Error("User or password not valid !");
      }
      const token = jwt.sign({ id: user._id }, process.env.MUSA, {
        expiresIn: 60 * 60 * 24 * 365,
      });

      res.status(200).json({
        message: "User logged",
        data: {
          token,
          name: user.name,
          email: user.email,
          totalAmount: user.totalAmount,
          picture: "nothing",
        },
      });
    } catch (err) {
      res.status(400).json({ message: "User could not login" });
    }
  },

  async allUsers(req, res) {
    try {
      const users = await User.find();
      res.status(200).json({ message: "Users found", data: users });
    } catch (err) {
      res.status(400).json({ message: "Users cannot be brought" });
    }
  },

  async oneUser(req, res) {
    try {
      const userId = req.user;
      const user = await User.findById(userId);
      res.status(200).json({ message: "User found", data: user });
    } catch (err) {
      res.status(404).json({ message: "User not found" });
    }
  },

  async update(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      res.status(200).json({ message: "User update", data: user });
    } catch (err) {
      res.status(400).jason({ message: "User could not update" });
    }
  },

  async enemyDown(req, res) {
    try {
      const userId = req.user;
      const user = await User.findByIdAndDelete(userId);
      res.status(200).json({ message: "User destroyed", data: user });
    } catch (err) {
      res
        .status(400)
        .json({ message: "User could not be destroyed", data: err });
    }
  },
};
