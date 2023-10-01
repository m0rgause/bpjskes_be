const controller = require("../../controllers/dashboard/twrr.controller");
const router = require("express").Router();

router.post("/external-cash", controller.externalCash);
router.post("/comparison", controller.comparison);
router.post("/detail", controller.detail);

module.exports = router;
