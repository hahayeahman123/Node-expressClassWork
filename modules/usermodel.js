const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
//this will be having a validator and authentication


const userModel = new mongoose.Schema({
    name:{
        type: String,
        required: [true, 'user must have a name']
    },
    Email:{
        type: String,
        required: [true, 'user must have an Email'],
        unique:true,
        lowercase:true,
        validator:[validator.isEmail, 'not valid email']
    },
    photo:{
        type: String,
    },
    password:{
        type: String,
        required: [true, 'must have a password'],
        minlength: 8,
        select: false,
    },
    passwordConfirm:{
        type: String,
        required:[true, 'please confirm your password'],
        minlength: 8,
        validate:{
            validator: function(el){
                return el === this.password
            },
            message: 'password is not the same'
        },
        passwordChangedAt: Date,
        passwordResetToken: String,
        passwordResetExpires: Date,
        active:{
            type: Boolean,
            default: true,
            select: false
        }
    }
})


// this function calls the validator
userModel.pre('save', async function(next){
    if(!this.isModified('password')){
        return next()
    }
    // this 'hashes' or encrypts the password
    this.password = await bcrypt.hash(this.password, 12);
    // so that the DB doesnt have 2 passwords, less risk
    this.passwordConfirm = undefined;

})
// compares the 2 passwords we got to see if they are the same
userModel.methods.correctPassword = async(candidatePassword, userPassword)=>{
    return await bcrypt.compare(candidatePassword, userPassword);
}

userModel.methods.changedPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimeStamp = parseInt(this.passwordChangedAt.getTime()/1000.10);
        return JWTTimestamp < changedTimeStamp
    }


}

const User = mongoose.model('User', userModel);

module.exports = User