import express from "express";
import { createHostel, deleteHostel, getHostels, getHostel, updateHostel, countByType, getHostelRooms, countByCampuses } from "../controllers/hostel.js";
import { verifyAdmin } from "../Utils/verifyToken.js";
const hostelsRoute = express.Router();


//CREATE
hostelsRoute.post("/", createHostel);
// verifyAdmin,

//UPDATE
hostelsRoute.put("/:id" ,updateHostel);
//, verifyAdmin

//DELETE
hostelsRoute.delete("/:id", verifyAdmin,deleteHostel);

//GET
hostelsRoute.get("/find/:id", getHostel);

//GET ALL
hostelsRoute.get("/", getHostels);
hostelsRoute.get("/countByCampuses", countByCampuses);
hostelsRoute.get("/countByType", countByType);
hostelsRoute.get("/room/:id", getHostelRooms);

export default hostelsRoute;