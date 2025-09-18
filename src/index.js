import connectDB from "./db/inde.js";
import dotenv from "dotenv";
dotenv.config({
    path: "./.env"
});

connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running on port: ${process.env.PORT}`);
    });
})
.catch((err) => {
    console.log("MONGO DB coneection failed", err);
});