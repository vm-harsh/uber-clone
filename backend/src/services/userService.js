const userModel = require('../models/userModel')

const createUser = async ({firstName, lastName, email, password}) => {
    if(!firstName || !email || !password){
        throw new Error("All fields are required");
    }

    const user = await userModel.create({
        fullName:{
            firstName:firstName,
            lastName: lastName
        },
        email,
        password
    })
    
    return user;
}


module.exports = createUser