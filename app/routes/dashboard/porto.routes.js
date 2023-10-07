const controller = require("../../controllers/dashboard/porto.controller");
const router = require("express").Router();

router.post("/summary", controller.summary);
router.post("/comparison", controller.comparison);
router.post("/detail", controller.detailSummary);
router.post("/multi", controller.multiPorto);

module.exports = router;
