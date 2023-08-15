const express=require("express")
const app=express();
const cors=require("cors")
require("./db/connect")
const dotenv=require("dotenv")
dotenv.config()

const webseries =require("./route/seriesdashboard")
const commentdash=require("./route/commentdashboard")


const comment=require("./route/comment")
const series=require("./route/webseries")

app.use(express.json())
app.use(cors())

const PORT=process.env.PORT

app.use("/upload",express.static("src/upload"))
app.use("/uploadfile",express.static("src/uploadfile"))


app.use(commentdash)
app.use(webseries)


app.use(comment)
app.use(series)

app.listen(PORT,()=>{
  
    console.log("server connected")

})
