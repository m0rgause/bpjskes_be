const controller = require("../controllers/custody.controller");
const router = require("express").Router();

router.get("/", controller.findAll);
router.get("/select", controller.findSelect);
router.post("/", controller.create);
router.get("/:id", controller.findOne);
router.put("/:id", controller.update);
router.delete("/:id", controller.remove);

module.exports = router;
