import express from 'express'
import dotenv from 'dotenv'
import cors from "cors";
import cookieParser from "cookie-parser";
import admin from './route/AdminRoute.js';
import college from './route/collegeRoute.js';
import db from './db.js'
dotenv.config()

const app = express();
app.use(express.json())
const corsOptions = {
  origin : true,
  credentials : true
}
app.use(cors(corsOptions))
app.use(cookieParser())
const PORT = process.env.PORT || 3001;
db()
app.use("/api/admin",admin)
app.use("/api/college",college)

app.listen(process.env.PORT , ()=>{
  console.log(`runing on ${PORT}` )
})