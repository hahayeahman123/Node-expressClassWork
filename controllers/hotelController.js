const Hotel = require('./../modules/hotelmodel.js');
const APIFeatures = require('./../utilities/APItools.js');

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
        const hotelsData = new APIFeatures(Hotel.find(), req.query)
        .filter()
        .sort()
        .limitFields()
        .paginate()
        const hotels = await hotelsData.query;
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

exports.updateHotel = async (req, res)=>{
    try{
        const hotel = await Hotel.findByIdAndUpdate(req.params.id, req.body,{
            new: true,
            runValidators: true
        });
        res.status(200).json({
            status: "updated",
            data:{
                hotel
            }
        })
    }catch(err){
        res.status(404).json({
            status: "error",
            msg: err
        })
    }
}

exports.deleteHotel = async (req, res)=>{
    try{
        await Hotel.findByIdAndDelete(req.params.id);
        res.status(200).json({
            status: "deleted succesful",
            data:null
        })
    }catch(err){
        res.status(404).json({
            status: "error",
            msg: err
        })
    }
}