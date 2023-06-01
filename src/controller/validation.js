import joi from "joi";

 const validData = joi.object({
    userId : joi.number().required(), 
    Contacts : joi.array().items(joi.object({
        name: joi.string().required().trim().regex(/^[a-zA-Z(/ )]*$/).min(3).max(25),
        phone: joi.string().required().trim().min(10).max(10).regex(/^[6-9]{1}[0-9]{9}$/),
    }))
})
export default validData 


export const validNumber = joi.object({
    searchNumber: joi.string().required().trim().min(10).max(10).regex(/^[6-9]{1}[0-9]{9}$/),
})
export const validFilter = joi.object({
    searchText: joi.string().optional().trim().regex(/^[a-zA-Z(/ )]*$/).min(3).max(25),
    page: joi.number().optional().min(1),
    pageSize: joi.number().optional().min(1),
    userId: joi.number().optional().min(1),    
})

