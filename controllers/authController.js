const User = require('./../modules/usermodel.js');
const jwt = require('jsonwebtoken');
const {promisify} = require('util');


const signToken = (id)=>{
    return jwt.sign({id: id}, process.env.JWT_SECRET, {expiresIn: process.env.JWT_EXPIRES_IN})
}


// sign up, the creation of a user and their token
exports.signup = async(req,res)=>{
    try{
        const newUser = await User.create({ // create user
            name: req.body.name,
            Email: req.body.Email,
            password: req.body.password,
            passwordConfirm: req.body.passwordConfirm
        })   
    
        const token = jwt.sign( // Create user token
            {id:newUser._id},
            process.env.JWT_SECRET,
            {expiresIn: process.env.JWT_EXPIRES_IN}
        )
    
        res.status(201).json({
            status: 'success',
            data: newUser,
            token
        })
    }catch(err){
        res.status(400).json({
            status: 'failed',
            msg: err.message    
        })
    }
}

exports.login = async (req,res)=>{
    try{
        const [Email, password] = req.body
         // check email and password
        if(!Email || !password){
            throw new Error('please provide Email or password');
        }   
        // check if user exists and password correct
        const user = await User.findOne({email}.select('+password'));

        if(!user || !(await user.correctPassword(password, user.password))){
            throw new Error('incorrect Email or password');
        }
        // generate token
        const token = signToken(user._id);

        // give users data and their token
        res.status(201).json({
            data:{
                id: user._id,
                name: user.name,
                email: user.Email,
            },
            token
        })

    }catch(err){
        res.status(400).json({
            status: "failed",
            msg: err.message
        })
    }
}

exports.protect = async (req,res,next)=>{
    try{
        // get token
        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token){
            throw new Error('User not Authenticated')
        }
        // get user id
        const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

        // check if user exists in DB
        const currentUser = await User.findById(decoded.id);
            if(!currentUser){
                throw new Error('User not found')
            }

        // check if User has changed password

        if(currentUser.changedPasswordAfter(decoded.iat)){
            throw new Error('User changed their password, please log in again');
        }

        // grant access
        req.user = currentUser;

        next();

    }catch(err){
        res.status(400).json({
            status: 'failed',
            msg: err.message
        })
    }

}