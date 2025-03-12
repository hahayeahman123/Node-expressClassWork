const mongoose = require('mongoose');

const reviewModel = new mongoose.Schema({
    review: {
        type: String,
        required: [true, 'review cannot be empty'] 
    },
    rating: {
        type: Number,
        min: 1,
        max: 5,
        required: [true, 'a rating cannot be empty']
    },
    hotel:{
        type: mongoose.Schema.ObjectId,
        ref: 'Hotel',
        required: [true, 'you must select a hotel']   
    },
    createdAt:{
        type: Date,
        default: Date.now()
    }
})

reviewModel.pre(/^find/, function(next){
    this.populate({
        path: "hotel",
        select: "name"
    })
    next()
})

const Review = mongoose.model('Review', reviewModel);

module.exports = Review