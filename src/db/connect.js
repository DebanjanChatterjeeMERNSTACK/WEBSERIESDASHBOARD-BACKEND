const mongoose=require("mongoose")
const dotenv=require("dotenv")
dotenv.config()

 mongoose.set('strictQuery', false);
mongoose.connect(process.env.MONGODB)
.then(()=>
console.log("db connected")
).catch(err=>console.log(err))