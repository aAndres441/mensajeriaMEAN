import mongoose from 'mongoose';
//const mongoose = require('mongoose');

//import {Role} from './role';
enum Role { CLIENT, ADMIN };

const Schema = mongoose.Schema;
const UserSchem2 = new Schema({
    name:{type:String},
    surname: String!
})
/* PUEDE SER COMO ARRIBO O ABAJO */

//export const UserSchema = new mongoose.Schema(
 const UserSchema = new mongoose.Schema(
    {
        //{type:String,unique:true},
        //Role = admin', 'user
        name: { type: String, required: [true, 'Why no Name?'] },
        surname: { type: String, required: [true, 'Why no Surname?'] },
        nick: String!,
        email: {type:String, required: [true, 'Why no E-mail?']}, 
        password: {type:String, required: [true, 'Why no Pass?']},
        role: {type:String, required: [true, 'Why no Role?'], enum: ['admin', 'user'] },
        image: String!,
        cel: {
            type: Number, min: [4, 'Must be at least 4, got {VALUE}'],
            max: [100000, 'Must be at greater cien mil, got {VALUE}'] },
    },
    {
        timestamps: true,  //crea dato creacion y actualizacion
        versionKey: false, //elimina _v prop version en BD
    }
)

// ATENCION es timestamps no timestamp al usar module.exports 

module.exports = UserSchema; 

//module. exports = mongoose.model('users',UserSchem2)

