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

  async update(updateTodoDto) {}

  async remove(id) {}
}

module.exports = Todos;
