const controller = require("../controllers/twrr_coa.controller");
const router = require("express").Router();

router.get("/", controller.findAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.get("/:id", controller.findOne);
router.delete("/:id", controller.deleteData);

module.exports = router;
