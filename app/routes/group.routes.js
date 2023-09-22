const groupController = require("../controllers/group.controller");
const router = require("express").Router();

router.get("/list/select", groupController.getSelect);
router.get("/list/:id", groupController.getOne);
router.get("/list", groupController.getAll);
router.post("/insert", groupController.add);
router.put("/update/:id", groupController.update);
router.delete("/delete/:id", groupController.remove);

module.exports = router;
