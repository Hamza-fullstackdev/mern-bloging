import jwt from 'jsonwebtoken';
import errorHandler from './errorHandler.error.js';

export const verifyUser=(req,res,next)=>{
    const token=req.cookies.access_token;
    if(!token){
        return next(errorHandler(401,"Unauthorized"))
    }
    jwt.verify(token,process.env.JWT_SECRET_TOKEN,(err,user)=>{
        if(err){
           return next(errorHandler(401,"Unauthorized"))
        }
        req.user=user;
        next();
    })
}