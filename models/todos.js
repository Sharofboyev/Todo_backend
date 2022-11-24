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
  files: [{type: mongoose.Types.ObjectId, ref: "files"}],
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
  return allTodos.populate("files");
}

function getOne(id) {
  return TodosModel.findById(id);
}

function update(id, todo) {
  return TodosModel.updateOne({ _id: id }, todo);
}

function remove(id) {
  return TodosModel.deleteOne({ _id: id });
}

module.exports.create = create;
module.exports.get = get;
module.exports.getOne = getOne;
module.exports.update = update;
module.exports.remove = remove;
