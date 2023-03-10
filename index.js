const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const userRoute = require("./routes/user.js")


dotenv.config();


const app = express();
app.use("/",userRoute);
app.listen( process.env.PORT || 5000, ()=>{
    console.log("backend is running")
})



async function main() {
    await mongoose.connect(process.env.MONGODB_STRING);
    console.log("mongo connection successfull")
}
main().catch(err => console.log(err));
