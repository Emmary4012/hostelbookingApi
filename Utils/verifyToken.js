import  jwt  from "jsonwebtoken";
import { createError } from "./error.js";

export const verifyToken = (req,res,next) => {
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401,"You are not authenticated"))

}

jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403,"Token is not valid!"));

     req.user = user     
   // return  res.status(200).json(req.user.isAdmin)
     next();
})
};

export const verifyUser = (req,res,next) => {
    verifyToken(req,res,next, ()=>{
        if(req.user.id === req.params.id||req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized"))
        }
    });
};

export const verifyAdmin = (req,res,next) => {
   
    const token = req.cookies.access_token;
    if(!token) {
        return next(createError(401,"You are not authenticated"))

}

jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) return next(createError(403,"Token is not valid!"));   
    req.user = user
})
   // return res.status(200).json(req.user)
// return  res.status(200).json(req.user)
        if(req.user.isAdmin){
            next()
        }else{
            return next(createError(403, "You are not authorized!"))
        }
};