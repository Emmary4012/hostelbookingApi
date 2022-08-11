import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import authRoute from  './routes/auth.js';
import hotelsRoute from  './routes/hotels.js';
import roomsRoute from  './routes/rooms.js';
import usersRoute from  './routes/users.js';
import cookieParser from "cookie-parser";
import hostelsRoute from "./routes/hostels.js";
// import path from 'path';
// import { fileURLToPath } from 'url';

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const paths = __dirname + "/api/client/build";
const app = express();
dotenv.config();
app.use(
  cors({
  origin:"*",
})
);

const connect = async () => {
    
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.")
  } catch (error) {
    throw error;
  }
};

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/hostels", hostelsRoute);
app.use("/api/rooms", roomsRoute);

// app.use(express.static(paths));
// app.get('/', (req,res,next)=> {
//    res.sendFile(paths + "/index.html");
//   res.send("From function");
//   console.log("From function");
// });

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  connect();
  console.log("server is running on port", server.address().port);
});

