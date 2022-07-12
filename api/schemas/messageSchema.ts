import mongoose from 'mongoose';
//const mongoose = require('mongoose');

const FollowSchema = new mongoose.Schema(
    {
        userEmmiter:{type:mongoose.Types.ObjectId, required: [true, 'Where is userEmmiter ?'] },
        userReciver:{type: mongoose.Types.ObjectId, required: [true, 'Where is userReciver ?'] },    
        message:{type:String, required: [true, 'Where is Message ?'],unique: true}        
    },
    {
        timestamps: true,  //crea dato creacion y actualizacion
        versionKey: false, //elimina _v prop version en BD
    }
)

module.exports = FollowSchema;

