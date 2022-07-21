import mongoose from "mongoose";
//const mongoose = require('mongoose');

 const PublicationSchema = new mongoose.Schema(
    {
        name: { type: String, required: [true, 'Why no Name?'] },
        description: { type: String, required: [true, 'Why no Description?']},
        file: { type: String! },
        userId: { type: mongoose.Types.ObjectId, ref:'users', required: [true, 'Why no Usuario ID?']},   //guarda relacion con user
        category:{type:Array, required: [true, 'not to forget category'],default:[]}
    },
    {
        timestamps: true,
        versionKey: false, //elimina _v prop version en BD
    }
)

//export default PublicacionSchema;
module.exports = PublicationSchema;