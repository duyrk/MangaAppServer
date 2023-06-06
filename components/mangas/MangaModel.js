const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    id: {type: ObjectId},
    name:{
        type: String, trim: true, default:"Unknown"
    },
    author:{type: String, trim: true},
    status:{type:String, trim:true},
    language:{type:String, trim:true},
    cover:{type:String},
    views:{type: Number},
    likes:{type:Number},
    uploader:{type:String},
    characters:[{type: ObjectId, ref:'character'}],
    genres:[{type: ObjectId, ref:'genre'}],
    chapters:[{type: ObjectId, ref:'chapter'}],
    date:{type: String}
});
module.exports = mongoose.models.manga || mongoose.model("manga",schema);