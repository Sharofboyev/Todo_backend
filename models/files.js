const mongoose = require("./index");
const { TodosModel } = require("./todos");

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

function get(userId, limit, offset, hasPath = false) {
  const files = FileModel.find(
    { userId: userId },
    hasPath ? { __v: 0, userId: 0 } : { __v: 0, userId: 0, path: 0 }
  );
  if (limit > 0) files = files.limit(limit);
  if (offset > 0) offset = files.skip(offset);
  return files;
}

async function remove(userId, fileId) {
  if (fileId) {
    const file = await FileModel.findOneAndDelete({ _id: fileId, userId });
    await TodosModel.updateMany(
      { files: { $elemMatch: { $eq: fileId } } },
      { $pull: { files: fileId } }
    );
    return file;
  } else return FileModel.deleteMany({ userId });
}

module.exports.create = create;
module.exports.getOne = getOne;
module.exports.remove = remove;
module.exports.get = get;
