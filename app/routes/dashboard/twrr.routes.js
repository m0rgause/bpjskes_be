const controller = require("../../controllers/dashboard/twrr.controller");
const router = require("express").Router();

router.post("/external-cash", controller.externalCash);

module.exports = router;
