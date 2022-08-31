import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/rentalRoom.js";
import { verifyAdmin } from "../Utils/verifyToken.js";
const rentalRoomsRoute = express.Router();

//CREATE
rentalRoomsRoute.post("/:rentalid", createRoom);
// verifyAdmin,

//UPDATE
rentalRoomsRoute.put("/:id", verifyAdmin ,updateRoom);
rentalRoomsRoute.put("/availability/:id",updateRoomAvailability);

//DELETE
rentalRoomsRoute.delete("/:id/:rentalid", verifyAdmin,deleteRoom);

//GET
rentalRoomsRoute.get("/:id", getRoom);

//GET ALL
rentalRoomsRoute.get("/", getRooms);

export default rentalRoomsRoute