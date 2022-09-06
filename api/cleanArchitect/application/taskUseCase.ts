
/**
 * solo conoce a dominio; dependencia porque una inyecccion de un repositorio para saber metodos
 */
import { TaskMapeo } from '../domain/task.mapeo';
import {ITaskRepo} from '../domain/task.repository';

export class TaskUserCase{
    constructor(private readonly repo:ITaskRepo){}

     crearTask= async (name:string,añoIni:number,desc:string)=>{
        const task = new TaskMapeo(name,añoIni,desc);
        const devolucion = await this.repo.createTask2(task);
     };

     listarTask= async ()=>{};

     encontrarTask= async ()=>{};

}