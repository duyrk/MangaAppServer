const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
  id: { type: ObjectId },
  name: {
    type: String,
    trim: true,
    default: "Unknown",
  },
  author: { type: String, trim: true },
  status: { type: String, trim: true },
  language: { type: String, trim: true, default: "English" },
  cover: { type: String },
  banner: { type: String },
  description: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  uploader: { type: ObjectId, ref: "user" },
  character: [{ type: ObjectId, ref: "character" }],
  genre: [{ type: ObjectId, ref: "genre" }],
  chapter: [{ type: ObjectId, ref: "chapter" }],
  date: { type: Number, default: Date.now() },
});
module.exports = mongoose.models.comic || mongoose.model("comic", schema);
