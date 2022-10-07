import { Model, Schema } from "mongoose";
import {IPropiedad} from "../dominio/IPropiedad.interface";
/* 
* Schemma y model de Mongoose
*/
const _Schema = new Schema({
    name: { type: String, required: [true, 'Why no Name?']},    
    description: { type: String}, 
    propiedades: {type:IPropiedad}
});

const modelo = new Model('planta',_Schema);

export default modelo;