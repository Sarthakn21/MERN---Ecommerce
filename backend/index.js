import dotenv from 'dotenv';
dotenv.config({ path: "backend/.env" });
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabse from "./config/database.js";
import errorHandlerMiddleware from "./middlewares/error.js";
import userRouter from "./Routes/userRoute.js";
import productRoute from "./Routes/productRoute.js";
import cartRoute from "./Routes/cartRoute.js"
import orderRoute from "./Routes/orderRoute.js"

const app = express();
const corsOptions = {
    origin: true,
    credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.use('/api/v1/users', userRouter)
app.use('/api/v1/product', productRoute)
app.use('/api/v1/cart', cartRoute)
app.use('/api/v1/order', orderRoute)

app.use(express.static("public"));
connectToDatabse();

app.use(errorHandlerMiddleware);
const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
