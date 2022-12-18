import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv'
import cors from "cors"
import userRoute from "./routes/user.js"
import { customerHeadRoute } from "./routes/CustomerHead.js";
import { AccountingEntriesRoutes } from "./routes/AccountingEntry.js";
import { DailyReportRouter } from "./routes/report.js";
import cookieParser from "cookie-parser";

// express app
const app = express();

// middleware
app.use(express.json());
app.use(cors({credentials: true, origin: 'http://localhost:3000'}));
app.use(cookieParser())
dotenv.config()

app.get('/',(req,res)=>{
  res.json("server start");
})

// routes
app.use("/api/auth", userRoute);
app.use("/api/customerhead", customerHeadRoute);
app.use("/api/accountingentry", AccountingEntriesRoutes);
app.use("/api/report", DailyReportRouter);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
