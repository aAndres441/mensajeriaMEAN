
//import { model } from 'mongoose';
const {Schema, model} = require('mongoose');
//import mongoose from 'mongoose';
//import{Schema,Model} from 'mongoose';
//const Schema = mongoose.Schema;
import { IPropiedad } from "../../domain/IPropiedad.interface";
/* 
* Schemma y model de Mongoose
*/

const PlantSchema = new Schema({
    name:{ type: String, required: [true, 'Why no Name?']},    
    description: { type: String,required: [true, 'Why no Description?']},
    propiedades:{type:[String], enum: ['aceite', 'infusion','decoccion'] },
},
{
    timestamps: true,  //crea dato creacion y actualizacion
    versionKey: false, //elimina _v prop version en BD
});

const PlantModel = new model('plant',PlantSchema);

export default PlantModel;