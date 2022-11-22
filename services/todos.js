const todosModel = require("../models/todos");
class Todos {
  getAll(limit, offset) {
    return todosModel.get(+limit, +offset);
  }

  async getOne(id) {
    return todosModel.get(null, null, id)
  }

  create(createTodoDto) {
    return todosModel.create(createTodoDto)
  }

  async update(id, updateTodoDto) {
    return todosModel.update(id, updateTodoDto);
  }

  async remove(id) {
    return todosModel.remove(id);
  }
}

module.exports = Todos;
