const fileModel = require("../models/files");

class File {
  /**
   * Returns full file information that's kept in database
   * @param {ObjectId} fileId Unique file id that's used in MongoDB database
   * @param {ObjectId} userId Id of user that added the file (if created user id of file will not match to this, null will be returned)
   * @returns {Promise <*>} JSON object which contains information about file (size, name, path, mimetype, userId, createdTime, file id)
   */
  getOne(fileId, userId) {
    return fileModel.getOne(fileId, userId);
  }

  /**
   * Function for getting all files' information of specific user with limit and offset features
   * @param {ObjectId} userId Id of user that's requesting for his files
   * @param {string?} limit Maximum number of files' information that will be returned
   * @param {string?} offset Amount of files which will be skipped before returning
   * @returns {Promise <Array>} Array of files' information (file Id, name, mimetype, size, createdTime)
   */
  get(userId, limit, offset, hasPath) {
    return fileModel.get(userId, +limit, +offset, hasPath);
  }

  /**
   * Function for registering new file in database
   * @param {*} fileDto file information (size, name, mimetype, userId, path)
   * @returns {Promise<*>} Full file information will be returned (the same file information in file parameter extended by created time and file id)
   */
  create(fileDto) {
    return fileModel.create(fileDto);
  }

  /**
   * Removes file information from database only if userId matches to the file's createdUserId and returns file information for removing it from disc
   * @param {ObjectId} userId Id of user that's trying to remove the file
   * @param {ObjectId | undefined} fileId Unique file id. If undefined, all files which created by user will be deleted
   * @returns {Promise <*>} Information about removed file (path, id, name, size and etc.) or null if file not exists
   */
  remove(userId, fileId) {
    return fileModel.remove(userId, fileId);
  }
}

module.exports = File;
