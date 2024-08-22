import express from "express";
import youtubeRouter from "./routes/youtube.route.js";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors ({
    origin : process.env.CORS_ORIGIN,
    credentials : true
}))

app.use(bodyParser.urlencoded({
    extended : true
}))

app.use(express.json())
app.use(cookieParser());

app.get('/', (req, res) => { 
    res.send('Hello, Azure! This is a Node.js application.'); 
  });

app.use("/api", youtubeRouter)

export{app}