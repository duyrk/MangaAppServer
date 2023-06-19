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
  language: { type: String, trim: true, default:"English" },
  cover: { type: String },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  uploader: { type: String },
  characters: [{ type: ObjectId, ref: "character" }],
  genres: [{ type: ObjectId, ref: "genre" }],
  chapters: [{ type: ObjectId, ref: "chapter" }],
  date: { type: Number, default: Date.now() },
});
module.exports = mongoose.models.comic || mongoose.model("comic", schema);
