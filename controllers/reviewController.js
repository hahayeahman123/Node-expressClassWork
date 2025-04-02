const Review = require('./../modules/reviewmodel.js');

exports.getAllReviews = async (req, res)=>{
    try{
        let filter = {};
        if(req.params.hotelId){
            filter = {hotel: req.params.hotelId};
        }
        const reviews = await Review.find(filter);

        res.status(200).json({
            status: "success",
            results: reviews.length,
            data: {
                reviews
            }
        })
    }catch(err){
        res.status(404).json({
            status: "failed",
            msg: err.message
        })
    }
}

exports.createReview = async (req, res)=>{
    try{
        if(!req.body.hotel) req.body.hotel = req.params.hotelId;
        const newReview = await Review.create(req.body);
        res.status(200).json({
            status: "success",
            message: "New review created",
            data:{
                newReview
            }
        })
    }catch(err){
        res.status(404).json({
            status: "failed",
            msg: err.message
        })
    }
}