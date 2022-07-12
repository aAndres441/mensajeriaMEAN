import mongoose from "mongoose";
//const mongoose = require('mongoose');

const  CategorySchema = new mongoose.Schema(
    {
        superName: { type: String, required: [true, 'Why no superName?'] },
        isEnabled: {type: Boolean, required: [true, 'Where is Enable?']}
    },
    {
        timestamps: true,
        versionKey: false, //elimina _v prop version en BD
    }
)

//export default PublicacionSchema;
module.exports = CategorySchema;