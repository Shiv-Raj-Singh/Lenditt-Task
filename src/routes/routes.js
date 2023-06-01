import {Router} from 'express';
import { createContact, findCommonUser, pagiNation } from '../controller/userController.js';
import { AppError } from '../auth/globalError.js';
const app = Router()
// REST APIs 
app.get('/', (req,res)=>{
    res.status(200).json({
        message : 'Sever is Running ' , status : true
    })
})

app.post('/create' , createContact)
app.get('/getCommonUser' , findCommonUser)
app.get('/getUsersByPage' , pagiNation)

app.all('/*' , (req,res,next)=>{
    next(new AppError(`URL  ${req.url} Not Found` , 404))
})

export default app