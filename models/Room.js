import mongoose from 'mongoose';
const RoomSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
    },
    maxPeople: {
        type: String,
    },
    desc: {
        type: String,
    },
    roomNumbers:[{number: Number, unavailableDates: {type: [Date]}}],
},{timestamps: true});

export default mongoose.model("Room", RoomSchema)