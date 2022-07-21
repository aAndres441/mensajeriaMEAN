//import mongoose from 'mongoose';
const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        userFollower:{type:mongoose.Types.ObjectId, ref:'users', required: [true, 'Where is followAt ?'] },
        userFollowing:{type:mongoose.Types.ObjectId, ref:'users', required: [true, 'Where is followed ?'] }        
    },
    {
        timestamps: true,  //crea dato creacion y actualizacion
        versionKey: false, //elimina _v prop version en BD
    }
)

module.exports = MessageSchema;

