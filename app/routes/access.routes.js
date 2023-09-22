const accessController = require("../controllers/access.controller");
const router = require("express").Router();

router.get("/list", accessController.getAll);
router.get("/list/:id", accessController.getOne);
router.post("/insert", accessController.add);
router.put("/update/:id", accessController.update);
router.delete("/delete/:id", accessController.remove);

module.exports = router;
