const controller = require("../controllers/rating.controller.js");
const router = require("express").Router();

router.get("/", controller.findAll);
router.get("/select", controller.findAllForSelect);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.get("/:id", controller.findOne);
router.delete("/:id", controller.deleteOne);

module.exports = router;
