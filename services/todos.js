const todosModel = require("../models/todos");
class Todos {
  getAll(limit, offset, userId) {
    return todosModel.get(+limit, +offset, userId);
  }

  async getOne(id) {
    return todosModel.getOne(id);
  }

  create(createTodoDto) {
    return todosModel.create(createTodoDto);
  }

  async update(id, updateTodoDto) {
    return todosModel.update(id, updateTodoDto);
  }

  async remove(id) {
    return todosModel.remove(id);
  }
}

module.exports = Todos;
