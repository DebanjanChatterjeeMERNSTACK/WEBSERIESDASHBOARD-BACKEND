const mongoose=require("mongoose")



const Commentschema =new mongoose.Schema({
  
    id:{
        type:String
    },
    comment:{
        type :String
    }

})
const commentSchema=new mongoose.model("comment",Commentschema)
module.exports=commentSchema