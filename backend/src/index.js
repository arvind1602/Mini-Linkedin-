import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/connection.db.js";
import app from "./app.js";

connectDB()
  .then(() => {
    console.log("mongodb connected successfully");
    app.listen(process.env.PORT , () => {console.log("server is running on port ," , process.env.PORT);
    })
  })
  .catch((err) => {
    console.log("MONGO db connection failed !!! ", err);
  });
