const controller = require("../controllers/issuer.controller.js");
const router = require("express").Router();

router.get("/select", controller.findSelect);
router.get("/", controller.findAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.get("/:id", controller.findOne);
router.delete("/:id", controller.deleteOne);

module.exports = router;
