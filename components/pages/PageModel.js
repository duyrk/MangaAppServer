const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
  id: { type: ObjectId },
  url: {
    type: String,
    trim: true,
  },
});
module.exports = mongoose.models.page || mongoose.model("page", schema);
