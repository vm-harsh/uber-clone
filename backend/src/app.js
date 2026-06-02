const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoutes')
const captainRoute = require('./routes/captainRoutes')




const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/users', userRoute);
app.use('/captain', captainRoute)


module.exports = app;