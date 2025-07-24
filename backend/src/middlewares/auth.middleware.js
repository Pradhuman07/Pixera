import jwt from "jsonwebtoken";
import config from "../config/config.js";
import { findUser } from "../dao/user.dao.js";

export async function authMiddleware(req, res, next) {    // This middleware will check if the user is authenticated or not and will add the user details to the request object if authenticated

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Unauthorized, please login first"
        });
    }

    try{                                                            // In case of invalid token, jwt throws an error, that is why we are writing this in try block and adding catch block to handle the error
        const decoded = jwt.verify(token, config.JWT_SECRET);   
        req.user = await findUser({_id:decoded._id});               // Fetch user details from the database and set that user in req.user // by default this property is not present in req object, we are creating it here
        next();                                                     // next() will call the next middleware or controller in the stack
    }

    catch (error) {
        return res.status(401).json({
            message: "Invalid token, please login first"
        });
    }
    
}