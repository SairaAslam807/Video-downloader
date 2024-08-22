import connectDB from "./db/index.db.js";
import dotenv from 'dotenv';
import {app} from "./app2.js"

dotenv.config({
    path : './.env'
})

connectDB
.then(()=> {
    app.listen(`${process.env.PORT}` || 3001)
    console.log(`Server is running on PORT ${process.env.PORT}`)
})
.catch((error)=>{
    console.log("Error accour when server is runnning on PORT", error)
})