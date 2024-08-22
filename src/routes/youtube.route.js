import express from "express";
import { fbVideos } from "../controllers/fb_video.controller.js";
import { instaVideos } from "../controllers/insta_video.controller.js";
import { tiktokVideos } from "../controllers/tiktok.controller.js";


const youtubeRouter = express.Router();

youtubeRouter.post("/download-fb-video", fbVideos)
youtubeRouter.post("/download-insta-video", instaVideos)
youtubeRouter.post("/download-tiktok-video", tiktokVideos)

export default youtubeRouter