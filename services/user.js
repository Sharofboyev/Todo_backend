const userModel = require("../models/users");
const { ObjectId } = require("mongoose").Types;

class User {
  /**
   *
   * @param {string} username - unique username to recognize user
   * @param {string} password - password of user hashed with bcrypt
   * @returns {Promise <ObjectId>} userId in the database
   */
  async addUser(username, password) {
    const user = await userModel.create({ username, password });
    return user._id;
  }

  getUser(userName) {
    return userModel.get(userName);
  }

  async updatePassword(username, password) {}
}

module.exports = User;
