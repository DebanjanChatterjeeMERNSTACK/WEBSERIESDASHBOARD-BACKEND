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
    const id = req.params["id"]


    const user = await Webseries.find({id:_id.toString()})
    res.send(user)

})



module.exports=route