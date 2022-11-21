const todosModel = require("../models/todos");

class Todos {
  async getAll(limit, offset = 0) {}

  async getOne(id) {}

  async create(createTodoDto) {}

  async update(updateTodoDto) {}

  async remove(id) {}
}

module.exports = Todos;
