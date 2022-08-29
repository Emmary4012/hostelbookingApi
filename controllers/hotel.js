import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { createError } from "../Utils/error.js";


export const createHotel = async (req,res)=>{

    const newHotel = Hotel(req.body);
    
    try {
        const savedHotel = await newHotel.save();
        res.status(200).json(savedHotel); console.log("Hotel created");
    } catch (error) {
        // next(err); 
        console.log("Hotel creation failed");
    }
   
}

export const updateHotel = async (req,res)=>{

    try {
        const updatedHotel = await Hotel.findByIdAndUpdate(req.params.id, {$set: req.body}, {new:true})
        res.status(200).json(updatedHotel);
    } catch (err) {
        next(err);
    }
   
}

export const deleteHotel = async (req,res)=>{

    try {
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json("Hotel has been deleted");
    } catch (err) {
        next(err);
    }
   
}

export const getHotel = async (req,res,next)=>{

    try {
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json(hotel);
    } catch (err) {
        next(err); 
    }
   
}

export const getHotels = async (req,res,next)=>{
    const {min, max, ...others} = req.query;
    try {
        const hotels = await Hotel.find({...others, cheapestPrice: {$gt:min|1,$lt:max||999}}).limit(req.query.limit);
        res.status(200).json(hotels)
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
        const hotelCount = await Hotel.countDocuments({type: "hotel"});
        const apartmentCount = await Hotel.countDocuments({type: "apartment"});
        const resortCount = await  Hotel.countDocuments({type: "resort"});
        const villaCount = await Hotel.countDocuments({type: "villa"});
        const cabinCount = await Hotel.countDocuments({type: "cabin"});
        
        res.status(200).json([
            { type: "hotel", count: hotelCount},
            { type: "apartments", count: apartmentCount},
            { type: "resorts", count: resortCount},
            { type: "villas", count: villaCount},
            { type: "cabin", count: cabinCount},
        ]);
    } catch (err) {
        next(err);
    }
}

export const getHotelRooms = async (req, res, next) => {
    try {
      const hotel = await Hotel.findById(req.params.id);
      const list = await Promise.all(
        hotel.rooms.map((room) => {
          return Room.findById(room);
        })
      );
      res.status(200).json(list)
    } catch (err) {
      next(err);
    }
  };