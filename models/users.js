const mongoose = require("./index");

const CreateSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdTime: {
    type: Date,
    default: new Date(),
  },
});

const UserModel = mongoose.model("users", CreateSchema);

async function create(data) {
  const newUser = new UserModel(data);
  return await newUser.save();
}

function get(username, id) {
  let user;
  if (id) user = UserModel.findById(id);
  else user = UserModel.findOne({ username: username });
  return user;
}

function update(id, user) {
  return UserModel.updateOne({ _id: id }, user);
}

function remove(id) {
  return UserModel.deleteOne({ _id: id });
}

module.exports.create = create;
module.exports.get = get;
module.exports.update = update;
module.exports.remove = remove;
