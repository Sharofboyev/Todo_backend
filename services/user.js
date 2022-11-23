const userModel = require("../models/users");
const { ObjectId } = require("mongoose").Types;

class User {
  /**
   *
   * @param {string} username - unique username to recognize user
   * @param {string} password - password of user hashed with bcrypt
   * @returns {Promise <ObjectId>} userId in the database
   */
  async create(user) {
    return (await userModel.create(user))._id;
  }

  get(userName) {
    return userModel.get(userName);
  }

  update(userId, user) {
    return userModel.update(userId, user);
  }

  delete(userId) {
    return userModel.remove(userId);
  }
}

module.exports = User;
