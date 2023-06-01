
// Error Handling Middleware 

const errorTypes = {
    'string.pattern.base' : ` Should be Valid !` , 
    "string.min" : " number digits must be 10",
    "string.max" : " number digits must be 10"
}

export default function globalError(err,req,res,next){
    err.statusCode = err.statusCode || 500
    err.message = err.message || 'Internal Server Error'

    //  For Valid fields 
    if(err.isJoi == true){
        err.statusCode = 400
        err.message = err.message
        
        const [details] = err.details
        const fieldName = details.path[details.path.length - 1]

        if(errorTypes[details.type]){
            err.message =  fieldName + errorTypes[details.type]
        }
    } 
    
    // For Unique Field
    if(err.code == 11000){
        err.statusCode = 400
        const values = Object.keys(err.keyValue)
        err.message = `Duplicate Key Error For ${values[0]} !`  
    }


    res.status(err.statusCode).json({
        status : false , 
        message : err.message
    })
}

// Create a class for Errors 
export class AppError extends Error{
    constructor(message , statusCode){
        super(message)
        this.message = message
        this.statusCode = statusCode 
        this.status = false
    }
}