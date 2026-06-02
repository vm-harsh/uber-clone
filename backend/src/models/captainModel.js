const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const captainSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3,'First name must be atleast 3 character long']
        },
        lastName:{
            type:String,
            minlength:[2,'Last name must be atleast 2 character long']
        }
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        select:false
    },
    socketId:String,
    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'
    },
    location:{
        lat: Number,
        lon: Number
    },
    vehicle:{
        color:{
            type:String,
            required:true
        },
        plate:{
            type:String,
            required:true,
            minlength:[3, 'Plate must be atleast 3 character long'],
        },
        capacity:{
            type:Number,
            required:true,
            min:[1, 'Capacity must be at least 1']
        },
        vehicleType:{
            type:String,
            enum:['car','bike','auto'],
            required:true
        }
    }
},{timestamps:true})



captainSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id:this._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
    return token;
}

captainSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

captainSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const captainModel = mongoose.model('captain',captainSchema);

module.exports = captainModel;