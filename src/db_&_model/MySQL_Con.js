import dotenv from 'dotenv';
dotenv.config()
import mysql2 from 'mysql2';

// Create MySQL Database Connection 
function createMySQL_DB(){
    try {
        const pool = mysql2.createPool({
            host : process.env.HOST,
            user : process.env.USER,
            password : process.env.PASSWORD,
            connectionLimit : process.env.CN_LIMIT
        })   
        const db = pool.promise()
        return db
    } catch (error) {
        console.log(error.message);
    }
} 

const db = createMySQL_DB()
const query = "SHOW DATABASES"

db.execute(query).then(v=>console.log(v[0]))
.catch(err => console.log(err.message))

export default db