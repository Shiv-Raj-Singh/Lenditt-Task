
//  ********************************************   Create MongoDB Connection **************************************** //

import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config()

async function mongoDBConnection(){
    try {
        const dbCon = await mongoose.connect(process.env.MONGO_DB)
        console.log('MongoDB Database Connected');
    } catch (error) {
        console.log(error.message);         
    }
}

mongoDBConnection()