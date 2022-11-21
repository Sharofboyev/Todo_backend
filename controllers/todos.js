const router = require("express").Router();
const Todo = require("../services/todos");
const todoService = new Todo();

router.get("/", async (req, res) => {
  const todos = await todoService.getAll();
  return res.send(todos);
});
router.post("/", (req, res) => {});
router.patch("/", (req, res) => {});
router.delete("/", (req, res) => {});

module.exports = router;
