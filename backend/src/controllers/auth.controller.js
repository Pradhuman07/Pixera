import bcrypt from 'bcryptjs';                                  // for hashing passwords    
import { createUser, findUser } from '../dao/user.dao.js';
import jwt from 'jsonwebtoken';                                 // for tokenization
import config from '../config/config.js';                      //  to access JWT secret

export async function registerController(req, res) {
    const { username, email, password } = req.body;

    const doesUserExist = await findUser({
        $or: [
            { username },
            { email }
        ]
    })

    if (doesUserExist) {
        return res.status(400).json({
            message: "User already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await createUser({
        username: username,
        email: email,
        password: hashedPassword
    })

    const token = jwt.sign({_id:user._id}, config.JWT_SECRET)       // create a token for the user

    res.cookie("token", token)                                       // setting the token in the cookie

    return res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            dp: user.dp,
            bio: user.bio
        }
    })
}

export async function loginController(req, res){
    const {email, username, password} = req.body;

    const user = await findUser({$or: [{email}, {username}]});

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password); //returns boolean  // left side is the plain password that is coming from the front end, right side is the hashed password coming from the database

    if(!isPasswordValid){
        return res.status(400).json({
            message: "Invalid email or password"
        });
    }

    const token = jwt.sign({_id: user._id}, config.JWT_SECRET); // creating token for the user

    res.cookie("token", token);                                 // setting the token in the cookie

    return res.status(200).json({
        message: "Login successful",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            dp: user.dp,
            bio: user.bio
        }
    });
}