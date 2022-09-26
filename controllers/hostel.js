import Hostel from "../models/Hostel.js";
import Room from "../models/Room.js";
import { createError } from "../Utils/error.js";


export const createHostel = async (req,res)=>{
    const newHostel = Hostel(req.body);
    try {console.log(newHostel)
        const savedHostel = await newHostel.save();
        res.status(200).json(savedHostel);
    } catch (error) {
        console.log( "Sorry, hostel creation failed. Please try again"); 
    }  
}

export const updateHostel = async (req,res)=>{console.log("reached")
    try {
        const updatedHostel = await Hostel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedHostel);
    } catch (err) {
        console.log("Sorry, hostel update failed. Please try again");
        //next(createError(403, "Sorry, hostel update failed. Please try again"));
    }
   
}

export const deleteHostel = async (req,res)=>{
    try {
        await Hostel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hostel has been successfully deleted");
    } catch (err) {
        next(createError(403, "Sorry, hostel deletion failed. Please try again"));
    }
}

export const getHostel = async (req,res,next)=>{
    try {
        const hostel = await Hostel.findById(req.params.id);
        res.status(200).json(hostel);
    } catch (err) {
        next(createError(403, "Sorry, couldn't get the requested hostel. Please try again")); 
    }   
}

export const getHostels = async (req,res,next)=>{ 
    const {min, max, ...others} = req.query;
    try {
        const hostels = await Hostel.find({...others, cheapestPrice: {$gt:min|1,$lt:max||9999999}}).limit(req.query.limit);
        res.status(200).json(hostels)
    } catch (err) {
        next(createError(403, "Sorry, couldn't get the requested hostels. Please try again"));
    }
}

export const countByCampuses = async (req,res,next)=>{
    const campuses = req.query.campuses;
    if(campuses){
        try {
            const list = await Promise.all(campuses.split(',').map(campus=>{
                return Hostel.countDocuments({campus:campus})
            }))
            res.status(200).json(list)
        } catch (err) {
            next(createError(403, "Sorry, couldn't count the hostels by the different campuses. Please try again"));
        }
    }else{
        next(403, "Sorry, couldn't count the hostels by the different campuses.");
    }  
}

export const countByType = async (req,res,next)=>{ 
    try {
        const hostelCount = await Hostel.countDocuments({type: "Hostel"});
        const apartmentCount = await Hostel.countDocuments({type: "Apartment"});
        const rentalCount = await  Hostel.countDocuments({type: "Rental"});
        const hotelCount = await Hostel.countDocuments({type: "Hotel"});
        const recreationCount = await Hostel.countDocuments({type: "Recreation"});
        
        res.status(200).json([
            { type: "Hostels", count: hostelCount},
            { type: "Apartments", count: apartmentCount},
            { type: "Rentals", count: rentalCount},
            { type: "Hotels", count: hotelCount},
            { type: "Recreation Centers", count: recreationCount},
        ]);
    } catch (err) {
        next(createError(403, "Sorry, couldn't count properties by type. Please try again"));
    }
}

export const getHostelRooms = async (req, res, next) => {
    try {
      const hostel = await Hostel.findById(req.params.id);
      const list = await Promise.all(
        hostel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };