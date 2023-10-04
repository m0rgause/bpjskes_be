const controller = require("../../controllers/dashboard/ckpn.controller");
const router = require("express").Router();

router.post("/summary", controller.summary);
router.post("/deposito", controller.deposito);
router.post("/obligasi", controller.obligasi);

module.exports = router;
