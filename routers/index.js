const router = require("express").Router();
const todosController = require("../controllers/todos");
const filesController = require("../controllers/files");
const userController = require("../controllers/user");
const auth = require("../middlewares/auth");

//This router will divide requests to specific controllers
router.use("/user", userController);

router.use("/todos", todosController);

router.use("/files", auth, filesController);

module.exports = router;
