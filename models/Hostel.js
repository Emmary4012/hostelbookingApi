import mongoose from 'mongoose';
const HostelSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    campus: {
        type: String,
        required: true,
    },
    village: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
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