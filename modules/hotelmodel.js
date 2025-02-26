const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'you forgot to write the name'],
        unique: true
    },
    address: {
        type: String,
        required: [true, 'you forgot to write the address'],
        unique: true
    },
    rankingAverage: {
        type: Number,
        default: 4.5,
        min: [1, 'ranking must be above 1'],
        max: [5, 'ranking cant be above 5'],
    },
    roomPrice: {
        type: Number,
        required: [true, 'You forgot to write the room price'],
    },
    priceDiscount: {
        type: Number,
    },
    comfort: {
        type: String,
        required: [true, 'you forgot to write the comfort/star level'],
        enum: {
            values: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"]
        }
    },
    summary: {
        type: String,
        trim: true,
        required: [true, 'you forgot to write the summary!!']
    },
    imageCover: {
        type: String,
        required: [true, 'you forgot to add the cover image!!']
    },
    createAt: {
        type: Date,
        default: Date.now(),
        select: false
    }
})

const Hotel = mongoose.model('Hotel', hotelSchema);

module.exports = Hotel;