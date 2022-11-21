const mongoose = require("mongoose");
const config = require("../config");

mongoose.connect(config.dbConnectionString)
  .then((data) => {
    console.log("Database connected succesfully");
  })
  .catch((err) => {
    console.log(err);
  });

const CreateSchema = new mongoose.Schema({
  header: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  time: Date,
  files: Array
});

const TodosModel = mongoose.model('todos', CreateSchema);

async function create(data){
  const newTodo = new TodosModel(data);
  await newTodo.save();
}

async function get(limit, offset, id){
  const allTodos = TodosModel.find(id ? {_id: id}: null);
  if (limit > 0)
    allTodos = allTodos.limit(limit);
  if (offset > 0)
    allTodos = allTodos.skip(offset);
  return allTodos;
}

module.exports.create = create;
module.exports.get = get;
