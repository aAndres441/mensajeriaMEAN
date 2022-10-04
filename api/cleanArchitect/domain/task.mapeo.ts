//const {ITask} = require ('./task.model');
import {ITask} from './task.IEntity';
import { Uuid } from './Uuid';
const { v4: uuid } = require('uuid');


/**
 * esta clase nos genera un objeto con esos datos requeridos en BD
 */
export class TaskMapeo implements ITask {

    uuid: string;    
    name: string;
    añoInicio: number;
    description: string;

    constructor(name: string, añoInicio?: number, description?: string) { //puede ser opcional
       
        this.uuid = new Uuid().generaUuid();
        this.name = name;
        this.añoInicio = añoInicio ?? 100;  // opcion 100 igual que abajo
        this.description = description || "Default"; //opcion default
    }


}