const captainModel = require('../models/captainModel')


const createCaptain = async ({firstName, lastName, email, password, status,vehicle}) => {

    if(!firstName, !email, !password, !vehicle){
        throw new Error("All fields are required");
    }

    const captain = await captainModel.create({
        fullName:{
            firstName,
            lastName
        },
        email,
        password,
        status,
        vehicle
    })

    return captain;
}

module.exports = createCaptain