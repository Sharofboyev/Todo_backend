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

  async update(id, updateTodoDto, userId) {
    return todosModel.update(id, updateTodoDto, userId);
  }

  async remove(id, userId) {
    return todosModel.remove(id, userId);
  }
}

module.exports = Todos;
