const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
  id: { type: ObjectId },
  name: {
    type: String,
    trim: true,
    required: true,
  },
  description: { type: String, required: true },
  member: [{ type: ObjectId, ref: "user" }],
  manga: [{ type: ObjectId, ref: "manga" }],
});
module.exports = mongoose.models.team || mongoose.model("team", schema);
