const fileModel = require("../models/files");

class File {
  getFile(fileId) {
    return fileModel.get(fileId);
  }

  create(file) {
    return fileModel.create(file);
  }

  updateFile(fileId, file) {
    return fileModel.update(fileId, file);
  }

  removeFile(fileId) {
    return fileModel.remove(fileId);
  }
}

module.exports = File;
