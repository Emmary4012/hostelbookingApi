import mongoose from 'mongoose';
const RoomSchema = mongoose.Schema({
    title: {
        type: String,
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
    roomNumbers:[{number: String, unavailableDates: {type: [Date]}}],
},{timestamps: true});

export default mongoose.model("Room", RoomSchema)