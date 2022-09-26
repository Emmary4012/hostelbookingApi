import Apartment from "../models/Apartment.js";
import ApartmentRoom from "../models/ApartmentRooms.js";
import { createError } from "../Utils/error.js";

export const createRoom = async (req,res,next)=>{

    const apartmentId = req.params['propertyId'];    
    const newRoom = new ApartmentRoom(req.body);
  
    try {
        const savedRoom = await newRoom.save();
        try {
            await Apartment.findByIdAndUpdate(apartmentId, {
                $push: {rooms: savedRoom._id},
            })
        } catch (err) {
            next(createError(403, "Sorry, couldn't push the room. Please try again")); 
        }
        res.status(200).json(savedRoom);
    } catch (error) {
        next(createError(403, "Sorry, room creation failed. Please try again")); 
    }
   
}


export const updateRoom = async (req,res)=>{

    try {
        const updatedRoom = await ApartmentRoom.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedRoom);
    } catch (err) {
        next(createError(403, "Sorry, couln't update the room. Please try again")); 
    }
   
}

export const updateRoomAvailability = async (req, res, next) => { 
    try {
      await ApartmentRoom.updateOne(
        { "roomNumbers._id": req.params.id },
        {
          $push: {
            "roomNumbers.$.unavailableDates": req.body.dates
          },
        }
      );
      res.status(200).json("Room status has been updated.");
    } catch (err) {
      next(createError(403, "Sorry, room status has not been updated. Please try again."));
    }
  };

export const deleteRoom = async (req,res,next)=>{
    const ApartmentId = req.params.Apartmentid; 
    try {
        await ApartmentRoom.findByIdAndDelete(req.params.id);

        try {
            await Apartment.findByIdAndUpdate(ApartmentId, {
                $pull: {rooms: req.params.id},
            });
        } catch (err) {
            next(createError(403,"Couldn't find the Apartment. Please try again."))
        }

        res.status(200).json("Room was successfully deleted");
    } catch (err) {
        next(createError(403,"Couldn't find the Apartment. Please try again."))
    }
   
}

export const getRoom = async (req,res)=>{

    try {
        const room = await Apartment.findById(req.params.id);
        res.status(200).json(room);
    } catch (err) {
        next(createError(403,"Sorry, could't get the room. Please try again inorder to get the Room"));
    }
   
}

export const getRooms = async (req,res,next)=>{
    
    try {
        const rooms = await ApartmentRoom.find()
        res.status(200).json(rooms)
    } catch (err) {
        next(createError(403,"Sorry, could't get the rooms. Please try again inorder to get the rooms"));
    }
   
}