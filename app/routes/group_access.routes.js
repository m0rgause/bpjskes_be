const groupAccessController = require("../controllers/groupAccess.controller");

const router = require("express").Router();

router.get("/list", groupAccessController.getAll);
router.post("/insert", groupAccessController.add);
router.put("/update/:id", groupAccessController.onUpdate);

module.exports = router;
