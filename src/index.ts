import express from "express";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router/index";


dotenv.config();

const PORT = 4000;

const app = express();

app.use(cors());
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '30mb'}));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use("/api", router());

app.listen(PORT,()=>{
    console.log(`app listen on port ${PORT}`);
})

const MONGO_URL: any = process.env.MONGO_URL;

mongoose.connect(MONGO_URL).then(() => {
  console.log("Connected to MongoDB");
});

mongoose.connection.on("error", (error: Error) => console.log(error));

app.get('/', (req, res) => {
    res.send('FINAL-YEAR-APIS');
  });
  
  export default app;
