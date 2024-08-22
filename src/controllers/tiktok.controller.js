// import Tiktok from "tiktokapi-src";
import Tiktok from "@tobyg74/tiktok-api-dl";


const tiktokVideos = async (req, res) => {
    try {
        const {url} = req.body;
        
        const result = await Tiktok.Downloader(url, {
          version: "v1" // version: "v1" | "v2" | "v3"
        });

        // Log the entire result to inspect its structure
        const resultData = JSON.stringify(result, null, 2);
        console.log("result Object", resultData);

        // Access the download URL directly from the result object
        if (result && result.result && result.result.video && Array.isArray(result.result.video.downloadAddr) && result.result.video.downloadAddr.length > 0) {
            const downloadUrl = result.result.video.downloadAddr[0];
            console.log("Download URL:", downloadUrl);
            res.status(200).json({
                status: 'success',
                downloadUrl: downloadUrl
            });
        } else {
            throw new Error("Download address not found in the response");
        }

    } catch (error) {
        console.error("Error fetching TikTok video data:", error.message);
        res.status(500).json({
            status: 'error',
            message: 'Failed to fetch TikTok data. Make sure your TikTok URL is correct and the API is working properly!'
        });
    }
};

export{tiktokVideos}
