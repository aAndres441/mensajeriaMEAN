
//import { model } from 'mongoose';
const {Schema, model} = require('mongoose');
//import mongoose from 'mongoose';
//import{Schema,Model} from 'mongoose';
//const Schema = mongoose.Schema;

/* 
* Schemma y model de Mongoose
*/

const TaskSchema = new Schema({
    name:{ type: String, required: [true, 'Why no Name?']},    
    añoInicio: { type: String},
    description: String!
},
{
    timestamps: true,  //crea dato creacion y actualizacion
    versionKey: false, //elimina _v prop version en BD
});

const TaskModel = new model('task',TaskSchema);

export default TaskModel;