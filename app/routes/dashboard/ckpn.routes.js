const controller = require("../../controllers/dashboard/ckpn.controller");
const router = require("express").Router();

router.post("/summary", controller.summary);

module.exports = router;
