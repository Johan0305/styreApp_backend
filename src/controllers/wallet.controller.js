const User = require("../models/user.model");
const Wallet = require("../models/wallet.model");

module.exports = {
  async theWallets(req, res) {
    try {
      const userId = req.user;
      const wallets = await Wallet.find({ user: userId });
      res.status(200).json({ message: "wallets found", data: wallets });
    } catch (err) {
      res.status(400).json({
        message: "it has not been possible to bring the wallets",
        err: err,
      });
    }
  },

  async wallet(req, res) {
    try {
      const { walletId } = req.params;
      const wallet = await Wallet.findById(walletId);
      res.status(200).json({ message: "wallet found", data: wallet });
    } catch (err) {
      res.status(400).json({
        message: "it has not been possible to bring wallet",
        err: err,
      });
    }
  },

  async createWallet(req, res) {
    try {
      const userId = req.user;
      const wallet = await Wallet.create({ ...req.body, user: userId });
      const user = await User.findById(userId);
      user.wallets.push(wallet);
      user.save({ validateBeforeSave: false });
      res.status(201).json({ message: "wallet created", data: wallet });
    } catch (err) {
      res.status(400).json({ message: "wallet could not be created" });
    }
  },

  async updateWallet(req, res) {
    try {
      const { walletId } = req.params;
      const wallet = await Wallet.findByIdAndUpdate(walletId, req.body, {
        new: true,
      });
      res.status(200).json({
        message: "Wallet updated",
        data: wallet,
      });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Wallet could not be updated", err: err });
    }
  },

  async deleteWallet(req, res) {
    try {
      const { walletId } = req.params;
      const wallet = await Wallet.findByIdAndDelete(walletId);
      res.status(200).json({ message: "Wallet deleted", data: wallet });
    } catch (err) {
      res
        .status(400)
        .json({ message: "Wallet could not be deleted", err: err });
    }
  },
};
