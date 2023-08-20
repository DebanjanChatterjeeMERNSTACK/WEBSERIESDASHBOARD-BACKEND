const express = require("express")
const route = express.Router();

const Webseries = require("../model/seriesmodel")




route.get("/seriesget", async (req, res) => {

    const read = await Webseries.find().sort({ _id: -1 })
    res.send(read)


})


route.get("/seriessearch/:id", async (req, res) => {
    const id = req.params["id"]


    const user = await Webseries.find({ $or: [{ name: { $regex: ".*" + id + ".*", $options: "i" } }, { title: { $regex: ".*" + id + ".*", $options: "i" } }] })
    res.send(user)

})

route.get("/seriesfilter/:id", async (req, res) => {
    const _id = req.params["id"]
    const users = await Webseries.find({_id:_id.toString()})
    if(users){
    const user = await Webseries.find({_id:_id.toString()})
    res.send(user)
    }
    else{
        res.send({mess:"send valid id"})
    }

})



module.exports=route