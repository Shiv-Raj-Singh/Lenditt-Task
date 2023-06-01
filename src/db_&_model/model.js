import {model , Schema} from "mongoose";

const userContactSchema = new Schema({
    userId : {
        type : String , 
        unique : true
    },
    Contacts:[{
            name : {
                type : String ,  
                required : true ,                
            },
            phone : {
                type : String ,    
                required : true ,               
            }
    }]
}, {timestamps : true})

const contactModel = model('Contact' , userContactSchema)
export default contactModel