const controller = require("../../controllers/dashboard/twrr.controller");
const router = require("express").Router();

router.post("/external-cash", controller.externalCash);
router.post("/comparison", controller.comparison);
router.post("/detail", controller.detail);
router.post("/file", controller.listTWRRFile);
router.post("/file/detail", controller.detailTWRRFile);
router.put("/upload", controller.uploadTWRRFile);

module.exports = router;
