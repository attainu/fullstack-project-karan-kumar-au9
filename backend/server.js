const app = require('./app')
const connectDatabase = require('./config/database')

const dotenv = require('dotenv');

//Handle the uncaught exceptions
process.on('uncaughtException', err =>{
    console.log('ERROR: $(err.message}');
    console.log('Shutting diwn server due to uncaught exceptions');
    process.exit(1)
})

//setting up config file
dotenv.config({path: 'backend/config/config.env'})


// Connecting to database
connectDatabase();

const server = app.listen(process.env.PORT, () => {
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})

//Handaled unhandled Promise
process.on('unhandledRejection', err =>{
    console.log('ERROR: ${err.message)');
    console.log('Shutting due to unhandled promise rejection');
    server.close(() =>{
        process.exit(1)
    })
})