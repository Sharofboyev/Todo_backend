const mongoose = require("./index");

const CreateSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true,
  },
  mimetype: {
    type: String,
    required: true,
  },
  size: { type: Number, required: true },
  path: { type: String, required: true },
  createdTime: {
    type: Date,
    default: new Date(),
  },
  userId: { type: String, required: true },
});

const FileModel = mongoose.model("files", CreateSchema);

async function create(data) {
  const newFile = new FileModel(data);
  return await newFile.save();
}

function get(id) {
  return FileModel.findById(id);
}

function getAll(userId) {
  return FileModel.find({ userId: userId });
}

function update(id, file) {
  return FileModel.updateOne({ _id: id }, file);
}

function remove(id) {
  return FileModel.deleteOne({ _id: id });
}

module.exports.create = create;
module.exports.get = get;
module.exports.update = update;
module.exports.remove = remove;
module.exports.getAll = getAll;
