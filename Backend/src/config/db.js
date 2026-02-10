const mongoose=require("mongoose")



const dbConnected=()=>{
  try {
    mongoose.connect(process.env.MONGODB_URI).then(()=>console.log("Db is connected")
    ).catch((error)=>console.log(error.message))
  } catch (error) {
    console.log(error.message);
    process.exit(1)
  }
}

module.exports=dbConnected