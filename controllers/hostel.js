import Hostel from "../models/Hostel.js";
import Room from "../models/Room.js";
import { createError } from "../Utils/error.js";


export const createHostel = async (req,res)=>{

    const newHotel = Hostel(req.body);

    try {
        const savedHostel = await newHostel.save();
        res.status(200).json(savedHostel);
    } catch (error) {
        // next(err); 
        console.log("Hostel creation failed");
    }
   
}

export const updateHostel = async (req,res)=>{

    try {
        const updatedHostel = await Hostel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedHostel);
    } catch (err) {
        next(err);
    }
   
}

export const deleteHostel = async (req,res)=>{

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hostel has been deleted");
    } catch (err) {
        next(err);
    }
   
}

export const getHostel = async (req,res,next)=>{

    try {
        const hostel = await Hostel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err); 
    }
   
}

export const getHostels = async (req,res,next)=>{
    const {min, max, ...others} = req.query;
    try {
        const hostels = await Hostel.find({...others, cheapestPrice: {$gt:min|1,$lt:max||999}}).limit(req.query.limit);
        res.status(200).json(hostels)
    } catch (err) {
        next(err);
    }
   
}

export const countByCity = async (req,res,next)=>{
   
    const cities = req.query.cities;
    if(cities){
        try {
            console.log(cities)
            const list = await Promise.all(cities.split(',').map(city=>{
                return Hotel.countDocuments({city:city})
            }))
            
            res.status(200).json(list)
        } catch (err) {
            next(err);
        }
    }else{
        console.log("error occurs")
    }
   
   
}

export const countByType = async (req,res,next)=>{
    try {
        const hostelCount = await Hotel.countDocuments({type: "hostel"});
        const apartmentCount = await Hotel.countDocuments({type: "apartment"});
        const resortCount = await  Hotel.countDocuments({type: "resort"});
        const villaCount = await Hotel.countDocuments({type: "villa"});
        const cabinCount = await Hotel.countDocuments({type: "cabin"});
        
        res.status(200).json([
            { type: "hostel", count: hostelCount},
            { type: "apartments", count: apartmentCount},
            { type: "resorts", count: resortCount},
            { type: "villas", count: villaCount},
            { type: "cabin", count: cabinCount},
        ]);
    } catch (err) {
        next(err);
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