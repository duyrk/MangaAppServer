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
  description: { type: String, trim: true },
});
module.exports =
  mongoose.models.character || mongoose.model("character", schema);
