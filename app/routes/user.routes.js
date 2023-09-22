const userController = require("../controllers/user.controller");
const router = require("express").Router();

router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);
router.post("/checkauth", userController.checkAuth);
router.post("/menu", userController.getMenu);
router.get("/list/:id", userController.getOne);
router.get("/list", userController.getAll);
router.put("/updategroup/:id", userController.updateGroup);
router.delete("/delete/:id", userController.remove);
router.post("/resetpassword", userController.passReset);
router.post("/authToken", userController.checkTokenReset);
router.put("/changepassword", userController.resetPassword);

module.exports = router;
