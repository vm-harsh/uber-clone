const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/userRoutes')




const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());


app.use('/users', userRoute);


module.exports = app;