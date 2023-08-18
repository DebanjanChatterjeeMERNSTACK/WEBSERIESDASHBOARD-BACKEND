const mongoose=require("mongoose")



const Commentschema =new mongoose.Schema({
  
    comment:{
        type :String
    }

})
const commentSchema=new mongoose.model("comment",Commentschema)
module.exports=commentSchema