//const {ITask} = require ('./task.model');
import {ITask} from './task.model';
const { v4: uuid } = require('uuid');


/**
 * esta clase nos genera un objeto con esos datos requeridos
 */
export class TaskMapeo implements ITask {

    uuid: string;
    name: string;
    añoInicio: number;
    description: string;

    constructor(name: string, añoInicio: number, description: string) {
        this.uuid = uuid();
        this.name = name;
        this.añoInicio = añoInicio;
        this.description = description;
    }


}