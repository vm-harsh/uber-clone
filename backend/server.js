require('dotenv').config();
const http = require('http')
const mongoose = require('mongoose')
const app = require('./src/app')
const connectDB = require('./src/database/db');
const PORT = process.env.PORT || 5000;




// start server

const startServer = async () => {
    try {
        await connectDB();
    
        const server = http.createServer(app);
        server.listen(PORT, ()=>{
            console.log(`Server is listening on port : ${PORT}`);
        })

        server.on('error', (err) => {
            console.error('server error : ',err);
            process.exit(1);
        })

        process.on('SIGINT', async()=>{
            console.log('Shutting down...');

            await mongoose.connection.close();
            process.exit(0);
        })

        process.on('SIGTERM', async ()=> {
            console.log('Shutting down...');

            await mongoose.connection.close();
            process.exit(0);
        })

    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

startServer();