const express = require("express")
const route = express.Router();
const multer = require("multer")
const path = require("path")
const dotenv=require("dotenv")
dotenv.config()
const Webseries = require("../model/seriesmodel")
const fs = require("fs");
const { v4: uuid4 } = require("uuid")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        if (file.mimetype === 'image/jpeg'
            || file.mimetype === 'image/png') {
            cb(null, "src/upload");
        }
        else if (file.mimetype === 'application/x-zip-compressed' || file.mimetype === 'application/zip') {
            cb(null, 'src/uploadfile');
        }
    },
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${uuid4()}${path.extname(file.originalname)}`)
    },

})
const upload = multer({ storage: storage })





route.post("/post", upload.array("file", 10), async (req, res) => {

    const { id, name, title, rating, genre, language, quality } = req.body

    const file = req.files


    const image = file.filter((e, i) => {
        return e.mimetype === 'image/jpeg' || e.mimetype === 'image/png'
    }).map((eve) => {
        return `${process.env.LOCALURL}/upload/${eve.filename}`
    })

    const files = file.filter((eve) => {
        return eve.mimetype === 'application/x-zip-compressed' || eve.mimetype === 'application/zip'
    }).map((e) => {
        return `${process.env.LOCALURL}/uploadfile/${e.filename}`
    })


    if (files.length === 0 && image.length === 0 && image.length > 4) {
        res.send({ mess: "please save zip,jpeg,png" })
    } else {
        const webseries = await Webseries({ id: id, name: name, title: title, rating: rating, genre: genre, language: language, quality: quality, image: image, file: files })
        webseries.save()
        res.send({ mess: "series save" })
    }

})



route.get("/get", async (req, res) => {

    const read = await Webseries.find().sort({ _id: -1 })
    res.send(read)


})

route.get("/search/:id", async (req, res) => {
    const id = req.params["id"]


    const user = await Webseries.find({ $or: [{ name: { $regex: ".*" + id + ".*", $options: "i" } }, { title: { $regex: ".*" + id + ".*", $options: "i" } }] })
    res.send(user)

})




route.post("/delete", async (req, res) => {
    const { _id } = req.body

    const deel = await Webseries.findOneAndDelete({ _id: _id.toString() }, { _id: _id.toString() })
    if (deel) {

        const a = deel.file.map((e) => {
            return e.split("/")


        })
        fs.unlink(`src/uploadfile/${a[0][4]}`, (err) => {
            if(err) throw err
        })
        const b = deel.image.map((e, i) => {
            return e.split("/")

        })
        let c = []
        b.forEach((e) => {
            c.push(e[4])

        })
        for (const file of c) {
            fs.unlink(`src/upload/${file}`, (err) => {
                if (err) throw err
            })
        }
       
        res.send({ mess: "delete" })
    }
})






route.post("/edit",upload.array("file", 10),async(req,res)=>{


 const { id, name, title, rating, genre, language, quality } = req.body

 const file = req.files


 const image = file.filter((e, i) => {
     return e.mimetype === 'image/jpeg' || e.mimetype === 'image/png'
 }).map((eve) => {
     return `${process.env.LOCALURL}/upload/${eve.filename}`
 })

 const files = file.filter((eve) => {
     return eve.mimetype === 'application/x-zip-compressed' || eve.mimetype === 'application/zip'
 }).map((e) => {
     return `${process.env.LOCALURL}/uploadfile/${e.filename}`
 })


 if (files.length === 0 && image.length === 0 && image.length > 4) {
     res.send({ mess: "please save zip,jpeg,png" })
 } else {
     const deel = await Webseries.findOneAndUpdate({ id: id}, {name: name, title: title, rating: rating, genre: genre, language: language, quality: quality, image: image, file: files })
     if(deel){
       
        const a = deel.file.map((e) => {
            return e.split("/")


        })
        fs.unlink(`src/uploadfile/${a[0][4]}`, (err) => {
            if(err) throw err
        })
        const b = deel.image.map((e, i) => {
            return e.split("/")

        })
        let c = []
        b.forEach((e) => {
            c.push(e[4])

        })
        for (const file of c) {
            fs.unlink(`src/upload/${file}`, (err) => {
                if (err) throw err
            })
        }


     res.send({ mess: "update all data" })
     }
 }

})




module.exports = route