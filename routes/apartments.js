import express from "express";
import { createApartment, deleteApartment, getApartments, getApartment, updateApartment, countByType, getApartmentRooms, countByCampuses } from "../controllers/apartment.js";
import { verifyAdmin } from "../Utils/verifyToken.js";
const apartmentsRoute = express.Router();


//CREATE
apartmentsRoute.post("/", createApartment);
// verifyAdmin,

//UPDATE
apartmentsRoute.put("/:id", verifyAdmin ,updateApartment);

//DELETE
apartmentsRoute.delete("/:id", verifyAdmin,deleteApartment);

//GET
apartmentsRoute.get("/find/:id", getApartment);

//GET ALL
apartmentsRoute.get("/", getApartments);
apartmentsRoute.get("/countByCampuses", countByCampuses);
apartmentsRoute.get("/countByType", countByType);
apartmentsRoute.get("/room/:id", getApartmentRooms);

export default apartmentsRoute;