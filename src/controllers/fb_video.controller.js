import getFbVideoInfo from "fb-downloader-scrapper";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import axios from "axios";


// Convert __filename and __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Ensure directory exists
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  fs.mkdirSync(dirname, { recursive: true });
  return true;
}


const fbVideos = async (req, res) => {
    try {

        const{url} = req.body;

        if(!url){
            return res.status(400).json({
                message : "Url not found"
            })
        }
        
        const result = await getFbVideoInfo(url)

        if(!result){
            return res.status(400).json({
                message : "Result not exits"
            })
        }

        console.log(result)
        
        const videoUrl = result.hd || result.sd;

        if(!videoUrl){
            return res.status(400).json({
                message : "No download able video url is found"
            })
        }

        const videoPath = path.join(__dirname, "../../videos", `${Date.now()}.mp4`)
        ensureDirectoryExistence(videoPath)
        const writer = fs.createWriteStream(videoPath)

        const response = await axios({
            url: videoUrl,
            method: "GET",
            responseType: "stream",
        });

        response.data.pipe(writer);

        writer.on("finish", () => {
            return res.status(200).json({
                message: "Video downloaded successfully",
                videoPath,
            });
        });

        writer.on("error", (error) => {
            console.error("Error writing video file", error);
            return res.status(500).json({
                message: "Error downloading video",
                error: error.message,
            });
        });


    } catch (error) {
        console.log("Error in fb videos", error)
    }
}

export{fbVideos}