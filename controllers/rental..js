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
        const Rental = await Rental.findById(req.params.id);
        res.status(200).json(Rental);
    } catch (err) {
        next(createError(403, "Sorry, couldn't get the requested Rental. Please try again")); 
    }   
}

export const getRentals = async (req,res,next)=>{ 
    const {min, max, ...others} = req.query;
    try {
        const Rentals = await Rental.find({...others, cheapestPrice: {$gt:min|1,$lt:max||9999999}}).limit(req.query.limit);
        res.status(200).json(Rentals)
    } catch (err) {
        next(createError(403, "Sorry, couldn't get the requested Rentals. Please try again"));
    }
}

export const countByCampuses = async (req,res,next)=>{
    const campuses = req.query.campuses;
    if(campuses){
        try {
            const list = await Promise.all(campuses.split(',').map(campus=>{
                return Rental.countDocuments({campus:campus})
            }))
            res.status(200).json(list)
        } catch (err) {
            next(createError(403, "Sorry, couldn't count the Rentals by the different campuses. Please try again"));
        }
    }else{
        next(403, "Sorry, couldn't count the Rentals by the different campuses.");
    }  
}

export const countByType = async (req,res,next)=>{ 
    try {
        const HostelCount = await Rental.countDocuments({type: "Hostel"});
        const RentalCount = await Rental.countDocuments({type: "Rental"});
        const rentalCount = await  Rental.countDocuments({type: "rental"});
        const hotelCount = await Rental.countDocuments({type: "hotel"});
        const recreationCount = await Rental.countDocuments({type: "recreation"});
        
        res.status(200).json([
            { type: "Hostels", count: HostelCount},
            { type: "Rentals", count: RentalCount},
            { type: "rentals", count: rentalCount},
            { type: "hotels", count: hotelCount},
            { type: "recreation centers", count: recreationCount},
        ]);
    } catch (err) {
        next(createError(403, "Sorry, couldn't count properties by type. Please try again"));
    }
}

export const getRentalRooms = async (req, res, next) => {
    try {
      const Rental = await Rental.findById(req.params.id);
      const list = await Promise.all(
        Rental.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };