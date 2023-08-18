const express = require("express")
const route = express.Router();
const Comment = require("../model/commentmodel")




route.get("/commentget", async (req, res) => {
    const comments = await Comment.find({})
    res.send(comments)
})


route.post("/commentdelete",async(req,res)=>{
    const {_id}=req.body 

     const commentdelete=await Comment.findOneAndDelete({_id:_id.toString()},{_id:_id.toString()})
     if(commentdelete){
        res.send({mess:"comment delete"})
     }
})

module.exports=route