const expres=require("express")
const dbConnected = require("./config/db")
require("dotenv").config()
const app=expres()


dbConnected()

const PORT=process.env.PORT
app.listen(PORT,()=>{
  console.log(`server is running on ${PORT}`);
  
})