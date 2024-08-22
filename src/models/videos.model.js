import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    url: String,

    title: String,

    downloadUrl: String,

    downloadPath: String,
    
    downloadAt: {
        type: Date,
        default: Date.now()
    }

}, {timestamps: true})

const Video = mongoose.model("Video", videoSchema)

export default Video