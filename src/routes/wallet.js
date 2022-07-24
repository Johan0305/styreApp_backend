const router = require("express").Router();
const walletController = require("../controllers/wallet.controller");
const { auth } = require("../utils/auth");

router.route("/").post(auth, walletController.createWallet);
router.route("/:walletId").get(walletController.wallet);
router.route("/").get(auth, walletController.theWallets);
router.route("/:walletId").put(walletController.updateWallet);
router.route("/:walletId").delete(walletController.deleteWallet);

module.exports = router;
