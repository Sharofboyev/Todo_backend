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
});

const FileModel = mongoose.model("files", CreateSchema);

async function create(data) {
  const newFile = new FileModel(data);
  return await newFile.save();
}

function get(id) {
  const file = FileModel.findById(id);
  return file;
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
