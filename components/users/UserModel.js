const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const schema = new Schema({
    id: {type: ObjectId},
    user_name:{
        type: String, trim: true, default:"Unknown", required: true
    },
    password:{
        type: String, required: true
    },
    email:{type: String, trim: true},
    nickname:{type:String, trim:true},
    bio:{type:String, trim:true},
    date_of_birth:{type:Number},
    favourite:{type:Array, default:[]},

});
module.exports = mongoose.models.user || mongoose.model("user",schema);