import mongoose from 'mongoose';
const HostelSchema = mongoose.Schema({
    name: { 
        type: String,
        required: true,
    },
    type: {
        type: String,
    },
    campus: {
        type: String,
    },
    village: {
        type: String,
    },
    address: {
        type: String,
    },
    phone: {
        type: String,
    },
    email: {
        type: String,
    },
    distance: {
        type: String
    },
    img: {
        type: [String]
   },
    title: {
        type: String
    },
    desc: {
        type: String
    },
    roomsdesc: {
        type: String
    },
    rating: {
        type: String,
        min:0,
        max:5
    },
    rooms: {
         type: [String] 
    },
    cheapestPrice: {
        type: Number
    },
    featured: {
        type: Boolean,
        default: false,
    },
});

export default mongoose.model("Hostel", HostelSchema)