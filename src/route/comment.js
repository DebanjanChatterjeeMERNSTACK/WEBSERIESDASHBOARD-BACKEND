const express = require("express")
const route = express.Router();
const Comment=require("../model/commentmodel")




route.post("/comment",async(req,res)=>{
 const  commentdata=req.body

    const comments=await Comment({comment:commentdata})
   comments.save()
   res.send({mess:"comment send"})


})

module.exports=route