import dotenv from "dotenv";
import express from "express";
import cors from "cors";

dotenv.config();

import connectToDb from "./service/db.js";
import postRouter from "./routes/post.routes.js";

const app = express();
app.use(express.json());
const corsOptions = {
    "origin": process.env.FRONTEND_URL,
    "credentials": true,
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
    "preflightContinue": false,
    "optionsSuccessStatus": 204
};
app.use(cors(corsOptions));

await connectToDb();

app.use("/post", postRouter);

app.listen(process.env.PORT, () => {
  console.log(`😊 Server running on http://localhost:${process.env.PORT}/`);
});