const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    id: {type: ObjectId},
    title:{
        type: String, trim: true, default:"Unknown"
    },
    chapter_number:{type: Number},
    page:{type:Array, default:[]},
    date: {type: Number, default: Date.now()}
});
module.exports = mongoose.models.chapter || mongoose.model("chapter",schema);