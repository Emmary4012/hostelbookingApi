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
import rentalsRoute from "./routes/rentals.js";
import apartmentsRoute from "./routes/apartments.js";
import hostelRoomsRoute from "./routes/hostelRooms.js";
import rentalRoomsRoute from "./routes/rentalRooms.js";
import apartmentRoomsRoute from "./routes/apartmentRooms.js";

const app = express();
dotenv.config();

const connect = async () => {    
try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to mongoDB.")
  } catch (error) {
    throw error;
  }
};

app.use(cors({origin:"https://hostel-booking-admin.netlify.app",}));
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/hostels", hostelsRoute);
app.use("/api/rentals", rentalsRoute);
app.use("/api/apartments", apartmentsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/hostelsrooms", hostelRoomsRoute);
app.use("/api/rentalsrooms", rentalRoomsRoute);
app.use("/api/apartmentsrooms", apartmentRoomsRoute);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  connect();
  console.log("server is running on port", server.address().port);
});

