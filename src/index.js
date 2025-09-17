import connectDB from "./db/inde.js";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

connectDB();