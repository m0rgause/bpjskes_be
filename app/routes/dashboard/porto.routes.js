const controller = require("../../controllers/dashboard/porto.controller");
const router = require("express").Router();

router.post("/summary", controller.summary);
router.post("/comparison", controller.comparison);
router.post("/detail", controller.detailSummary);
router.post("/multi", controller.multiPorto);
router.put("/upload", controller.uploadExcel);
router.post("/file", controller.listPortoFile);
router.post("/file/detail", controller.detailPortoFile);

module.exports = router;
