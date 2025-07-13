import bcrypt from 'bcryptjs';
import { createUser, findUser } from '../dao/user.dao.js';

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

    return res.status(201).json({
        message: "User created successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email,
            avatar: user.avatar,
            bio: user.bio
        }
    })



}