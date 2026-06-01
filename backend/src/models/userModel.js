const mongoose = require('mongoose');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minlength:[3, 'First name must be atleast 3 character long']
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
    socketId:{
        type:String,
        
    }   
},{timestamps:true})


userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id}, process.env.JWT_SECRET, {expiresIn:'24h'});
    return token;
}


userSchema.statics.hashPassword = async function(password) {
    return await bcrypt.hash(password, 10);
}

userSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password,this.password);
}


const userModel = mongoose.model('user', userSchema);

module.exports = userModel;