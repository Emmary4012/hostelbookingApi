import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/apartmentRoom.js";
import { verifyAdmin } from "../Utils/verifyToken.js";
const apartmentRoomsRoute = express.Router();

//CREATE
apartmentRoomsRoute.post("/:apartmentid", createRoom);
// verifyAdmin,

//UPDATE
apartmentRoomsRoute.put("/:id", verifyAdmin ,updateRoom);
apartmentRoomsRoute.put("/availability/:id",updateRoomAvailability);

//DELETE
apartmentRoomsRoute.delete("/:id/:apartmentid", verifyAdmin,deleteRoom);

//GET
apartmentRoomsRoute.get("/:id", getRoom);

//GET ALL
apartmentRoomsRoute.get("/", getRooms);

export default apartmentRoomsRoute