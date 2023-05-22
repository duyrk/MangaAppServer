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
    characters:{type:Array, default:[]},
    genres:{type: Array, default:[]},
    chapters:{type:Array, default:[]}
});
module.exports = mongoose.models.manga || mongoose.model("manga",schema);