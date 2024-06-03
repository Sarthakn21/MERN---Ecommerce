import mongoose from "mongoose";
const connectToDatabase = () => {
    mongoose
        .connect(process.env.MONGO_URL)
        .then(() => {
            console.log("Connected to DB");
        })
        .catch((error) => {
            console.error("Error connecting to database:", error);
        });
};

export default connectToDatabase;
