const router = require("express").Router();
const userController = require("../controllers/user.controller");
const { auth } = require("../utils/auth");

router.route("/").get(userController.allUsers);
router.route("/register").post(userController.register);
router.route("/login").post(userController.login);
router.route("/me").get(auth, userController.oneUser);
router.route("/").put(auth, userController.update);
router.route("/").delete(auth, userController.enemyDown);

module.exports = router;
