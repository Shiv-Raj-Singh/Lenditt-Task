import express from 'express';
import dotenv from 'dotenv';
dotenv.config()
const app = express()
const PORT = process.env.PORT || 5000

app.use(express.json())

// Import MongoDb Database File
import './db_&_model/mongoDbCon.js'

// Routes Middleware 
import routes from './routes/routes.js'
app.use('/' , routes )

// Import  Error Handling Middleware
import globalError from './auth/globalError.js';
app.use(globalError)

// Start Server 
app.listen( PORT , ()=>{
    console.log('App is Running on PORT ' , PORT);
})