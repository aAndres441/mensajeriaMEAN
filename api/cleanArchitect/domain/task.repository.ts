import { ITask } from "./task.IEntity";

/**
 * Metodos, sera la capa de abstraccion,  que impacta a cualquier BD
 */
export interface ITaskRepo{

    findTaskById(uuid:string):Promise<ITask | null>;

    //createTask(name:string,añoInicio:number, description:string):Promise<ITask | null>;
    
    createTask(task:ITask):Promise<ITask | null>;

    listTask():Promise<ITask[] | null>;

    findOneTask(dato:string):Promise<ITask | null>;

    deleteTask(dato:string):Promise<ITask | null>;

}