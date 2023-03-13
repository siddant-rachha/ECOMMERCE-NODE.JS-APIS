const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bodyParser = require("body-parser");

//routes import
const userRoute = require("./routes/user.js")
const authRoute = require("./routes/auth.js")
const productRoute = require("./routes/product.js")


dotenv.config();

const jsonParser = bodyParser.json();

const app = express();

// routes
app.use("/api/auth", jsonParser, authRoute);
app.use("/api/users",jsonParser,userRoute);
app.use("/api/products",jsonParser,productRoute);


app.listen( process.env.PORT || 5000, ()=>{
    console.log("backend is running")
})




async function main() {
    await mongoose.connect(process.env.MONGODB_STRING);
    console.log("mongo connection successfull")
}
main().catch(err => console.log(err));
