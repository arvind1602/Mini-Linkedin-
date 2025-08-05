import express from "express";
import cors from "cors"

const app = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))



//router import 
import userrouter from "./routers/User.route.js"
import postrouter from "./routers/Post.route.js"

app.use("/api/users",userrouter);
app.use("/api/posts" , postrouter)

export default app;
