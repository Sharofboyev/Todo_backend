const todosModel = require("../models/todos");
class Todos {
  /**
   * Returns todos of user
   * @param {string?} limit Maximum amount of todos that will be returned
   * @param {string?} offset Amount of todos that will be skipped (useful for pagination)
   * @param {ObjectId} userId Todos will be filtered by createdUserId field to be equal to userId
   * @param {string?} headerFilter Todos which contains this substring in their header field will be returned
   * @param {string?} contentFilter Todos which contains this substring in their container field will be returned
   * @returns {Promise <Array>} Array of todos after filtering
   */
  getAll(limit, offset, userId, headerFilter, contentFilter) {
    return todosModel.get(+limit, +offset, userId, headerFilter, contentFilter);
  }

  /**
   * Returns one todo with given id, if it exists and if user matches to created user
   * @param {ObjectId} id unique id of todo object
   * @param {ObjectId} userId userId who's requesting for this operation. Operation will be done only if requesting user is the creator of todo
   * @returns {Promise <* | null>} JSON object which contains information about todo (header, content, files' information, time to be done)
   */
  async getOne(id, userId) {
    return todosModel.getOne(id, userId);
  }

  /**
   * Registers new todo to the database
   * @param {*} createTodoDto information about todo (header, content, fileIds, time)
   * @returns {Promise <*>} returns information about todo extended with unique id of todo
   */
  create(createTodoDto) {
    return todosModel.create(createTodoDto);
  }

  /**
   * Updates one todo
   * @param {ObjectId} id unique id of todo
   * @param {*} updateTodoDto updated fields of todo
   * @param {ObjectId} userId Id of user who's requesting for this operation (operation will be done only if requesting user is the creator of todo)
   * @returns {Promise <{modifiedCount: number, matchedCount: number, acknowledged: boolean, upsertedId: *, upsertedCount: number}>} Information about updated todo
   */
  async update(id, updateTodoDto, userId) {
    return todosModel.update(id, updateTodoDto, userId);
  }

  /**
   * Removes todo with given todoId or all todos if todoId is undefined
   * @param {ObjectId} userId Id of user who's requesting for this operation (operation will be done only if requesting user is the creator of todo)
   * @param {ObjectId | undefined} todoId unique id of todo
   * @returns {Promise <{acknowledged: boolean, deletedCount: number}>} Information about removed todo
   */
  async remove(userId, todoId) {
    return todosModel.remove(userId, todoId);
  }
}

module.exports = Todos;
