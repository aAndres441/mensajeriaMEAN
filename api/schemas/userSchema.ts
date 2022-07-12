import mongoose from 'mongoose';
//const mongoose = require('mongoose');

//import {Role} from './role';
enum Role { CLIENT, ADMIN };

//export const UserSchema = new mongoose.Schema(
 const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Why no Name?'] },
        surname: String!,
        nick: String!,
        email: {type:String}, //{type:String,unique:true},
        password: String,
        role: {type:String, required: [true, 'Why no Role?'], enum: ['admin', 'user'] },
        image: String!,
        cel: {
            type: Number, min: [4, 'Must be at least 4, got {VALUE}'],
            max: [99999, 'Must be at greater 99999, got {VALUE}'] },
    },
    {
        timestamps: true,  //crea dato creacion y actualizacion
        versionKey: false, //elimina _v prop version en BD
    }
)

// ATENCION es timestamps no timestamp al usar module.exports 

module.exports = UserSchema; 

