import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import {connectDB} from "./utils/db.js";
import authRouter from "./routes/auth-routes.js";
import taskRouter from "./routes/task-routes.js";
import errorMiddleware from "./middleware/error-middleware.js";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());


app.use("/api/auth", authRouter);
app.use("/api/task", taskRouter);


app.use(errorMiddleware) 

app.get("/", (req, res) => {
  res.send("Hello world");
});
connectDB().then(
  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  })
);
