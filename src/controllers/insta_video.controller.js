// import { scrapeUserPage } from "instagram-scraping";
import instagramDl from "@sasmeee/igdl";
import axios from "axios";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

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



const instaVideos = async (req, res) => {
    try {

        const{url} = req.body;

        if(!url){
            return res.status(400).json({
                message : "Url not found"
            })
        }

        const result = await instagramDl(url);

        console.log(result);

        if (!result) {
            return res.status(400).json({
                message: "Result not exits"
            })
        }


        const videoPath = path.join(__dirname, "../../videos", `${Date.now()}.mp4`)
        ensureDirectoryExistence(videoPath)

        const writer = fs.createWriteStream(videoPath)

        const response = await axios({
            url: url,
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
        console.log("Error in insta Videos", error)
    }
}

export { instaVideos }


