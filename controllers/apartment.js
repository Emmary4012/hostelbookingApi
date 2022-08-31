import Apartment from "../models/Apartment.js";
import Room from "../models/Room.js";
import { createError } from "../Utils/error.js";


export const createApartment = async (req,res)=>{
    const newApartment = Apartment(req.body);
    try {
        const savedApartment = await newApartment.save();
        res.status(200).json(savedApartment);
    } catch (error) {
        next(createError(403, "Sorry, Apartment creation failed. Please try again")); 
    }  
}

export const updateApartment = async (req,res)=>{
    try {
        const updatedApartment = await Apartment.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedApartment);
    } catch (err) {
        next(createError(403, "Sorry, Apartment update failed. Please try again"));
    }
   
}

export const deleteApartment = async (req,res)=>{
    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Apartment has been successfully deleted");
    } catch (err) {
        next(createError(403, "Sorry, Apartment deletion failed. Please try again"));
    }
}

export const getApartment = async (req,res,next)=>{
    try {
        const Apartment = await Apartment.findById(req.params.id);
        res.status(200).json(Apartment);
    } catch (err) {
        next(createError(403, "Sorry, couldn't get the requested Apartment. Please try again")); 
    }   
}

export const getApartments = async (req,res,next)=>{ 
    const {min, max, ...others} = req.query;
    try {
        const Apartments = await Apartment.find({...others, cheapestPrice: {$gt:min|1,$lt:max||9999999}}).limit(req.query.limit);
        res.status(200).json(Apartments)
    } catch (err) {
        next(createError(403, "Sorry, couldn't get the requested Apartments. Please try again"));
    }
}

export const countByCampuses = async (req,res,next)=>{
    const campuses = req.query.campuses;
    if(campuses){
        try {
            const list = await Promise.all(campuses.split(',').map(campus=>{
                return Apartment.countDocuments({campus:campus})
            }))
            res.status(200).json(list)
        } catch (err) {
            next(createError(403, "Sorry, couldn't count the Apartments by the different campuses. Please try again"));
        }
    }else{
        next(403, "Sorry, couldn't count the Apartments by the different campuses.");
    }  
}

export const countByType = async (req,res,next)=>{ 
    try {
        const hostelCount = await Hostel.countDocuments({type: "hostel"});
        const apartmentCount = await Apartment.countDocuments({type: "apartment"});
        const rentalCount = await  Apartment.countDocuments({type: "rental"});
        const hotelCount = await Apartment.countDocuments({type: "hotel"});
        const recreationCount = await Apartment.countDocuments({type: "recreation"});
        
        res.status(200).json([
            { type: "Hostel", count: hostelCount},
            { type: "apartments", count: apartmentCount},
            { type: "rentals", count: rentalCount},
            { type: "hotels", count: hotelCount},
            { type: "recreation centers", count: recreationCount},
        ]);
    } catch (err) {
        next(createError(403, "Sorry, couldn't count properties by type. Please try again"));
    }
}

export const getApartmentRooms = async (req, res, next) => {
    try {
      const Apartment = await Apartment.findById(req.params.id);
      const list = await Promise.all(
        Apartment.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };