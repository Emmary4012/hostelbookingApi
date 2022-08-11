import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/room.js";
import { verifyAdmin } from "../Utils/verifyToken.js";
const roomsRoute = express.Router();

//CREATE
roomsRoute.post("/:hotelid", createRoom);
// verifyAdmin,

//UPDATE
roomsRoute.put("/:id", verifyAdmin ,updateRoom);
roomsRoute.put("/availability/:id",updateRoomAvailability);

//DELETE
roomsRoute.delete("/:id/:hotelid", verifyAdmin,deleteRoom);

//GET
roomsRoute.get("/:id", getRoom);

//GET ALL
roomsRoute.get("/", getRooms);

export default roomsRoute