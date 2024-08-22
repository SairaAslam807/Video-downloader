import mongoose from "mongoose";


const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}`)
        console.log("Database is connected")
    } catch (error) {
        console.log("Database is not connected")
        process.exit(1)
        
    }
}

export default connectDB()