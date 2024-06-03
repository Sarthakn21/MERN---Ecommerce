import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from 'dotenv';
import connectToDatabse from "./config/database.js";
import fileUpload from "express-fileupload";
import errorHandlerMiddleware from "./middlewares/error.js";
import userRouter from "./Routes/userRoute.js";

dotenv.config();
const app = express();
app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true,
    })
);
app.use(express.json());
app.use(cookieParser());


app.use('/api', userRouter)

app.use(express.static("public"));
connectToDatabse();
















app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
