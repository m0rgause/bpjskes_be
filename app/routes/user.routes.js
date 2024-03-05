const userController = require("../controllers/user.controller");
const router = require("express").Router();

const  verifyToken = require("../middleware/verifyToken");

router.post("/signin", userController.signIn);
router.post("/signup", userController.signUp);
router.post("/checkauth", verifyToken,  userController.checkAuth);
router.post("/menu", verifyToken, userController.getMenu);
router.get("/list/:id",verifyToken,  userController.getOne);
router.get("/list", verifyToken,  userController.getAll);
router.put("/updategroup/:id",verifyToken,  userController.updateGroup);
router.delete("/delete/:id",verifyToken, userController.remove);
router.post("/resetpassword", userController.passReset);
router.post("/authToken", userController.checkTokenReset);
router.put("/changepassword", userController.resetPassword);
router.post("/changepassword2", userController.changepassword2);

module.exports = router;
