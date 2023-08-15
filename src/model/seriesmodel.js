const mongoose=require("mongoose")



const Seriesschema =new mongoose.Schema({
  
    id:{
        type:String
    },
    name:{
        type :String
    },
    title:{
        type:String
    },
    language:{
        type:String
    },
    rating:{
        type:Number
    },
    genre:{
        type:String
    },
    quality:{
        type:String
    },
    file:[],
    
    image:[]

})
const seriesSchema=new mongoose.model("webseries",Seriesschema)
module.exports=seriesSchema