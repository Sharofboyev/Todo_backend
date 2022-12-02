const userModel = require("../models/users");
const { ObjectId } = require("mongoose").Types;
const File = require("./file");
const Todos = require("./todos");
const fs = require("fs");
const path = require("path");

const TodosService = new Todos();
const FileService = new File();

class User {
  /**
   * Registers new user to the database
   * @param {*} userDto data transfer object to create user (unique username and hashed password required)
   * @returns {Promise <ObjectId>} unique userId assigned to user in the database
   * @throws If username is duplicate, error with code field equal to 11000 will be returned
   */
  async create(userDto) {
    return (await userModel.create(userDto))._id;
  }

  /**
   * Returns user's information (unique id, hashed password, created time and username) if exists in the database
   * @param {string} userName unique username for searching user
   * @returns {Promise <*> | null} user's information or null if user with given username not exists
   */
  get(userName) {
    return userModel.get(userName);
  }

  /**
   * Updates user's information (now only password)
   * @param {ObjectId} userId unique user Id for filtering user
   * @param {*} updateUserDto Data transfer object to update user
   * @returns {Promise <{modifiedCount: number, matchedCount: number, acknowledged: boolean, upsertedId: *, upsertedCount: number}>} Information about updated user (modifiedCount, matchedCount, acknowledged, etc.)
   */
  update(userId, updateUserDto) {
    return userModel.update(userId, updateUserDto);
  }

  /**
   * Removes user's information from database, removes all todos and files he created
   * @param {ObjectId} userId unique user Id for filtering user
   * @returns {Promise <{acknowledged: boolean, deletedCount: number}>} Information about deleted user (acknowledged, deletedCount)
   */
  async delete(userId) {
    await TodosService.remove(userId);
    const files = await FileService.get(userId, null, null, true);
    FileService.remove(userId);
    for (let i = 0; i < files.length; i++) {
      fs.unlink(path.resolve(files[i].path), (err) => {
        if (err)
          console.log(
            `Error while deleting file ${path.resolve(
              files[i].path
            )}. Error message: ${err.message}`
          );
      });
    }
    return userModel.remove(userId);
  }
}

module.exports = User;
