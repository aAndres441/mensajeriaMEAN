//const {ITask} = require ('./task.model');
import {ITask} from './task.IEntity';
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
        this.uuid = uuid();
        this.name = name;
        this.añoInicio = añoInicio??100;
        this.description = description??"Default";
    }


}