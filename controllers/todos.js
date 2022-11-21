const router = require("express").Router();
const Todo = require("../services/todos");
const todoService = new Todo();
const Joi = require("joi")

router.get("/", async (req, res, next) => {
  try{
    const todos = await todoService.getAll(req.query.limit, req.query.offset);
    return res.send({success: true, data: todos});
  }catch(err){
    return next(err)
  }
});
router.post("/", async (req, res, next) => {
  const {error, value} = Joi.object({
    header: Joi.string().required().min(2).max(64),
    content: Joi.string().required().max(1024),
    files: Joi.array().optional(),
    time: Joi.date().optional()
  }).validate(req.body);

  if (error) return res.status(400).send({success: false, error: error.details[0].message});

  try {
    await todoService.create(req.body);
    return res.send({success: true});
  }catch(err){
    return next(err);
  }
});
router.patch("/", (req, res) => {});
router.delete("/", (req, res) => {});

module.exports = router;
