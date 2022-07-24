const router = require("express").Router();
const listController = require("../controllers/list.controller");
const { auth } = require("../utils/auth");

router.route("/").post(auth, listController.createList);
router.route("/:listId").get(listController.list);
router.route("/").get(auth, listController.theLists);
router.route("/:listId").put(listController.updateList);
router.route("/:listId").delete(listController.deleteList);

module.exports = router;
