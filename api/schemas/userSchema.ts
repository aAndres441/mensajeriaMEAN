import mongoose from 'mongoose';

//import {Role} from './role';
enum Role { CLIENT, ADMIN };

const UserSchema = new mongoose.Schema(
    {
    name: { type: String, required: true },
    surname: String!,
    nick: String!,
    email: String,
    password: String,
    //role: Role,
    image: String!
    },
    {
        timestamps: true
    }
)
export default UserSchema;
