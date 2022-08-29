import express from "express";
import { createRoom, deleteRoom, getRoom, getRooms, updateRoom, updateRoomAvailability } from "../controllers/hostelRoom.js";
import { verifyAdmin } from "../Utils/verifyToken.js";
const hostelRoomsRoute = express.Router();

//CREATE
hostelRoomsRoute.post("/:hostelid", createRoom);
// verifyAdmin,

//UPDATE
hostelRoomsRoute.put("/:id", verifyAdmin ,updateRoom);
hostelRoomsRoute.put("/availability/:id",updateRoomAvailability);

//DELETE
hostelRoomsRoute.delete("/:id/:hostelid", verifyAdmin,deleteRoom);

//GET
hostelRoomsRoute.get("/:id", getRoom);

//GET ALL
hostelRoomsRoute.get("/", getRooms);

export default hostelRoomsRoute