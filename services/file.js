const fileModel = require("../models/files");

class File {
  getOne(fileId, userId) {
    return fileModel.getOne(fileId, userId);
  }

  get(userId, limit, offset) {
    return fileModel.get(userId, +limit, +offset);
  }

  create(file) {
    return fileModel.create(file);
  }

  update(fileId, file, userId) {
    return fileModel.update(fileId, file, userId);
  }

  remove(fileId, userId) {
    return fileModel.remove(fileId, userId);
  }
}

module.exports = File;
