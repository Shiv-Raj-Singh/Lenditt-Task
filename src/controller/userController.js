import catchAsync from "../auth/catchAsync.js";
import { AppError } from "../auth/globalError.js";
import contactModel from "../db_&_model/model.js";
import validData, { validFilter, validNumber } from "./validation.js";
import Cryptr from 'cryptr';
const myCry = new Cryptr(process.env.SECRET_KEY)

// ************************************************  APi ! Create Contacts *****************************

export const createContact = catchAsync(async(req,res,next)=>{
    
    // Check Data Exist Or Not in Body 
    if(Object.values(req.body).length == 0) return next(new AppError('No Such Data Exist !' , 400))
    const  data = await validData.validateAsync(req.body)
    
    // Check User Contact Number Repeated Or Not  
    const map = new Map()
    for (let a of data.Contacts){
        if(map.get(a.phone)) return next(new AppError('No Repeated Mobile Numbers !' , 400))
        else{
            map.set(a.phone , 1)
            //  Encrypt Phone Numbers 
            const encryptPhone = myCry.encrypt(a.phone)
            a.phone = encryptPhone
        } 
    }
    //  Save Data in database 
    const result = await contactModel.create(data)    
    
    // return response 
    res.status(201).send({
        message : 'Data Saved Successfully ' , status : true , data : result
    })
})


// ************************  API 2 Find Common users by number & same name *********************************************

export const findCommonUser = catchAsync(async(req,res,next)=>{
    
    // Check Number Exist or Not 
    if(Object.values(req.query).length == 0) return next(new AppError('No Such Number Exist !' , 400))
    
    const data = await validNumber.validateAsync(req.query)
    
    //  Get Data from database 
    const result = await contactModel.find()    
    const ans = {name : null , commonUsers: []}

    // match with given searchNumber 
    for (let a of result){
        a.Contacts.forEach(user => {
            const decryptPhone = myCry.decrypt(user.phone)
            if(decryptPhone == data.searchNumber && !ans.name){        
                ans.name = user.name 
                ans.commonUsers.push(Number(a.userId))             
            }else  if(decryptPhone == data.searchNumber ){
                ans.commonUsers.push(Number(a.userId)) 
            }
        })
    }

    if(!ans.name) return next(new AppError('No Such User Found' , 404))
    // return response 
    res.status(200).send({
        status : true  , message : 'Data Found Successfully !' , data : ans
    })
})


// *************************************** API 3 Pagination using *****************************************

export const pagiNation = catchAsync(async(req,res,next)=>{
    const data = await validFilter.validateAsync(req.query)
        
    // Check Number Exist or Not 
    let {userId , pageSize , page , searchText} = data
    const searchFilter = {}

    page = page || 1 
    pageSize = pageSize || 3
    if(searchText){
        searchFilter['Contacts.name'] = {$regex : searchText}
    }
    if(userId){
        searchFilter.userId = userId
        pageSize = 0
    }
    
    const skip = (page - 1) * pageSize
    //  Get Data from database 
    const result = await contactModel.find(searchFilter).skip(skip).limit(pageSize).select("userId Contacts")
    const count = result.length 
    const ans = {count : count  , rows : []}

    // if filter have user name 
    if(searchText){
        result.forEach(a=>{
            a.Contacts.forEach(user=>{
                if(user.name.includes(searchText)){
                    const decryptPhone = myCry.decrypt(user.phone)
                    ans.rows.push({name : user.name , phone : decryptPhone})
                }
            })
        })
    //  if filter have not user name then return all user's name and their numbers 
    }else{
        result.forEach(a=>{
            a.Contacts.forEach(user=>{                
                    const decryptPhone = myCry.decrypt(user.phone)
                    ans.rows.push({name : user.name , phone : decryptPhone})                
            })
        })
    }

    // return response 
    res.status(200).send({
        status : true  , message : 'Data Found Successfully !' , ans
    })
})
