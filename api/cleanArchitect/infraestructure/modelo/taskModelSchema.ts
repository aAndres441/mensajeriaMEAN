
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
});

const TaskModel = new model('task',TaskSchema);

export default TaskModel;