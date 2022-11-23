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

function getOne(id, userId) {
  return FileModel.findOne({ _id: id, userId });
}

function get(userId) {
  return FileModel.find({ userId: userId });
}

function update(id, file, userId) {
  return FileModel.updateOne({ _id: id, userId }, file);
}

function remove(id, userId) {
  return FileModel.findOneAndDelete({ _id: id, userId });
}

module.exports.create = create;
module.exports.getOne = getOne;
module.exports.update = update;
module.exports.remove = remove;
module.exports.get = get;
