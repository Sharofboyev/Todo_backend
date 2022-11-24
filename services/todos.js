const todosModel = require("../models/todos");
class Todos {
  getAll(limit, offset, userId, headerFilter, contentFilter) {
    return todosModel.get(+limit, +offset, userId, headerFilter, contentFilter);
  }

  async getOne(id, userId) {
    return todosModel.getOne(id, userId);
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
