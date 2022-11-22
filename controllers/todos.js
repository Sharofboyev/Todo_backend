const router = require("express").Router();
const Todo = require("../services/todos");
const todoService = new Todo();
const Joi = require("joi");
const {isValidObjectId, Types} = require("mongoose");

router.get("/", async (req, res, next) => {
  try{
    if (req.params.id){
      if (!isValidObjectId(req.params.id))
        return res.status(400).send({success: false, error: "Received object id is not valid"});
      const todo = await todoService.getOne(req.params.id);
      if (!todo) return res.status(404).send({success: false, error: "Todo with given id not found"});
      return res.send({success: true, data: todo});
    }
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
    const data = await todoService.create(req.body);
    return res.send({success: true, data});
  }catch(err){
    return next(err);
  }
});

router.patch("/:id", async(req, res, next) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send({success: false, error: "Received object id is not valid"});
  const {error, value} = Joi.object({
    header: Joi.string().optional().min(2).max(64),
    content: Joi.string().optional().max(1024),
    files: Joi.array().optional(),
    time: Joi.date().optional()
  }).validate(req.body);

  if (error) return res.status(400).send({success: false, error: error.details[0].message});

  if (Object.keys(value).length > 0){
    try {
      const updateStatus = await todoService.update(req.params.id, req.body);
      if (updateStatus.matchedCount > 0){
        return res.send({success: true});
      }
      return res.status(404).send({success: false, error: "Todo with given id not found"})
    }catch(err){
      return next(err);
    }
  }
  else return res.status(400).send({success: false, error: "There is no field to update"});

});

router.delete("/:id", async (req, res, next) => {
  if (!isValidObjectId(req.params.id))
    return res.status(400).send({success: false, error: "Received object id is not valid"});
  
  try {
    const deleteStatus = await todoService.remove(req.params.id);
    if (deleteStatus.deletedCount > 0){
      return res.send({success: true});
    }
    return res.status(404).send({success: false, error: "Todo with given id not found"})
  }catch(err){
    return next(err);
  }
});

module.exports = router;
