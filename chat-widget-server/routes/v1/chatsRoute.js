const router = require("express").Router();
const chatsController = require('../../controller/chatsController');
const verifyToken = require("../../middleware/verifyToken");

router.use(verifyToken);
router.get("/",chatsController.getAllChats);
router.get("/:id",chatsController.getChat);

module.exports = router;