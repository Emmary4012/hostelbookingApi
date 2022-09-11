import Rental from "../models/Rental.js";
import Room from "../models/Room.js";
import { createError } from "../Utils/error.js";


export const createRental = async (req,res)=>{
    const newRental = Rental(req.body);
    try {
        const savedRental = await newRental.save();
        res.status(200).json(savedRental);
    } catch (error) {
        next(createError(403, "Sorry, Rental creation failed. Please try again")); 
    }  
}

export const updateRental = async (req,res)=>{
    try {
        const updatedRental = await Rental.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedRental);
    } catch (err) {
        next(createError(403, "Sorry, Rental update failed. Please try again"));
    }
   
}

export const deleteRental = async (req,res)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Rental has been successfully deleted");
    } catch (err) {
        next(createError(403, "Sorry, Rental deletion failed. Please try again"));
    }
}

export const getRental = async (req,res,next)=>{
    try {
        const rental = await Rental.findById(req.params.id);
        res.status(200).json(rental);
    } catch (err) {
        console.log("first")
       // next(createError(403, "Sorry, couldn't get the requested Rental. Please try again")); 
    }   
}

export const getRentals = async (req,res,next)=>{ 
    const {min, max, ...others} = req.query;
    try {
        const rentals = await Rental.find({...others, cheapestPrice: {$gt:min|1,$lt:max||9999999}}).limit(req.query.limit);
        res.status(200).json(rentals)
    } catch (err) {
        next(createError(403, "Sorry, couldn't get the requested Rentals. Please try again"));
    }
}

export const getRentalRooms = async (req, res, next) => {
    try {
      const rental = await Rental.findById(req.params.id);
      
      const list = await Promise.all(
        rental.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };