const mongoose = require("./index");

const CreateSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  time: Date,
  files: [String],
  userId: mongoose.Types.ObjectId,
});

const TodosModel = mongoose.model("todos", CreateSchema);

async function create(data) {
  const newTodo = new TodosModel(data);
  return await newTodo.save();
}

function get(limit, offset, userId) {
  const allTodos = TodosModel.find({ userId: userId });
  if (limit > 0) allTodos = allTodos.limit(limit);
  if (offset > 0) allTodos = allTodos.skip(offset);
  return allTodos;
}

function getOne(id) {
  return TodosModel.findById(id);
}

function update(id, todo, userId) {
  return TodosModel.updateOne({ _id: id, userId: userId }, todo);
}

function remove(id, userId) {
  return TodosModel.deleteOne({ _id: id, userId });
}

module.exports.create = create;
module.exports.get = get;
module.exports.getOne = getOne;
module.exports.update = update;
module.exports.remove = remove;
