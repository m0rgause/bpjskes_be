const controller = require("../controllers/master.controller.js");
const router = require("express").Router();

router.get("/", controller.findAll);
router.get("/:table/:id", controller.findOne);
router.post("/:table", controller.create);
router.put("/:table/:id", controller.update);
router.delete("/:table/:id", controller.deleteOne);

module.exports = router;
