// Try Catch Block 

export default function catchAsync(con){
    return (req,res,next)=>{
        return Promise.resolve(con(req,res,next)).catch(next)
    }
}
