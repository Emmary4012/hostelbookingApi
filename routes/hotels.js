import express from "express";
import { createHotel, deleteHotel, getHotels, getHotel, updateHotel, countByCity, countByType, getHotelRooms } from "../controllers/hotel.js";
import { verifyAdmin } from "../Utils/verifyToken.js";
const hotelsRoute = express.Router();


//CREATE
hotelsRoute.post("/", createHotel);
// verifyAdmin,

//UPDATE
hotelsRoute.put("/:id" ,updateHotel);
// , verifyAdmin

//DELETE
hotelsRoute.delete("/:id", verifyAdmin,deleteHotel);

//GET
hotelsRoute.get("/find/:id", getHotel);

//GET ALL
hotelsRoute.get("/", getHotels);
hotelsRoute.get("/countByCity", countByCity);
hotelsRoute.get("/countByType", countByType);
hotelsRoute.get("/room/:id", getHotelRooms);

export default hotelsRoute;