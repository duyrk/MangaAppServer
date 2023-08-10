const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
  id: { type: ObjectId },
  user_name: {
    type: String,
    trim: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  email: { type: String, trim: true, required: true },
  nickname: { type: String, trim: true, default: "" },
  bio: { type: String, trim: true, default: "Hi, i'm new let's get along!" },
  date_of_birth: { type: Number, default: Date.now() },
  favourite: [{ type: ObjectId, ref: "comic" }],
  role: { type: Number, default: 0 },
});
module.exports = mongoose.models.user || mongoose.model("user", schema);
