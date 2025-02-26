const Hotel = require('./../modules/hotelmodel.js');

/*exports.checkID = (req, res, next, value)=>{ // checks if the added id is valid
    if(req.params.id>hotels.length){
        return res.status(404).json({
            status: "failed",
            message: "invalid ID"
        })
    }
    next(); // if an incorrect ID is written, but then a correct one is written after it, this will allow it to do so, without this it will just keep loading and never ending.
}

exports.checkBody = (req, res, next)=>{ // checks if the user wrote all the needed body requirments
    if(!req.body.name || !req.body.address || !req.body.ranking || !res.body.room_price){
        return res.status(400).json({ // 400 means "bad request"
            status: "failed",
            messgage: "Misssing name or address, or ranking or room price"
        })
    }
    next();
}*/

exports.getAllHotels = async(req, res)=>{ // get all the hotels in the hotels.json
    try{
        const hotels = await Hotel.find();
        res.status(200).json({
            status: "success",
            results: hotels.length,
            data: {
                hotels
            }
        })
    }catch(err){
        res.status(404).json({
            status: "Failed",
            message: err
        })
    }
}

exports.getHotel = async(req,res)=>{
    try{
        const hotel = await Hotel.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data:{
                hotel
            }
        })
    }catch(err){
        res.status(404).json({
            status: "failed",
            message: err
        })
    }
}

exports.createHotel = async (req, res)=>{
    try{
        const newHotel= await Hotel.create(req.body);
        res.status(201).json({
            status: "success",
            data:   newHotel
        })
    }catch(err){
        res.status(400).json({
            status: "failed",
            message: err
        })
    }
}

exports.updateHotel = (req, res)=>{
    res.status(200).json({
        status: "success",
        data: {
            hotel: "Updated"
        }
    })
}

exports.deleteHotel = (req, res)=>{
    res.status(204).json({ // 204 means "no content", in this case it got deleted
        status: "success",
        data: null
    })
}